import React, { useState, useRef } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { endPoints } from "../../constant/Environment";
import { addData } from "../../Utility/API";

import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { useTheme } from "@emotion/react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaMailBulk, FaPhone, FaPhoneAlt } from "react-icons/fa";
import { BsEnvelope, BsEnvelopeFill } from "react-icons/bs";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();

  const validationSchema = yup.object({
    name: yup.string().required(t('contactUs.nameRequired')),
    email: yup
      .string()
      .email(t('contactUs.emailInvalid'))
      .required(t('contactUs.emailRequired')),
    subject: yup.string().required(t('contactUs.subjectRequired')),
    message: yup.string().required(t('contactUs.messageRequired')),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
         // has to be implmented in future
      // if (!recaptchaToken) {
      //   showErrorSnackbar("Please complete the reCAPTCHA verification.");
      //   return;
      // }

      let url = `${endPoints.api.EMAIL_SUPPORT}`;
      let data = {
        fullName: values.name,
        emaill: values.email,
        subject: values.subject,
        description: values.message,
        product: "",
        reason: "",
      };
      dispatch(setLoading(true));
      await addData(url, data)
        .then((response) => {
          dispatch(setLoading(false));
          if (response.data.status === "success") {
            showSuccessSnackbar(t('contactUs.thankYou'));
            setRecaptchaToken(null);
            recaptchaRef.current?.reset(); // Reset reCAPTCHA
            setRecaptchaToken(null);
            resetForm();
          } else {
            showErrorSnackbar(response.data.message);
          }
        })
        .catch((error) => {
          dispatch(setLoading(false));

          console.error(error);
        });
    },
  });

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <>
        <Helmet>
          <title>{t('contactUs.pageTitle')}</title>
          <meta name="description" content={t('contactUs.metaDescription')} />
          <link rel="canonical" href="https://coin.spinsagacasino.com/contact-us/" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="SpinSaga Casino" />
          <meta property="og:url" content="https://coin.spinsagacasino.com/contact-us/" />
          <meta property="og:title" content={t('contactUs.pageTitle')} />
          <meta property="og:description" content={t('contactUs.metaDescription')} />
          <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={t('contactUs.pageTitle')} />
          <meta name="twitter:description" content={t('contactUs.metaDescription')} />
          <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
        </Helmet>
      <Container style={{ marginTop: 90 }}>
        <h1>{t('contactUs.title')}</h1>
        <Grid container spacing={4}>
          <Grid item md={6} xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1" align="left">
                  {t('contactUs.name')}
                </Typography>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  placeholder={t('contactUs.namePlaceholder')}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1" align="left">
                  {t('contactUs.email')}
                </Typography>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder={t('contactUs.emailPlaceholder')}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1" align="left">
                  {t('contactUs.subject')}
                </Typography>
                <TextField
                  fullWidth
                  id="subject"
                  name="subject"
                  placeholder={t('contactUs.subjectPlaceholder')}
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.subject && Boolean(formik.errors.subject)
                  }
                  helperText={formik.touched.subject && formik.errors.subject}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1" align="left">
                  {t('contactUs.message')}
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="message"
                  name="message"
                  placeholder={t('contactUs.messagePlaceholder')}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.message && Boolean(formik.errors.message)
                  }
                  helperText={formik.touched.message && formik.errors.message}
                />
              </div>

              {/* <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lf3rG4qAAAAAK6EtSke6UObz2hKZ2Q4MONUKu6e"
                onChange={handleRecaptchaChange}
                className="mt-4"
              /> */}

              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: theme.palette.custom.green_green,
                  color: theme.palette.custom.white_white,
                }}
                style={{ width: "100%", marginTop: "15px" }}
              >
                {t('contactUs.submit')}
              </Button>
            </form>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: "200px", // Adjust this for spacing between items
            }}
          >
            <div>
              <Typography variant="h5" gutterBottom>
                {/* Email: {" "}support@spinsagacasino.com */}
                <span style={{ marginRight: "10px", verticalAlign: "middle" }}>
                  <BsEnvelopeFill />
                </span>
                {/* : support@spinsagacasino.com */}
                : supports@spinsagacasino.com
              </Typography>
              <Typography
                textAlign="intial"
                variant="h5"
                marginTop={5}
                gutterBottom
              >
                {/* Call: 8447746724 */}
                <span style={{ marginRight: "5px", verticalAlign: "middle" }}>
                  <FaPhoneAlt />
                </span>{" "}
                : (844) 774-6724
              </Typography>
              <Typography variant="body1"></Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactUs;
