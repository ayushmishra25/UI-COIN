import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { endPoints } from "../../constant/Environment";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { addData } from "../../Utility/API";
import { Button, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

const EmailVerification = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userName, token } = useParams();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const [verified, setVerified] = useState(false);
  const [emailData, setEmailData] = useState("");

  useEffect(() => {
    dispatch(setLoading(true));
    emailVerify();
  }, []);

  const emailVerify = async () => {
    let url = `${endPoints.api.activations}/${userName}/${token}`;
    await addData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response.data.status === "success") {
          setVerified(true);

          setEmailData(response.data.data.email);
        } else {
          showErrorSnackbar(response.data.message);
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        showErrorSnackbar(t("auth.somethingWentWrong"));
        console.error(error);
      });
  };

  return (
    <>
    <Helmet>
        <title>Activate Your Spinsaga Account</title>
        <meta name="description" content="Click the link to activate your Spinsaga Casino account and start playing instantly." />
        <meta name="robots" content="noindex, nofollow" />
    </Helmet>

      <Grid container spacing={2} justifyContent="center" rowSpacing={1}>
        <Grid item md={5}>
          <div className="login_page">
            <img
              src={require("../../images/logo.png")}
              className="logo"
              alt="logo"
            />
            {verified && (
              <div className="thanks_div">
                <img
                  src={require("../../images/verified.png")}
                  className="logo"
                  alt="logo"
                />

                <Typography variant="h3">{t("auth.accountVerified")}</Typography>
                <Typography variant="subtitle1">
                  {t("auth.congratulations")} <br/>
                   {emailData} {t("auth.hasBeenVerified")}
                </Typography>
                <div className="space_div">
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={{marginTop:'40px'}}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    {t("auth.login")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default EmailVerification;
