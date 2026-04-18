import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
  FormControl,
  MenuItem,
  Select,
  Autocomplete,
  InputAdornment
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { useDispatch } from "react-redux";
import { endPoints } from "../../constant/Environment";
import { addData, fetchAllData, getAllData } from "../../Utility/API";
import { useFormikContext } from "formik";
import { decryptUsingAES128, geoClientMob } from "../../Utility/ConfigData";
import DateOfBirth from "./DateofBirth";
import { isOldEnough, getAddressFromCoords } from "../../Utility/functions/Helper";
import {
  setLoading,
  setLicense,
} from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useSnackbarContext } from "../../component/SnackbarContext";
import axios from "axios";
import { devicetype } from "../../Utility/functions/Helper";
import { BrowserInfo } from "../../Utility/functions/Helper";
import { getCookie } from "../../Utility/functions/Helper";
import { useSelector } from "react-redux";
import { Visibility,VisibilityOff } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import StepIcon from '@mui/material/StepIcon';
import { useTranslation } from "react-i18next";

var geoClient = null;

// List of all countries with codes
const COUNTRIES = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AR", name: "Argentina" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "BD", name: "Bangladesh" },
  { code: "BE", name: "Belgium" },
  { code: "BR", name: "Brazil" },
  { code: "CA", name: "Canada" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "EG", name: "Egypt" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "KE", name: "Kenya" },
  { code: "MY", name: "Malaysia" },
  { code: "MX", name: "Mexico" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NG", name: "Nigeria" },
  { code: "NO", name: "Norway" },
  { code: "PK", name: "Pakistan" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SG", name: "Singapore" },
  { code: "ZA", name: "South Africa" },
  { code: "KR", name: "South Korea" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TW", name: "Taiwan" },
  { code: "TH", name: "Thailand" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "VN", name: "Vietnam" },
];

const CURRENCIES = [
  { code: "USD", name: "US Dollar (USD)" },
  { code: "EUR", name: "Euro (EUR)" },
  { code: "GBP", name: "British Pound (GBP)" },
  { code: "CAD", name: "Canadian Dollar (CAD)" },
  { code: "AUD", name: "Australian Dollar (AUD)" },
  { code: "INR", name: "Indian Rupee (INR)" },
  { code: "JPY", name: "Japanese Yen (JPY)" },
  { code: "CHF", name: "Swiss Franc (CHF)" },
  { code: "SGD", name: "Singapore Dollar (SGD)" },
  { code: "NZD", name: "New Zealand Dollar (NZD)" },
  { code: "BRL", name: "Brazilian Real (BRL)" },
  { code: "MXN", name: "Mexican Peso (MXN)" },
  { code: "ZAR", name: "South African Rand (ZAR)" },
  { code: "SEK", name: "Swedish Krona (SEK)" },
  { code: "NOK", name: "Norwegian Krone (NOK)" },
  { code: "DKK", name: "Danish Krone (DKK)" },
  { code: "PLN", name: "Polish Zloty (PLN)" },
  { code: "TRY", name: "Turkish Lira (TRY)" },
  { code: "AED", name: "UAE Dirham (AED)" },
  { code: "SAR", name: "Saudi Riyal (SAR)" },
  { code: "HKD", name: "Hong Kong Dollar (HKD)" },
  { code: "KRW", name: "South Korean Won (KRW)" },
  { code: "PHP", name: "Philippine Peso (PHP)" },
  { code: "THB", name: "Thai Baht (THB)" },
  { code: "NGN", name: "Nigerian Naira (NGN)" },
];

function CustomStepIcon(props) {
  const { completed, icon } = props;

  return completed ? (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight:"600",
        fontSize:"20px",
        borderRadius: '50%',
        width: 50,
        height: 50,
        backgroundColor: '#03B349', 
        color: 'black',
        marginTop:"-8px"
      }}
    >
      {icon} {/* Render the step number with filled background */}
    </div>
  ) : (
    <StepIcon {...props} icon={icon} />
  );
}

const MultiStepForm = ({ googleSignUp,googleSignUpData }) => {
  const { t } = useTranslation();
  const steps = [t('multiStepForm.steps.createAccount'), t('multiStepForm.steps.personalInfo')];
  const [activeStep, setActiveStep] = React.useState(0) ;
  const [searchResults, setSearchResults] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [selectAddress, setSlectedAddress] = useState(false);
  const [validateAge, setValidateAge] = useState(() => () => true);
  const [showPassword, setShowPassword] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState("");
  const formikRef = React.useRef();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const deviceId = "web";
  const operatingPlatform = navigator.platform;
  const browsername = window.navigator;
  const isLastStep = activeStep === steps.length - 1; // leter chnage -1
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const google_code = googleSignUpData ? googleSignUpData.sub : "";


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isEmailValid = async (mail) => {
    let isValid = true;
    let url = `${endPoints.api.EMAIL_AVAIALBILTY}/${mail}`;
    dispatch(setLoading(true));
    if (mail) {
      try {
        let response = await getAllData(url);
        if (response?.status === "success") {
          dispatch(setLoading(false));
        } else if (response?.status === "failure") {
          isValid = false;
          dispatch(setLoading(false));
        }
        return isValid;
      } catch (err) {
        dispatch(setLoading(false));
        console.log(err);
      }
    }
    else{
      dispatch(setLoading(false));
    }
  };

  const isUsernameValid = async (name) => {
    let isValid = true;
    let url = `${endPoints.api.USER_AVAILABILTY}/${name}`;
    dispatch(setLoading(true));
    if (name) {
      try {
        let response = await getAllData(url);
        if (response?.status === "success") {
          dispatch(setLoading(false));
        } else if (response?.status === "failure") {
          isValid = false;
          dispatch(setLoading(false));
        }
        return isValid;
      } catch (err) {
        console.log(err);
        dispatch(setLoading(false));
      }
    }
    else{
      dispatch(setLoading(false));
    }
  };

  const initialValues = {
    email: googleSignUpData ? googleSignUpData.email : "",
    username: "",
    password: googleSignUpData ? googleSignUpData.sub : "",
    firstName: googleSignUpData ? googleSignUpData.given_name : "",
    lastName: googleSignUpData ? googleSignUpData.family_name : "",
    AddressonUi: "",
    address: "",
    userCountry: detectedCountry,
    country: detectedCountry,
    zip: "",
    state: "",
    street: "",
    city: "",
    month: "",
    day: "",
    year: "",
    referal: "",
    policy: false,
    mobile: "",
    currency: "USD",
  };

  const validationSchema = (googleSignUpData) => {
    return [
      Yup.object({
        email: googleSignUpData
          ? Yup.string().email("Invalid email address.") // Error message if email is invalid
          : Yup.string()
              .email("Invalid email address.")
              .required("Email is required."), // Error message if email is not provided
        username: Yup.string()
          .min(6, "Your Username must be between 6 - 14 characters long.")
          .matches(
            /^[a-zA-Z0-9_]+$/,
            "Your Username can only contain Numbers and Letters. Special characters cannot be used."
          )
          .required("Username is required."),
        password: googleSignUpData
          ? Yup.string() // No validation required if coming from Google
          : Yup.string("Enter your password")
              .min(8, "Password should be of minimum 8 characters length")
              .max(20, "Password should be of maximum 20 characters length")
              .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
              )
              .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
              )
              .matches(/[0-9]/, "Password must contain at least one number")
              .matches(
                /[\W_]/,
                "Password must contain at least one special character"
              )
              .required("Password is required"),

        mobile: Yup.string()
          .matches(/^\d+$/, "Only numbers are allowed.")
          .min(10, "Mobile number should be of minimum 10 digits.")
          .required("Mobile is required."),
        userCountry: Yup.string()
          .required("Country is required."),
        currency: Yup.string()
          .required("Currency is required.")
          .test(
            "not-us",
            "US states are restricted to play with us.",
            function (value) {
              return value?.toUpperCase() !== "US";
            }
          ),
      }),
      Yup.object({
        firstName: googleSignUpData
          ? Yup.string() // No validation required if coming from Google
          : Yup.string()
              .matches(/^[A-Za-z]+$/, "First Name must contain only letters.")
              .required("First Name is required."),
        lastName: googleSignUpData
          ? Yup.string() // No validation required if coming from Google
          : Yup.string()
              .matches(/^[A-Za-z]+$/, "Last Name must contain only letters.")
              .required("Last Name is required."),
        AddressonUi: Yup.string().required("Address is required."),
        month: Yup.string().required("Month is required."),
        day: Yup.number()
          .required("Date is required.")
          .max(31, "Date cannot exceed 31."),
        year: Yup.number()
          .required("Year is required.")
          .test(
            "is-old-enough",
            "You must be at least 18 years old.",
            function (value) {
              const { day, month } = this.parent;
              if (!day || !month || !value) return false;
              return isOldEnough(
                parseInt(day, 10),
                parseInt(month, 10),
                parseInt(value, 10)
              );
            }
          ),
        referal: Yup.string().notRequired(),
        policy: Yup.boolean()
          .oneOf([true], "You must accept the terms and conditions.")
          .required("You must accept the terms and conditions."),
      }),
      Yup.object(),
    ];
  };

  const handleNext = async (
    values,
    googleSignUpData,
    { setTouched, setErrors, setFieldError, setFieldTouched }
  ) => {
    try {
      // Validate current step
      const schema = validationSchema(googleSignUpData)[activeStep];
      schema.validate(values, { abortEarly: false });
      if (activeStep === steps.length - 1) {
        // Final step submission
        let url = `${endPoints.api.USER_SIGNUP}`;
        dispatch(setLoading(true));

        let data = {
          login: values.username,
          passwd: googleSignUpData ? googleSignUpData.sub : values.password,
          name: googleSignUpData
            ? googleSignUpData.given_name
            : values.firstName,
          surname: googleSignUpData
            ? googleSignUpData.family_name
            : values.lastName,
          email: googleSignUpData ? googleSignUpData.email : values.email,
          birthDate: `${values.year}-${values.month}-${values.day}`,
          mobile: values.mobile,
          address: values.AddressonUi,
          deviceId: deviceId,
          platform: operatingPlatform,
          zipCode: values.zip,
          state: values.state,
          country: values.userCountry,
          currency: values.currency,
          city: values.city,
          google_code: googleSignUpData ? googleSignUpData.sub : "",
          browser: BrowserInfo(),
          device: devicetype(),
          referral: getCookie("ref"),
          campaign: getCookie("campaign"),
          promoCode: values.referal,
          promoId: 0,
        };

        // if (data.zipCode == "" || data.state == "" ) {
        //   showErrorSnackbar("Please enter your ZIP code first to see available address options.");
        //   dispatch(setLoading(false));
        //   return;
        // }

        try {
          const response = await addData(url, data);
          // setIsLoadinig(false);
          dispatch(setLoading(false));
          if (response.data.status == "success") {
            geoClient = geoClientMob.createClient();

            geoClient.setUserId(response.data.data.idUser);
            geoClient.setReason("SIGNUP");
            geoClient.setLicense(state?.global?.license);

            geoClient.events
              .on("hint", function (BROWSER_GEOLOCATION_DENIED, data) {
                //e.g. show hint messages to users
              })
              .on("engine.success", function (text, xml) {
                // $.post('/your-service-to-decrypt-and-verify-the-response', function(text) {
                // //e.g. fail or pass your user
                // });
                // console.log("text",text);

                let payload = {
                  deviceId: deviceId,
                  userId: response.data.data.idUser,
                  userName: `${response.data.data.name} ${response.data.data.surname}`,
                };

                let decryptResponse = decryptUsingAES128(text, payload);
                // console.log("result",decryptResponse);

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
                    console.warn(message);
                  } else if (
                    code ===
                      geoClient.ErrorCodes.CLNT_ERROR_LICENSE_INVALID_FORMAT ||
                    code === geoClient.ErrorCodes.CLNT_ERROR_LICENSE_EXPIRED
                  ) {
                    //e.g. update license and retry geolocating
                  } else if (
                    code ===
                    geoClient.ErrorCodes
                      .CLNT_ERROR_REQUEST_GEOLOCATION_IN_PROGRESS
                  ) {
                    console.warn(message);
                    //it's safe to be ignored, or we can wait for previous request to complete and try again
                  } else {
                    //something went wrong with GeoComply service, your license or your custom data
                    //e.g. submit log to record the issue
                    console.warn(message);
                  }
                } else if (this.event === "browser.failed") {
                  // alert(message);
                  // console.warn(message);
                  //it's safe to be ignored, you can remove this block or add your own logic
                }
              });
            // Request geolocation
            geoClient.request();

            showSuccessSnackbar(response.data.message);
            dispatch(setLoginData({ user: response.data.data , isAuthenticated: false }));
            localStorage.setItem("session", response.data.data.sessionId);
            navigate("/congratulations");
          } else {
            showErrorSnackbar(response.data.message);
          }
        } catch (error) {
          console.log(error);
          showErrorSnackbar(
            t('multiStepForm.errors.connectionError')
          );
        }
      } else {
        if (!googleSignUpData) {
          // Only perform these checks if not using Google Sign-In
          const emailIsValid = await isEmailValid(values.email);
          const usernameIsValid = await isUsernameValid(values.username);

          if (!emailIsValid) {
            showErrorSnackbar(t('multiStepForm.errors.emailTaken'));
            return;
          } else if (!usernameIsValid) {
            showErrorSnackbar(t('multiStepForm.errors.usernameTaken'));
            return;
          }
        }
        else{
          const usernameIsValid = await isUsernameValid(values.username);
           if (!usernameIsValid) {
            showErrorSnackbar(t('multiStepForm.errors.usernameTaken'));
            return;
          }
        }
        // Move to the next step if validations pass
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setTouched({}); // Reset touched fields
        setErrors({}); // Reset errors
      }
    } catch (err) {
      // Handle validation errors
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setErrors(errors);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
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
    // Fetch user's country from geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          try {
            const addressData = await getAddressFromCoords(latitude, longitude);
            setDetectedCountry(addressData.country);
            // Update Formik field directly when country is fetched
            if (formikRef.current) {
              formikRef.current.setFieldValue('userCountry', addressData.country);
            }
          } catch (error) {
            console.error("Error fetching country:", error);
            // showErrorSnackbar("Could not detect location. Please enter your country manually.");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          showErrorSnackbar(t('multiStepForm.errors.locationDenied'));
        }
      );
    }
  }, []);

  const getaddress = (query) => {
    let url = `${endPoints.apiBaseUrl}${endPoints.api.RADAR_API}?query=${query}&latitude=${latitude}&longitude=${longitude}`;
    fetchAllData(url)
      .then((res) => res.json())
      .then((response) => {
        if (response?.status === "success") {
          setSearchResults(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectAddress = (selectedData, setFieldValue) => {
    setFieldValue("AddressonUi", selectedData.formattedAddress);
    setFieldValue("address", selectedData.addressLabel);
    setFieldValue("country", selectedData.countryCode);
    setFieldValue("zip", selectedData.postalCode);
    setFieldValue("state", selectedData.stateCode);
    setFieldValue("street", selectedData.street);
    setFieldValue("city", selectedData.city);

    setSearchResults([]); // Clear search results
  };

  const getStepContent = (
    step,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldError,
    setFieldTouched
  ) => {
    switch (step) {
      case 0:
        return (
          <Box>
            {google_code ? (
              ""
            ) : (
              <>
                <Typography variant="subtitle1" align="left">
                  {t('multiStepForm.emailAddress')}
                </Typography>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder={t('multiStepForm.placeholders.email')}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  margin="normal"
                />
              </>
            )}

            <Typography variant="subtitle1" align="left">
              {t('multiStepForm.username')}
            </Typography>
            <TextField
              fullWidth
              id="username"
              name="username"
              type="text"
              placeholder={t('multiStepForm.placeholders.username')}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{ maxLength: 14 }}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              margin="normal"
            />
            
            {google_code ? (
              ""
            ) : (
              <>
                <Typography variant="subtitle1" align="left">
                  {t('auth.password')}
                </Typography>
                <div className="eye_icon">
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('multiStepForm.placeholders.password')}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  margin="normal"
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
                    {showPassword ? <Visibility    onClick={handleClickShowPassword} /> : <VisibilityOff   onClick={handleClickShowPassword} />}
                </div>
              </>
            )}

            <Typography variant="subtitle1" align="left">
              {t('multiStepForm.mobileNumber')}
            </Typography>
            <TextField
              fullWidth
              id="mobile"
              name="mobile"
              type="text"
              placeholder={t('multiStepForm.placeholders.mobile')}
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{ maxLength: 10 }}
              error={touched.mobile && Boolean(errors.mobile)}
              helperText={touched.mobile && errors.mobile}
              margin="normal"
            />

            <Typography variant="subtitle1" align="left">
              {t('multiStepForm.country')}
            </Typography>
            <FormControl fullWidth margin="normal" error={touched.userCountry && Boolean(errors.userCountry)}>
              <Select
                id="userCountry"
                name="userCountry"
                value={values.userCountry || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  {t('multiStepForm.placeholders.country')}
                </MenuItem>
                {COUNTRIES.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.userCountry && errors.userCountry && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2,textAlign:"start" }}>
                  {errors.userCountry}
                </Typography>
              )}
            </FormControl>

            <Typography variant="subtitle1" align="left">
              Currency
            </Typography>
            <FormControl fullWidth margin="normal" error={touched.currency && Boolean(errors.currency)}>
              <Select
                id="currency"
                name="currency"
                value={values.currency || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select your Currency
                </MenuItem>
                {CURRENCIES.map((cur) => (
                  <MenuItem key={cur.code} value={cur.code}>
                    {cur.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.currency && errors.currency && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2,textAlign:"start" }}>
                  {errors.currency}
                </Typography>
              )}
            </FormControl>

          </Box>
        );
      case 1:
        return (
          <Box>
            <Grid container spacing={5} rowSpacing={1}>
              <Grid item md={6} xs={6}>
                {googleSignUpData ? (
                  ""
                ) : (
                  <>
                    <Typography variant="subtitle1" align="left">
                      {t('multiStepForm.firstName')}
                    </Typography>
                    <TextField
                      fullWidth
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder={t('multiStepForm.placeholders.firstName')}
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </>
                )}
              </Grid>

              <Grid item md={6}  xs={6}>
                {googleSignUpData ? (
                  ""
                ) : (
                  <>
                    <Typography variant="subtitle1" align="left">
                      {t('multiStepForm.lastName')}
                    </Typography>
                    <TextField
                      fullWidth
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder={t('multiStepForm.placeholders.lastName')}
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </>
                )}
              </Grid>

              {/* <Grid item md={12}  xs={12}>
                <Typography variant="subtitle1" align="left">
                  Address
                </Typography>
                <Autocomplete
                  freeSolo
                  disablePortal
                  options={searchResults.map(
                    (result) => result.formattedAddress
                  )}
                  onInputChange={(event, newInputValue) => {
                    getaddress(newInputValue); // Call getaddress on input change
                  }}
                  onChange={(event, newValue) => {
                    const selectedData = searchResults.find(
                      (result) => result.formattedAddress === newValue
                    );
                    if (selectedData) {
                      handleSelectAddress(selectedData, setFieldValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter your zipcode to search your address"
                      type="text"
                      // onChange={handleChange}
                      onBlur={handleBlur}
                      name="AddressonUi"
                      value={values.AddressonUi}
                      onChange={handleChange} // Optionally update the form field
                      error={touched.AddressonUi && Boolean(errors.AddressonUi)}
                      helperText={touched.AddressonUi && errors.AddressonUi}
                    />
                  )}
                />
              </Grid> */}

              <Grid item md={12}  xs={12}>
                <Typography variant="subtitle1" align="left">
                  {t('multiStepForm.addressDetails')}
                </Typography>
                <TextField
                  fullWidth
                  id="AddressonUi"
                  type="text"
                  name="AddressonUi"
                  placeholder={t('multiStepForm.placeholders.address')}
                  value={values.AddressonUi}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // disabled
                  error={touched.AddressonUi && Boolean(errors.AddressonUi)}
                  helperText={touched.AddressonUi && errors.AddressonUi}
                />
              </Grid>  

              <Grid item md={12}  xs={12} className="dob_field">
                <DateOfBirth
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched}
                  errors={errors}
                  onValidateAge={setValidateAge}
                />
              </Grid>

              <Grid item md="12" xs={12}>
                <Typography variant="subtitle1" align="left">
                  {t('multiStepForm.referredBy')}
                </Typography>
                <TextField
                  fullWidth
                  id="referal"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="referal"
                  placeholder={t('multiStepForm.placeholders.referral')}
                  value={values.referal}
                />
              </Grid>
            </Grid>

            <Grid item md={12}>
              <div className="condition_check">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.policy}
                    name="policy"
                  />
                  <label className="form-check-label" for="">
                    {t('multiStepForm.termsConfirmation')}{" "}
                    <Link
                      to="/terms-conditions"
                      target="_blank"
                    >
                      {t('footer.termsConditions')}
                    </Link>{" "}
                    {t('multiStepForm.and')}{" "}
                    <Link
                      to="/privacy-policy"
                      target="_blank"
                    >
                      {t('footer.privacyPolicy')}
                    </Link>
                    .{" "}
                  </label>
                </div>
                <span>
                  {touched.policy && (
                    <Typography variant="subtitle1" align="start" color="error">
                      {errors.policy}
                    </Typography>
                  )}
                </span>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id=""
                    value={values.promotion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label className="form-check-label" for="">
                    {t('multiStepForm.receivePromotionalEmails')}{" "}
                  </label>
                </div>
              </div>
            </Grid>
          </Box>
        );
      // case 2:
      //   return (
      //     <Box>
      //       <Typography variant="h6">Review Your Details</Typography>
      //       <Typography>First Name: {values.firstName}</Typography>
      //       <Typography>Last Name: {values.lastName}</Typography>
      //       <Typography>Email: {values.email}</Typography>
      //       <Typography>Phone Number: {values.phone}</Typography>
      //     </Box>
      //   );
      default:
        return "Unknown step";
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema(googleSignUpData)[activeStep]}
      // onSubmit={handleNext}
      onSubmit={(values, formikHelpers) =>
        handleNext(values, googleSignUpData, formikHelpers)
      }
      validateOnBlur={true}
      validateOnChange={false}
    >
      {({
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        setFieldValue,
        setFieldError,
        setFieldTouched,
      }) => {
        // console.log("Errors:", errors);
        // console.log("Touched:", touched);

        return (
          <Form>
            <Box sx={{ width: "100%",mt:3 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    {/* <StepLabel>{label}</StepLabel> */}
                    <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep == 0 ?
            <Box>
            {googleSignUpData?"":
              <div className="flex-btn">
              <Link onClick={() => googleSignUp()} color="primary">
                <FcGoogle /> {t('login.google')}
              </Link>
            </div>
             }
            <div className="bar_text">
              <p>{t('multiStepForm.orRegisterWithEmail')}</p>
            </div>
            </Box> : ""}

              <Box sx={{ mt: 2 }}>
                {getStepContent(
                  activeStep,
                  values,
                  handleChange,
                  handleBlur,
                  touched,
                  errors,
                  setFieldValue,
                  setFieldError,
                  setFieldTouched
                )}
                <Box sx={{ mt: 2 }}>
                  {/* <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button> */}
                  <Button variant="contained" color="primary" type="submit">
                    {/* {isLastStep ? "Complete sign up" : "Continue"} */}
                    {activeStep == 1 ? t('multiStepForm.completeSignUp') : t('multiStepForm.continue')}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MultiStepForm;
