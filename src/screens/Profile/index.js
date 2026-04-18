import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { endPoints } from "../../constant/Environment";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { updateUser } from "../../Utility/API";
import NewPassword from "../NewPassword";
import SweepStakeTypography from "../../component/SweepStakeTypography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useNavigate } from "react-router-dom";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { getAllData } from "../../Utility/API";
import { useFormik } from "formik";
import ProfileForm from "./ProfilePage";
import { Helmet } from "react-helmet";
import CurrencySwitcher from "../../component/CurrencySwitcher";

const validationSchema = Yup.object({
  updatePassword: Yup.string("Enter your current password").required(
    "New Password is required"
  ),

  newPassword: Yup.string("Enter your new password")
    .min(8, "Password should be of minimum 8 characters length")
    .max(20, "Password should be of maximum 20 characters length")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .oneOf([Yup.ref("updatePassword"), null], "Passwords do not match")
    .required("Confirm Password is required"),
});

const Profile = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;

  const dispatch = useDispatch();
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();
  const navigate = useNavigate();
  const validationSchemaMail = Yup.object({
    newEmail: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    confirmEmail: Yup.string()
      .email("Invalid email address")
      .oneOf([Yup.ref("newEmail"), null], "Email addresses do not match")
      .required("confirm email is Required"),
  });

  const handleSubmitEmail = async (values, { resetForm }) => {
    const data = {
      login: IsLoginData?.login,
      idUser: IsLoginData?.idUser,
      email: values.newEmail,
    };
    try {
      const url = `${endPoints.api.UPDATE_EMAIL}`;
      dispatch(setLoading(true));
      const response = await updateUser(url, data);
      dispatch(setLoading(false));
      if (response?.status === "success") {
        resetForm();
        GetUserById();
        showSuccessSnackbar(response?.message);
      } else {
        showErrorSnackbar(response?.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      showErrorSnackbar(
        "Issue connecting to the server (error code 15). Please contact support for further assistance."
      );
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      updatePassword: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      let payload = {
        login: IsLoginData?.login,
        idUser: IsLoginData?.idUser,
        oldPasswd: values.updatePassword,
        passwd: values.newPassword,
      };
      dispatch(setLoading(true));
      let url = `${endPoints.api.CHANGE_PASS}`;

      try {
        const response = await updateUser(url, payload);

        dispatch(setLoading(false));
        if (response?.status === "success") {
          showSuccessSnackbar(response.message);
          resetForm();
        } else {
          showErrorSnackbar(response.message);
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.error(error);
      }
    },
  });

  const GetUserById = async () => {
    try {
      if (IsLoginData?.idUser) {
        const url = `${endPoints.api.GET_BY_USERID}/${IsLoginData?.idUser}`;
        const response = await getAllData(url);
        dispatch(setLoginData({ user: response.data, isAuthenticated: true }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetUserById();
  }, []);

  const UpdateUserDetail = async () => {
    let data = {
      idUser: IsLoginData?.idUser,
      login: IsLoginData?.login,
      name: IsLoginData?.name,
      surname: IsLoginData?.surname,
      email: IsLoginData?.email,
      birthDate: IsLoginData?.birthDate,
      nation: IsLoginData?.nation,
      country: IsLoginData?.country,
      town: IsLoginData?.town,
      address: IsLoginData?.address,
      mobile: IsLoginData?.mobile,
      zipCode: IsLoginData?.zipCode,
    };

    let url = `${endPoints.api.UPDATE_PERSONAL}`;
    dispatch(setLoading(true));

    try {
      const response = await updateUser(url, data);
      dispatch(setLoading(false));
      if (response?.status == "success") {
        showSuccessSnackbar(response?.message);
        GetUserById();
      } else if (response?.status == "kycfailed") {
        navigate("/kyc-check");
      } else {
        showErrorSnackbar(response?.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      showErrorSnackbar(t("profilePage.updateErrorMessage"));
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("profilePage.pageTitle")}</title>
        <meta name="description" content={t("profilePage.pageDescription")} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="form_profile" style={{ padding: 24 }}>
        <Box display="flex" justifyContent="space-between">
          <Grid>
            <Typography
              className="title_heading"
              variant="h4"
              component="h2"
              gutterBottom
            >
              {t("profilePage.personalDetails")}
            </Typography>
          </Grid>

          {/* No kyc verification option incase of crypto */}
          {/* <Grid>
            {IsLoginData?.validation != "1" ? (
              <Button
                sx={{
                  backgroundColor: theme.palette.custom.greenbtn,
                  color: theme.palette.custom.white,
                  borderRadius: "24px",
                  textTransform: "capitalize",
                }}
                variant="contained"
                onClick={() => {
                  UpdateUserDetail();
                }}
              >
                Verify Profile
              </Button>
            ) : (
              ""
            )}
          </Grid> */}
        </Box>
        <ProfileForm GetUserById={GetUserById} />
       
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>

          {/* Update Password Card */}
          <Grid item xs={12} md={5}>
            <Card
              className="profile_card"
              style={{ marginBottom: 24, marginTop: 30 }}
              sx={{
                backgroundColor: theme.palette.custom.blue_bg,
              }}
            >
              <CardContent>
                <Typography variant="h4" align="left" gutterBottom>
                  {t("profilePage.updatePassword")}
                </Typography>
                <Typography className="form_p" variant="subtitle2">
                  {t("profilePage.passwordWarning")}
                </Typography>
              
                <form onSubmit={formik.handleSubmit}>
                  <div className="forget_div">
                    <Typography variant="subtitle1" align="left">
                      {t("profilePage.newPasswordLabel")}
                    </Typography>
                    <TextField
                      fullWidth
                      id="updatePassword"
                      name="updatePassword"
                      placeholder={t("profilePage.newPasswordPlaceholder")}
                      value={formik.values.updatePassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.updatePassword &&
                        Boolean(formik.errors.updatePassword)
                      }
                      helperText={
                        formik.touched.updatePassword &&
                        formik.errors.updatePassword
                      }
                    />
                    <Typography variant="subtitle1" align="left">
                      {t("profilePage.confirmPasswordLabel")}
                    </Typography>
                    <TextField
                      fullWidth
                      id="newPassword"
                      name="newPassword"
                      placeholder={t("profilePage.confirmPasswordPlaceholder")}
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.newPassword &&
                        Boolean(formik.errors.newPassword)
                      }
                      helperText={
                        formik.touched.newPassword && formik.errors.newPassword
                      }
                    />
                  </div>

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      background: theme.palette.custom.greenbtn,
                      color: theme.palette.custom.white,
                    }}
                  >
                    {t("profilePage.updateButton")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <CurrencySwitcher/>
          </Grid>

        </Grid>

        <Grid className="buy_footer" container spacing={5}>
          <Grid item container justifyContent="center" spacing={2}>
            <Grid item>
              <Button
                size="small"
                sx={{
                  background: theme.palette.custom.greenbtn,
                  color: theme.palette.custom.white,
                }}
                onClick={() => {
                  navigate("/purchase-history");
                }}
              >
                <span style={{ textTransform: "capitalize" }}>
                  {t("profilePage.purchaseHistoryButton")}
                </span>
              </Button>
            </Grid>

            <Grid item>
              <Button
                size="small"
                sx={{
                  background: theme.palette.custom.blue,
                  color: theme.palette.custom.white,
                  textAlign: "center",
                }}
                onClick={() => {
                  navigate("/game-history");
                }}
              >
                <span style={{ textTransform: "capitalize" }}>
                  {t("profilePage.gameHistoryButton")}
                </span>
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <SweepStakeTypography></SweepStakeTypography>
          </Grid>
        </Grid>

        {/* <Grid container alignItems="center">
        <FiberManualRecordIcon
          fontSize="5px"
          style={{ marginRight: 8, width: "10px" }}
        />
        <Typography
          variant="h6"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            navigate("/game-history");
          }}
          className="f18_700"
        >
          Gaming History
        </Typography>
      </Grid> */}

        <Grid container alignItems="center " sx={{ marginTop: 4 }}>
          <SweepStakeTypography />
        </Grid>
      </div>
    </>
  );
};

export default Profile;
