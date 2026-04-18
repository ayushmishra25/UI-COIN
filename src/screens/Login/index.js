import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, TextField, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useAuth } from "../../AuthContext";
import AppLogo from "../../component/AppLogo";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { endPoints } from "../../constant/Environment";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import {
  setLicense,
  setLoading,
} from "../../redux/Reducers/GlobalReducer/globalSlice";
import { addData, getAllData } from "../../Utility/API";
import { decryptUsingAES128, geoClientMob } from "../../Utility/ConfigData";
import { BrowserInfo, devicetype, getCookie } from "../../Utility/functions/Helper";
import "./login.css";
import ReCAPTCHA from "react-google-recaptcha";
import Promotions from "../Home/Promotion";

const getValidationSchema = (t) => yup.object({
  email: yup
    .string(t('login.validation.enterUsername'))
    //   .email("Enter a valid email")
    .required(t('login.validation.emailRequired')),
  password: yup.string(t('login.validation.enterPassword')).required(t('login.validation.passwordRequired')),
});

var geoClient = null;

const Login = () => {
  const { t } = useTranslation();
  const validationSchema = getValidationSchema(t);
  const recaptchaRef = useRef(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let deviceId = "web";
  let operatingPlatform = navigator.platform;
  const navigate = useNavigate();
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(() => {
    return localStorage.getItem("isRememberMeChecked") == "true";
  });
  const[calimtermscondition,setcalimtermscondition]=useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function getGeolocation() {
    let url = `${endPoints.apiBaseUrl}${endPoints.api.geocomplyLience1}`;
    axios
      .get(url)
      .then((response) => {
        let result = response?.data?.data?.split('">')[1];
        result = result?.split("</")[0];
        dispatch(setLicense(result));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getGeolocation();
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (tokenResponse.access_token) {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        const resultData = userInfo.data;
        const { email, picture, family_name, given_name, sub } = resultData;
        let data = {
          firstname: given_name,
          lastname: family_name,
          email: email,
          picture: picture,
          google_code: sub,
          deviceId: deviceId,
          platform: operatingPlatform,
          browser: BrowserInfo(),
          device: devicetype(),
          referral: getCookie("ref"),
          campaign: getCookie("campaign"),
        };

        let url = `${endPoints.api.GOOGLE_LOGIN}`;
        try {
          dispatch(setLoading(true));
          const response = await addData(url, data);
          if (response?.data?.status === "success") {
            if (response.data.data.userStatus == "1") {
              // setGoogleSignUpData(resultData);
              let data = resultData;
              navigate("/signup", { state: data });
              dispatch(setLoading(false));
            } else {
              dispatch(setLoading(false));
              dispatch(
                setLoginData({
                  user: response.data.data,
                  isAuthenticated: true,
                })
              );
              // console.log('response.data.data,',response.data.data,)
              localStorage.setItem("session", response.data.data.sessionId);
              //  showSuccessSnackbar("User Logged in successfully");
              geoClient = geoClientMob.createClient();

              // Set up parameters
              geoClient.setUserId(response.data.data.idUser);
              geoClient.setReason("LOGIN");
              geoClient.setLicense(state?.global?.license);

              geoClient.events
                .on("hint", function (BROWSER_GEOLOCATION_DENIED, data) {
                  //e.g. show hint messages to users
                })
                .on("engine.success", function (text, xml) {
                  let payload = {
                    deviceId: deviceId,
                    userId: response.data.data.idUser,
                    userName: `${response.data.data.name} ${response.data.data.surname}`,
                  };

                  let decryptResponse = decryptUsingAES128(text, payload);

                  console.log("response", decryptResponse);
                })
                .on("*.failed", function (code, message) {
                  if (
                    this.event === "revise.failed" ||
                    this.event === "config.failed" ||
                    this.event === "engine.failed"
                  ) {
                    if (
                      code ===
                      geoClient.ErrorCodes.CLNT_ERROR_NETWORK_CONNECTION
                    ) {
                      //network issue, we can add retry logic if needed
                      // alert(message);
                      showErrorSnackbar(message);
                    } else if (
                      code ===
                        geoClient.ErrorCodes
                          .CLNT_ERROR_LICENSE_INVALID_FORMAT ||
                      code === geoClient.ErrorCodes.CLNT_ERROR_LICENSE_EXPIRED
                    ) {
                      // alert(message);
                      // showErrorSnackbar(message);
                      //e.g. update license and retry geolocating
                    } else if (
                      code ===
                      geoClient.ErrorCodes
                        .CLNT_ERROR_REQUEST_GEOLOCATION_IN_PROGRESS
                    ) {
                      showErrorSnackbar(message);
                      //it's safe to be ignored, or we can wait for previous request to complete and try again
                    } else {
                      //something went wrong with GeoComply service, your license or your custom data
                      //e.g. submit log to record the issue
                      showErrorSnackbar(message);
                    }
                  } else if (this.event === "browser.failed") {
                    // alert(message);
                    // showErrorSnackbar(message);
                    //it's safe to be ignored, you can remove this block or add your own logic
                  }
                });
              // Request geolocation
              // geoClient.request();
               const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
            if (redirectUrl) {
              sessionStorage.removeItem("redirectAfterLogin");
              navigate(redirectUrl);
            } else {
              navigate("/");
            }
            }
          } else {
            showErrorSnackbar(response?.data?.message || t('login.googleLoginFailed'));
            dispatch(setLoading(false));
          }
        } catch (error) {
          showErrorSnackbar(t('login.googleLoginFailed'));
          dispatch(setLoading(false));
        }
      }
    },
    onError: () => {
      showErrorSnackbar(t('login.googleLoginFailed'));
      dispatch(setLoading(false));
    },
  });

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // if (!recaptchaToken) {
      //   showErrorSnackbar("Please complete the reCAPTCHA verification.");
      //   return;
      // }

      if(!calimtermscondition){
        showErrorSnackbar(t('login.pleaseAcceptTerms'));
        return;
      }
      // just for sample refernce
      //     login();

      // navigate("/");
      dispatch(setLoading(true));
      let data = {
        login: values.email,
        passwd: values.password,
        deviceId: deviceId,
        platform: operatingPlatform,
        browser: BrowserInfo(),
        device: devicetype(),
        referral: getCookie("ref"),
        campaign: getCookie("campaign"),
      };

    //  console.log('data',data)

      let url = `${endPoints.api.LOGIN_ENDPOINT}`;
      await addData(url, data)
        .then((response) => {
          dispatch(setLoading(false));
          if (response?.data?.status === "success") {
            // let maintenanceData = state?.auth.maintenanceData;    have to implement maintainance functionality in future
            // if (
            //   maintenanceData?.specifiers?.maintenance_mode &&
            //   !maintenanceData?.whiteList.includes(response.data.data.idUser)
            // ) {
            //   navigate("/under-maintenance");
            //   return;
            // }
            setRecaptchaToken(null);
            recaptchaRef.current?.reset(); // Reset reCAPTCHA
            setRecaptchaToken(null);
            localStorage.setItem("session", response.data.data.sessionId);
            dispatch(
              setLoginData({ user: response.data.data, isAuthenticated: true })
            );

            // showSuccessSnackbar("User Loggedin sucessfully");
            // login();

            geoClient = geoClientMob.createClient();

            // Set up parameters
            geoClient.setUserId(response.data.data.idUser);
            geoClient.setReason("LOGIN");
            geoClient.setLicense(state?.global?.license);

            geoClient.events
              .on("hint", function (BROWSER_GEOLOCATION_DENIED, data) {
                //e.g. show hint messages to users
              })
              .on("engine.success", function (text, xml) {
                let payload = {
                  deviceId: deviceId,
                  userId: response.data.data.idUser,
                  userName: `${response.data.data.name} ${response.data.data.surname}`,
                };

                let decryptResponse = decryptUsingAES128(text, payload);

                console.log("response", decryptResponse);
              })
              .on("*.failed", function (code, message) {
                if (
                  this.event === "revise.failed" ||
                  this.event === "config.failed" ||
                  this.event === "engine.failed"
                ) {
                  if (
                    code === geoClient.ErrorCodes.CLNT_ERROR_NETWORK_CONNECTION
                  ) {
                    //network issue, we can add retry logic if needed
                    // alert(message);
                    showErrorSnackbar(message);
                  } else if (
                    code ===
                      geoClient.ErrorCodes.CLNT_ERROR_LICENSE_INVALID_FORMAT ||
                    code === geoClient.ErrorCodes.CLNT_ERROR_LICENSE_EXPIRED
                  ) {
                    // alert(message);
                    // showErrorSnackbar(message);
                    //e.g. update license and retry geolocating
                  } else if (
                    code ===
                    geoClient.ErrorCodes
                      .CLNT_ERROR_REQUEST_GEOLOCATION_IN_PROGRESS
                  ) {
                    showErrorSnackbar(message);
                    //it's safe to be ignored, or we can wait for previous request to complete and try again
                  } else {
                    //something went wrong with GeoComply service, your license or your custom data
                    //e.g. submit log to record the issue
                    showErrorSnackbar(message);
                  }
                } else if (this.event === "browser.failed") {
                  // alert(message);
                  // showErrorSnackbar(message);
                  //it's safe to be ignored, you can remove this block or add your own logic
                }
              });
            // Request geolocation
            // geoClient.request();

            navigate("/");
          } else {
            showErrorSnackbar(response?.data?.message || t('login.connectionError'));
          }
        })
        .catch((error) => {
          console.log("error", error);
          dispatch(setLoading(false));
          showErrorSnackbar(
            t('login.connectionError')
          );
        });
    },
  });

  const rememberMe = (e) => {
    const checkboxvalue = e.target.checked;

    setIsRememberMeChecked(checkboxvalue);
    if (
      checkboxvalue &&
      formik.values.email.length > 0 &&
      formik.values.password.length > 0
    ) {
      localStorage.setItem("savedUsername", formik.values.email);
      localStorage.setItem("savedPassword", formik.values.password);
      localStorage.setItem("isRememberMeChecked", true);
    } else {
      localStorage.removeItem("savedUsername");
      localStorage.removeItem("savedPassword");
      localStorage.removeItem("isRememberMeChecked");
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername");
    const savedPassword = localStorage.getItem("savedPassword");
    const checkboxvalue = JSON.parse(
      localStorage.getItem("isRememberMeChecked")
    );
    if (savedUsername && savedPassword && checkboxvalue) {
      formik.values.email = savedUsername;
      formik.values.password = savedPassword;
      setIsRememberMeChecked(checkboxvalue);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('login.pageTitle')}</title>
        <meta name="description" content={t('login.metaDescription')} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/login/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/login/" />
        <meta property="og:title" content={t('login.pageTitle')} />
        <meta property="og:description" content={t('login.metaDescription')} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('login.pageTitle')} />
        <meta name="twitter:description" content={t('login.metaDescription')} />
        <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
      </Helmet>
      <Grid
        container
        className="login_port"
        direction="column"
        style={{ marginTop: 40 }}
      >
        {/* <Grid
          item
          xs={12}
          className="login_top_section"
          display="flex"
          justifyContent="end"
          style={{ display: isMobile ? "none" : "" }}
        >
          <div
            className="top_buttons"
            style={{ paddingTop: "15px", marginRight: "80px" }}
          >
            <Button
              color="primary"
              variant="contained"
              style={{ marginRight: 20 }}
              onClick={() => {
                navigate("/login");
              }}
            >
              <Typography fontWeight={600}>Login</Typography>
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <Typography fontWeight={600}>Sign up</Typography>
            </Button>
          </div>
        </Grid> */}
        <Grid
          container
          spacing={2}
          justifyContent="center"
          rowSpacing={1}
          className="login_port"
        >
          <Grid item md={5} mt={7}>
            <div className="login_page form_logout">
              {/* <Typography variant="h3">Welcome to</Typography> */}
              {/* <img
                src={require("../../images/WebsiteLogo.png")}
                className="logo spinsaga_logo"
                alt="logo"
              /> */}
              {/* <Box> */}
              <Promotions />
              {/* </Box> */}
              {/* <AppLogo style={{ height: "80px" }} disabled={true} /> */}
              <p>{t('login.tagline')}</p>
              <div className="flex-btn">
                <Link onClick={googleLogin} color="primary">
                  <FcGoogle /> {t('login.google')}
                </Link>
              </div>
              {/* <div className="bar_text">
                <p>Or Register with Email</p>
              </div> */}
              <form className="form_fields" onSubmit={formik.handleSubmit}>
                <Typography
                  variant="subtitle1"
                  align="left"
                  sx={{ marginTop: "35px" }}
                >
                  {t('login.usernameOrEmail')}
                </Typography>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder={t('login.enterUsernameEmail')}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <Typography variant="subtitle1" align="left">
                  {t('auth.password')}    
                </Typography>
                <div className="eye_icon">
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    placeholder={t('login.enterPassword')}
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }

                    // InputProps={{
                    //   endAdornment: (
                    //     <InputAdornment position="end">
                    //       <span
                    //          className="password-icon"
                    //         aria-label="toggle password visibility"
                    //         onClick={handleClickShowPassword}
                    //         edge="end"
                    //         style={{cursor: 'pointer',}}
                    //       >
                    //         {showPassword ? <Visibility /> : <VisibilityOff />}
                    //       </span>
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                  {showPassword ? (
                    <Visibility onClick={handleClickShowPassword} />
                  ) : (
                    <VisibilityOff onClick={handleClickShowPassword} />
                  )}
                </div>

               <div className="remember_div mt-2">
                  <div className="form-check" style={{display:"flex",alignItems:"flex-start"}}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      style={{marginTop:"5px"}}
                      checked={calimtermscondition}
                      id=""
                      onChange={checktermscondition=>setcalimtermscondition(checktermscondition.target.checked)}
                    />
                    <Box 
                      component="label" 
                      className="form-check-label"
                      sx={{ marginRight: { xs: '8px', md: '40px' } }}
                    >
                      {t('login.termsAgreement')}{' '}
                      <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer">
                        {t('footer.termsConditions')}
                      </Link>
                      {t('login.playResponsibly')}
                    </Box>
                  </div>
                </div>

                <div className="remember_div">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isRememberMeChecked}
                      id=""
                      onChange={rememberMe}
                    />
                    <label className="form-check-label" for="">
                      {t('auth.rememberMe')}
                    </label>
                  </div>
                </div>
                {/* <ReCAPTCHA
                  ref={recaptchaRef} // Attach ref to reCAPTCHA
                  sitekey="6Lf3rG4qAAAAAK6EtSke6UObz2hKZ2Q4MONUKu6e"
                  onChange={handleRecaptchaChange}
                  className="mt-4"
                /> */}

                {/* <Button color="primary" variant="contained" type="submit">
                  Log in
                </Button>
                <Button color="primary" variant="contained" >
                  Sign Up
                </Button> */}
                <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                  <Grid item xs={12} md={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {t('auth.login')}
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      onClick={() => navigate("/signup")}
                    >
                      {t('auth.signUp')}
                    </Button>
                  </Grid>
                </Grid>

                <p className="forget_p">
                  <Link to="/forgot-password">{t('auth.forgotPassword')}</Link>
                </p>
                {/* <p className="sign_p">
                  Not a member yet? <Link to="/signUp">Sign up now!</Link>
                </p> */}
              </form>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
