import React from "react";
import "./../Login/login.css";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { Helmet } from "react-helmet";

const SuccessPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Password Reset Successful - Spinsaga</title>
        <meta name="description" content="Your password has been updated successfully. Log in and start playing now." />
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
          <div className="login_page form_logout reset_page">
            <img
              src={require("../../images/logo.png")}
              className="logo"
              alt="logo"
            />
            {/* <h3>Set new password</h3>
            <p>Password must be 8-20 Characters.</p> */}

            <div>
              <img
                src={require("../../images/Group.png")}
                className="logo"
                alt="logo"
              />
            </div>
            <h3>{t("auth.allDone")}</h3>
            <p>{t("auth.passwordResetSuccess")}</p>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("auth.login")}
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SuccessPassword;
