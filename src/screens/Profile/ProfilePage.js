import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateUser, updateBetUser, getAllData } from "../../Utility/API";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { endPoints } from "../../constant/Environment";
import { useDispatch } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ProfileForm = (props) => {
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();
  const theme = useTheme();
  const { t } = useTranslation();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;

  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    firstName: Yup.string().required(t("profileForm.firstNameRequired")),
    lastName: Yup.string().required(t("profileForm.lastNameRequired")),
    // comment this code later we can enable
    // email: Yup.string().email("Invalid email").required("Email is required"),
    // birthDate: Yup.string().required("Date of Birth is required"),
    address: Yup.string().required(t("profileForm.addressRequired")),
    // town: Yup.string().required("City is required"),
    // stateName: Yup.string().required("State is required"),
    // zipCode: Yup.string()
    //   .matches(/^\d{5}$/, "Zip code must be 5 digits")
    //   .required("Zip code is required"),
    country: Yup.string().required(t("profileForm.countryRequired")),
  });

  const [stateList, setStates] = useState([]);

  const GetStates = () => {
    let url = `${endPoints.api.STATES}`;
    getAllData(url)
      .then((response) => {
        const { status, data, message } = response;
        if (status === "success") {
          let statesKey = [];
          data.map((ele) => {
            ele.label = ele.state_name;
            ele.value = ele.state_id;

            statesKey.push(ele);
          });
          setStates(data);
        } else {
          // alert(message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log("/states", stateList);

  useEffect(() => {
    GetStates();
  }, []);

  // console.log('IsLoginData',IsLoginData)
  // Formik setup with custom variable name
  const formikProfile = useFormik({
    initialValues: {
      firstName: IsLoginData?.name || "",
      lastName: IsLoginData?.surname || "",
      email: IsLoginData?.email || "",
      birthDate: IsLoginData?.birthDate || "",
      address: IsLoginData?.address || "",
      town: IsLoginData?.town || "",
      stateName: IsLoginData?.nation || "",
      zipCode: IsLoginData?.zipCode || "",
      country: IsLoginData?.country || "",
    },

    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      let payload = {
        login: IsLoginData?.login,
        idUser: IsLoginData?.idUser,
        name: values.firstName,
        surname: values.lastName,
        birthDate: IsLoginData?.birthDate,
        sex: "",
        type: "",
        town: values.town,
        address: values.address,
        country: values.country,
        zipCode: values.zipCode,
        nation: values.stateName,
      };
// console.log('payload',payload)
      dispatch(setLoading(true));
      let url = `${endPoints.api.USER_CASINO_UPDATE}`;

      try {
        const response = await updateUser(url, payload);

        dispatch(setLoading(false));
        if (response?.status === "success") {
          showSuccessSnackbar(response.message);
          //resetForm();
          props.GetUserById();
        } else {
          showErrorSnackbar(response.message);
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.error(error);
      }
    },
  });
  
  const isProfileVerifed = () => {
    let result = IsLoginData?.validation !== "1" ? false : true;
    return result;
  };

  return (
    <form onSubmit={formikProfile.handleSubmit}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* First Name */}
        <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" align="left">
            {t("profileForm.firstName")}
          </Typography>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            placeholder={t("profileForm.firstNamePlaceholder")}
            value={formikProfile.values.firstName}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            error={
              formikProfile.touched.firstName &&
              Boolean(formikProfile.errors.firstName)
            }
            helperText={
              formikProfile.touched.firstName && formikProfile.errors.firstName
            }
            type="text"
            disabled={isProfileVerifed()}
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" align="left">
            {t("profileForm.lastName")}
          </Typography>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            placeholder={t("profileForm.lastNamePlaceholder")}
            value={formikProfile.values.lastName}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            error={
              formikProfile.touched.lastName &&
              Boolean(formikProfile.errors.lastName)
            }
            helperText={
              formikProfile.touched.lastName && formikProfile.errors.lastName
            }
            type="text"
            disabled={isProfileVerifed()}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" align="left">
            {t("profileForm.email")}
          </Typography>
          <TextField
            fullWidth
            id="email"
            name="email"
            placeholder={t("profileForm.emailPlaceholder")}
            value={formikProfile.values.email}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            error={
              formikProfile.touched.email && Boolean(formikProfile.errors.email)
            }
            helperText={
              formikProfile.touched.email && formikProfile.errors.email
            }
            type="text"
            disabled
          />
        </Grid>

        {/* Date of Birth */}
        <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" align="left">
            {t("profileForm.dateOfBirth")}
          </Typography>
          <TextField
            fullWidth
            id="birthDate"
            name="birthDate"
            placeholder={t("profileForm.dateOfBirthPlaceholder")}
            value={formikProfile.values.birthDate}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            error={
              formikProfile.touched.birthDate &&
              Boolean(formikProfile.errors.birthDate)
            }
            helperText={
              formikProfile.touched.birthDate && formikProfile.errors.birthDate
            }
            type="text"
            disabled
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" align="left">
            {t("profileForm.address")}
          </Typography>
          <TextField
            fullWidth
            id="address"
            name="address"
            placeholder={t("profileForm.addressPlaceholder")}
            value={formikProfile.values.address}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            error={
              formikProfile.touched.address &&
              Boolean(formikProfile.errors.address)
            }
            helperText={
              formikProfile.touched.address && formikProfile.errors.address
            }
            type="text"
            disabled={isProfileVerifed()}
          />
        </Grid>

        {/* City */}
        {/* <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" align="left">
            City
          </Typography>
          <TextField
            fullWidth
            id="town"
            name="town"
            placeholder="Enter your City"
            value={formikProfile.values.town}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            error={
              formikProfile.touched.town && Boolean(formikProfile.errors.town)
            }
            helperText={formikProfile.touched.town && formikProfile.errors.town}
            type="text"
            disabled={isProfileVerifed()}
          />
        </Grid> */}

        {/* State */}
        {/* <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" align="left">
            State
          </Typography>
          <TextField
            fullWidth
            id="stateName"
            name="stateName"
            placeholder="Enter your State"
            value={formikProfile.values.stateName}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            error={formikProfile.touched.stateName && Boolean(formikProfile.errors.stateName)}
            helperText={formikProfile.touched.stateName && formikProfile.errors.stateName}
            type="text"
            disabled
          />
        </Grid> */}

        {/* state dropdown */}
        {/* <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" align="left">
            State
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="state-select-label"
              id="state-select"
              name="stateName"
              value={formikProfile.values.stateName}
              onChange={formikProfile.handleChange}
              onBlur={formikProfile.handleBlur}
              error={
                formikProfile.touched.stateName &&
                Boolean(formikProfile.errors.stateName)
              }
              disabled={isProfileVerifed()}
            >
              {stateList.map((state) => (
                <MenuItem key={state.state_id} value={state.state_id}>
                  {state.state_name}
                </MenuItem>
              ))}
            </Select>
            {formikProfile.touched.stateName &&
              formikProfile.errors.stateName && (
                <Typography variant="caption" color="error">
                  {formikProfile.errors.stateName}
                </Typography>
              )}
          </FormControl>
        </Grid> */}

        {/* Zip Code */}
        {/* <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" align="left">
            Zip code
          </Typography>
          <TextField
            fullWidth
            id="zipCode"
            name="zipCode"
            placeholder="Enter your Zip Code"
            value={formikProfile.values.zipCode}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            error={
              formikProfile.touched.zipCode &&
              Boolean(formikProfile.errors.zipCode)
            }
            helperText={
              formikProfile.touched.zipCode && formikProfile.errors.zipCode
            }
            disabled={isProfileVerifed()}
            type="text"
          />
        </Grid> */}

        {/* Country */}
        <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" align="left">
            {t("profileForm.country")}
          </Typography>
          <TextField
            fullWidth
            id="country"
            name="country"
            placeholder={t("profileForm.countryPlaceholder")}
            value={formikProfile.values.country}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            error={formikProfile.touched.country && Boolean(formikProfile.errors.country)}
            helperText={formikProfile.touched.country && formikProfile.errors.country}
            type="text"
            disabled
          />
        </Grid>

        {/* <Grid item xs={12} md={5}>
          <Typography variant="subtitle1" align="left">
            Country
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="state-select-label"
              id="state-select"
              name="stateName"
              value={formikProfile.values.country}
              onChange={formikProfile.handleChange}
              onBlur={formikProfile.handleBlur}
              error={
                formikProfile.touched.country &&
                Boolean(formikProfile.errors.country)
              }
              disabled={isProfileVerifed()}
            >
              <MenuItem value="US">US</MenuItem>
            </Select>
            {formikProfile.touched.country && formikProfile.errors.country && (
              <Typography variant="caption" color="error">
                {formikProfile.errors.country}
              </Typography>
            )}
          </FormControl>
        </Grid> */}

        {/* Submit Button */}
        <Grid item xs={12} md={5}>
          {IsLoginData?.validation !== "1" && (
            <Button
              sx={{
                backgroundColor: theme.palette.custom.greenbtn,
                color: theme.palette.custom.white,
                textTransform: "capitalize",
                marginTop: "20px",
                width: "50%",
              }}
              variant="contained"
              type="submit"
            >
              {t("profileForm.updateProfile")}
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileForm;
