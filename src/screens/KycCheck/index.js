import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTheme } from "@emotion/react";
import { endPoints } from "../../constant/Environment";
import { useSelector } from "react-redux";
import { fetchAllData } from "../../Utility/API";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const KycCheck = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
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

  useEffect(() => {
    Kycinfo();
  }, []);

  const Kycinfo = async () => {
    let url = `${endPoints.apiBaseUrl}${endPoints.api.apiurl}/${IsLoginData?.idUser}`;
    try {
      const result = await fetchAllData(url);
      const response = await result.json();
      if (response?.status === "success") {
        setTimeout(() => {
          window.location.href = response.data.RedirectUrl;
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{t("kycCheck.title")}</title>
        <meta name="description" content={t("kycCheck.description")} />
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
              id="modal-modal-title"
              variant="h6"
              textAlign="center"
              sx={{ color: theme.palette.custom.black_light }}
            >
              {t("kycCheck.message")}
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default KycCheck;
