import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { fetchAllData } from "../../Utility/API";
import { Navigate, useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const KycApproved = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
    bgcolor: theme.palette.custom.white,
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{t("kycApproved.title")}</title>
        <meta name="description" content={t("kycApproved.description")} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div style={{ minHeight: "70vh" }}>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              sx={{ color: theme.palette.custom.black_light }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="center"
            >
              {t("kycApproved.profileVerified")}
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              sx={{
                color: theme.palette.custom.black_light,
                marginTop: "10px",
                fontSize: "18px",
              }}
            >
              {t("kycApproved.verificationMessage")}
            </Typography>
            <Typography
              id="modal-modal-description"
              display="flex"
              justifyContent="space-evenly"
            >
              <Box>
                <Button
                  className="no_hover"
                  size="large"
                  sx={{
                    background: theme.palette.custom.green1,
                    color: theme.palette.custom.white,
                    marginTop: "20px",
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    navigate("/gift-card");
                  }}
                >
                  {t("kycApproved.redeemNow")}
                </Button>
              </Box>
              <Box>
                <Button
                  size="large"
                  sx={{
                    background: theme.palette.custom.red_gradient,
                    color: theme.palette.custom.white,
                    marginTop: "20px",
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {t("kycApproved.close")}
                </Button>
              </Box>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default KycApproved;
