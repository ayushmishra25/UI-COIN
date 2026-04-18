import React, { useEffect, useState } from "react";
import "./signup.css";

import Grid from "@mui/material/Grid";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useFormik } from "formik";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { addData } from "../../Utility/API";
import { decryptUsingAES128, geoClientMob } from "../../Utility/ConfigData";
import { BrowserInfo, devicetype, getCookie } from "../../Utility/functions/Helper";
import MultiStepForm from "../MultiStepForm";
import Promotions from "../Home/Promotion";

const getValidationSchema = (t) => yup.object({
  email: yup
    .string(t('signup.validation.enterEmail'))
    .email(t('signup.validation.validEmail'))
    .required(t('signup.validation.emailRequired')),
  password: yup
    .string(t('signup.validation.enterPassword'))
    .min(8, t('signup.validation.passwordMin'))
    .required(t('signup.validation.passwordRequired')),
});

var geoClient = null;

const SignUp = () => {
  const { t } = useTranslation();
  const validationSchema = getValidationSchema(t);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let deviceId = "web";
  let operatingPlatform = navigator.platform;
  const navigate = useNavigate();
  const [googleSignUpData, setGoogleSignUpData] = useState(null);
  const location = useLocation();

  const Googlevalues = location.state;

  useEffect(() => {
    if (Googlevalues) {
      setGoogleSignUpData(Googlevalues);
    }
  }, []);

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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const googleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        if (tokenResponse.access_token) {
          const userInfo = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            }
          );
          const resultData = userInfo.data;
          let url = `${endPoints.api.GOOGLE_LOGIN}`;
          let data = {
            firstname: resultData?.given_name,
            lastname: resultData?.family_name,
            email: resultData?.email,
            picture: resultData?.picture,
            username: "",
            birthDate: "",
            promoCode: "",
            google_code: resultData?.sub,
            platform: operatingPlatform,
            browser: BrowserInfo(),
            device: devicetype(),
            referral: getCookie("ref"),
            campaign: getCookie("campaign"),
          };
          await addData(url, data)
            .then((response) => {
              dispatch(setLoading(false));
              if (response?.data?.status === "success") {
                if (response.data.data.userStatus == "1") {
                  setGoogleSignUpData(resultData);
                }
                // let maintenanceData = state?.auth.maintenanceData;    have to implement maintainance functionality in future
                // if (
                //   maintenanceData?.specifiers?.maintenance_mode &&
                //   !maintenanceData?.whiteList.includes(response.data.data.idUser)
                // ) {
                //   navigate("/under-maintenance");
                //   return;
                // }
                else {
                  dispatch(
                    setLoginData({
                      user: response.data.data,
                      isAuthenticated: true,
                    })
                  );
                  showSuccessSnackbar(t('signup.loginSuccess'));
                  login();

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
                          code ===
                            geoClient.ErrorCodes.CLNT_ERROR_LICENSE_EXPIRED
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
                  geoClient.request();

                  navigate("/");
                }
              } else {
                showErrorSnackbar(response?.data?.message || t('signup.connectionError'));
              }
            })
            .catch((error) => {
              console.log("error", error);
              dispatch(setLoading(false));
              showErrorSnackbar(
                t('signup.connectionError')
              );
            });

          // setGoogleSignUpData(resultData); // Store Google user data
          // console.log("data",resultData);
        }
      } catch (error) {
        console.error("Google login failed:", error);
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  return (
    <>
      <Helmet>
        <title>{t('signup.pageTitle')}</title>
        <meta name="description" content={t('signup.metaDescription')} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/signUp/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/signUp/" />
        <meta property="og:title" content={t('signup.pageTitle')} />
        <meta property="og:description" content={t('signup.metaDescription')} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('signup.pageTitle')} />
        <meta name="twitter:description" content={t('signup.metaDescription')} />
        <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
      </Helmet>

      <Grid container spacing={2} justifyContent="center" rowSpacing={1} className="login_port">
        <Grid item md={5} style={{marginTop:isMobile?"40px":"90px"}}>
          <div className="signup_page form_logout">
            {/* <img
              src={require("../../images/newLogo.png")}
              className="logo"
              alt="logo"
            /> */}
              <Promotions />
              {/* <AppLogo style={{ height: "80px"}} disabled={true}/> */}
            <h3>{t('signup.register')}</h3>
            <p>{t('signup.tagline')}</p>
            <MultiStepForm
              googleSignUp={googleSignUp}
              googleSignUpData={googleSignUpData}
            />
            <p className="sign_p">
              {t('signup.alreadyHaveAccount')} <Link to="/login">{t('auth.login')}</Link>
            </p>
            {/* <form onSubmit={formik.handleSubmit}>
              <Typography variant="subtitle1" align="left">
                Email Address
              </Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="Enter your Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <div className="pass_div">
                <Typography variant="subtitle1" align="left">
                  Password
                </Typography>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <FaEyeSlash />
              </div>

              <Button color="primary" variant="contained" type="submit">
                Continue
              </Button>

              <p className="sign_p">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </form> */}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
