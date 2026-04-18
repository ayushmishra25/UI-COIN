import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useLocation } from "react-router-dom";
import { endPoints } from "../../constant/Environment";
import { addData } from "../../Utility/API";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { Helmet } from "react-helmet";

const OTP = () => {
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { email } = location.state || {};

  const validationSchema = yup.object({
    otp: yup
      .array()
      .of(yup.string().required(t("auth.otpRequired")))
      .min(6, t("auth.otpLength"))
      .max(6, t("auth.otpLength")),
  });

  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const otp = values.otp.join("");
      // console.log("OTP:", otp);
      // navigate("/new-password");
      let url = `${endPoints.api.OTP_VERIFICATION}`;
      let payload = {
        login: email,
        otp: otp,
      };
      dispatch(setLoading(true));
      await addData(url, payload)
        .then((response) => {
          dispatch(setLoading(false));
          if (response.data.status == "success") {
            navigate("/new-password", { state: { email: email, otp: otp } });
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

  const resendMail = async () => {
    let url = `${endPoints.api.FORGOT_PASSWORD}`;
    let payload = {
      login: email,
    };
    dispatch(setLoading(true));

    await addData(url, payload)
      .then((response) => {
        dispatch(setLoading(false));
        if (response.data.status == "success") {
          showSuccessSnackbar(response.data.message);
        } else {
          showErrorSnackbar(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(setLoading(false));
      });
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const otp = [...formik.values.otp];
      otp[index] = value;
      formik.setFieldValue("otp", otp);

      // Auto move to the next input
      if (index < 5 && value) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else {
      // Clear the current input if the value is invalid
      const otp = [...formik.values.otp];
      otp[index] = "";
      formik.setFieldValue("otp", otp);
    }
  };

  return (
    <>
      <Helmet>
        <title>Enter OTP - Spinsaga Casino</title>
        <meta name="description" content="Enter your one-time password to verify and secure your account." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Grid
        container
        spacing={{ xs: 1, sm: 1, md: 2 }}
        justifyContent="center"
        rowSpacing={1}
        className="login_port"
      >
        <Grid item md={5}>
          <div className="login_page form_logout otp_page">
            <img
              src={require("../../images/logo.png")}
              className="logo"
              alt="logo"
            />
            <h3>{t("auth.passwordReset")}</h3>
            <p>{t("auth.sentCodeTo")} {email}</p>

            <form onSubmit={formik.handleSubmit}>
              <Box
                display="flex"
                justifyContent="center"
                sx={{
                  gap: {
                    xs: 3,
                    sm: 2,
                    md: 3,
                  },
                }}
              >
                {formik.values.otp.map((_, index) => (
                  <TextField
                    key={index}
                    id={`otp-input-${index}`}
                    name={`otp[${index}]`}
                    value={formik.values.otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onFocus={(e) => e.target.select()}
                    inputProps={{
                      maxLength: 1,
                      style: {
                        textAlign: "center",
                        fontSize: "24px",
                        width: "40px",
                      },
                    }}
                    error={Boolean(
                      formik.errors.otp && formik.errors.otp[index]
                    )}
                  />
                ))}
              </Box>
              <Button color="primary" variant="contained" type="submit">
                {t("auth.continue")}
              </Button>
              <p className="sign_p">
                {t("auth.didntReceiveCode")} {" "}
                <a
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => {
                    resendMail();
                  }}
                >
                  {t("auth.clickResend")}
                </a>
              </p>
              <p className="sign_p login_p">
                {" "}
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

export default OTP;
