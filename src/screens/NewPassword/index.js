import React from "react";
import "./../Login/login.css";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { Helmet } from "react-helmet";

const NewPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const { email, otp } = location.state || {};

  const validationSchema = yup.object({
    password: yup
      .string(t("auth.passwordValidation"))
      .min(8, t("auth.passwordMinLength"))
      .max(20, t("auth.passwordMaxLength"))
      .matches(/[A-Z]/, t("auth.passwordUppercase"))
      .matches(/[a-z]/, t("auth.passwordLowercase"))
      .matches(/[0-9]/, t("auth.passwordNumber"))
      .matches(/[\W_]/, t("auth.passwordSpecial"))
      .required(t("auth.passwordRequired")),

    confirmPassword: yup
      .string(t("auth.passwordValidation"))
      .required(t("auth.confirmPasswordRequired"))
      .oneOf([yup.ref("password"), null], t("auth.passwordsMustMatch")),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // You can handle the form submission here

      let payload = {
        login: email,
        // idUser: userData?.idUser,
        passwd: values.password,
        otp: otp,
        oldPasswd: "",
      };
      let url = `${endPoints.api.CHANGE_PASS}`;

      try {
        const response = await updateUser(url, payload);

        dispatch(setLoading(false));
        if (response?.status === "success") {
          showSuccessSnackbar(response.message);
          navigate("/success");
        } else {
          showErrorSnackbar(response.message);
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.error(error);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Create New Password - Spinsaga Casino</title>
        <meta name="description" content="Set a new password and continue enjoying your Spinsaga gaming experience." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        rowSpacing={1}
        className="login_port"
      >
        <Grid item md={5}>
          <div className="login_page form_logout new_forget_page">
            <img
              src={require("../../images/logo.png")}
              className="logo"
              alt="logo"
            />
            <h3>{t("auth.setNewPassword")}</h3>
            <p>
              {t("auth.passwordRequirements")}
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className="forget_div">
                <Typography variant="subtitle1" align="left">
                  {t("auth.passwordLabel")}
                </Typography>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  placeholder={t("auth.enterPassword")}
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Typography variant="subtitle1" align="left">
                  {t("auth.confirmPasswordLabel")}
                </Typography>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t("auth.enterConfirmPassword")}
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </div>

              <Button color="primary" variant="contained" type="submit">
                {t("auth.resetPassword")}
              </Button>
              <p className="sign_p login_p">
                <Link to="/login">
                  <GoArrowLeft />
                  {t("auth.backToLogin")}
                </Link>
              </p>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default NewPassword;
