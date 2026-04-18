import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { endPoints } from "../../constant/Environment";
import { addData } from "../../Utility/API";
import Loader from "../../component/Loader";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { Helmet } from "react-helmet";

const Forget = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  const validationSchema = yup.object({
    email: yup
      .string(t("auth.emailRequired"))
      .email(t("auth.invalidEmail"))
      .required(t("auth.emailRequired")),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //  navigate("/otp", { state: { email: 'values.email' } });
      let url = `${endPoints.api.FORGOT_PASSWORD}`;
      let payload = {
        login: values.email,
      };
      dispatch(setLoading(true));

      await addData(url, payload)
        .then((response) => {
          dispatch(setLoading(false));
          if (response.data.status == "success") {
            navigate("/otp", { state: { email: values.email } });
            //  SuccesToast(response.data.message);
          } else {
             showErrorSnackbar(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
          dispatch(setLoading(false));
        });
    },
  });

  return (
    <>
          <Helmet>
            <title>Forgot Password - Reset Your Spinsaga Account</title>
            <meta name="description" content="Reset your password securely to regain access to your Spinsaga account." />
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
      <Grid container spacing={2} justifyContent="center" rowSpacing={1} className="login_port">
        <Grid item md={5}>
          <div className="login_page form_logout">
            <img
              src={require("../../images/logo.png")}
              className="logo"
              alt="logo"
            />
            <h3>{t("auth.forgotPasswordTitle")}</h3>
            <p>{t("auth.forgotPasswordSubtitle")}</p>

            <form onSubmit={formik.handleSubmit}>
              <div className="forget_div">
                <Typography variant="subtitle1" align="left">
                  {t("auth.emailAddressLabel")}
                </Typography>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder={t("auth.enterEmailPlaceholder")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>

              <Button color="primary" variant="contained" type="submit">
                {t("auth.resetPassword")}
              </Button>
              <p className="sign_p login_p">
                {" "}
                <Link to="/login">
                  <GoArrowLeft />
                  {t("auth.backToLogin")}
                </Link>
              </p>

              <p className="sign_p">
                {t("auth.notMemberYet")} <Link to="/signUp">{t("auth.signUpNow")}</Link>
              </p>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Forget;
