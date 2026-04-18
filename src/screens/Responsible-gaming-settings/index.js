import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../../constant/Environment";
import { addData } from "../../Utility/API";
import { useAuth } from "../../AuthContext";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";

const ResponsibleGamingsettings = () => {
  const { t } = useTranslation();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const [show, setShow] = useState(false);
  const [cooloff, setCooloff] = useState(false);

  const dispatch = useDispatch();
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();
  const [cooloffperiod, setcooloffperiod] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const closeCool = () => setCooloff(false);

  const openCool = () => {
    if (!cooloffperiod) {
      showErrorSnackbar(t("responsibleGamingSettings.enterTimePeriod"));
      return;
    }
    setCooloff(true);
  };

  const currencies = [
    {
      value: "1",
      label: t("responsibleGamingSettings.day1"),
    },
    {
      value: "3",
      label: t("responsibleGamingSettings.day3"),
    },
    {
      value: "7",
      label: t("responsibleGamingSettings.day7"),
    },
    {
      value: "14",
      label: t("responsibleGamingSettings.day14"),
    },
    {
      value: "30",
      label: t("responsibleGamingSettings.day30"),
    },
  ];

  const handleCooloff = async () => {
    let data = {
      id_user: IsLoginData?.idUser,
      time_period: cooloffperiod ? parseInt(cooloffperiod) : "",
      isActive: true,
    };
    // if (!cooloffperiod) {
    //   showErrorSnackbar("please enter the time period");
    //   return;
    // }
    dispatch(setLoading(true));
    let url = `${endPoints.api.USER_COOLOFF}`;
    let result = await addData(url, data);
    try {
      if (result.data.status === "success") {
        showSuccessSnackbar(result?.data?.message);
        dispatch(setLoading(false));
        logout();
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleExclude = async () => {
    let data = {
      id_user: IsLoginData?.idUser,
      isActive: true,
    };
    let url = `${endPoints.api.USER_EXCLUDE}`;
    dispatch(setLoading(true));
    let result = await addData(url, data);
    try {
      if (result.data.status === "success") {
        showSuccessSnackbar(result?.data?.message);
        logout();
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("responsibleGamingSettings.pageTitle")}</title>
        <meta name="description" content={t("responsibleGamingSettings.pageDescription")} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* exclude Dialog */}
      <Dialog
        open={show}
        onClose={handleClose}
        disableEscapeKeyDown
        PaperProps={{
          style: { backgroundColor: "white" },
        }}
      >
        <DialogTitle>
          <Typography
            variant="h5"
            style={{ color: theme.palette.custom.black_light }}
          >
            <strong>{t("responsibleGamingSettings.exclusionDialogTitle")}</strong>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="h6"
            style={{ color: theme.palette.custom.black_light }}
          >
            {t("responsibleGamingSettings.confirmMessage")}
          </Typography>
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
        >
          {/* Cancel Button */}
          <Button
            style={{
              background: theme.palette.custom.red_gradient,
              marginRight: "5px",
            }}
            variant="secondary"
            onClick={handleClose}
          >
            {t("responsibleGamingSettings.no")}
          </Button>

          {/* Confirm Exclusion Button */}
          <Button
            style={{ background: theme.palette.custom.greenbtn }}
            variant="danger"
            onClick={handleExclude}
          >
            {t("responsibleGamingSettings.yes")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* cool off Dialog */}
      <Dialog
        open={cooloff}
        onClose={closeCool}
        disableEscapeKeyDown
        PaperProps={{
          style: { backgroundColor: "white" },
        }}
      >
        <DialogTitle>
          <Typography
            variant="h5"
            style={{ color: theme.palette.custom.black_light }}
          >
            <strong>{t("responsibleGamingSettings.cooloffDialogTitle")}</strong>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="h6"
            style={{ color: theme.palette.custom.black_light }}
          >
            {t("responsibleGamingSettings.confirmMessage")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              background: theme.palette.custom.red_gradient,
              marginRight: "5px",
            }}
            variant="secondary"
            onClick={closeCool}
          >
            {t("responsibleGamingSettings.no")}
          </Button>
          <Button
            style={{ background: theme.palette.custom.greenbtn }}
            variant="danger"
            onClick={handleCooloff}
          >
            {t("responsibleGamingSettings.yes")}
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h6">{t("responsibleGamingSettings.heading")}</Typography>
      <Grid container spacing={4} sx={{ marginTop: 1, paddingBottom: 4 }}>
        {/* Cool Off Period Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: theme.palette.custom.blue_bg,
              p: 3,
              borderRadius: 2,
            }}
            height={isMobile ? 420 : 350}
          >
            <Typography variant="h6" gutterBottom>
              {t("responsibleGamingSettings.cooloffSection")}
            </Typography>
            <Typography variant="body1">
              {t("responsibleGamingSettings.cooloffDescription")}
            </Typography>
            <Typography variant="body2" sx={{ pt: 1 }}>
              {t("responsibleGamingSettings.cooloffNote")}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <FormLabel
                htmlFor="numberOfDays"
                sx={{ display: "block", mb: 1 }}
              >
                {t("responsibleGamingSettings.periodLabel")}
              </FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  id="numberOfDays"
                  value={cooloffperiod}
                  onChange={(e) => setcooloffperiod(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    {t("responsibleGamingSettings.selectDays")}
                  </MenuItem>
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                sx={{
                  background: theme.palette.custom.greenbtn,
                  color: theme.palette.custom.white,
                  textTransform: "capitalize",
                }}
                onClick={openCool}
              >
                {t("responsibleGamingSettings.setCooloff")}
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Self Exclusion Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: theme.palette.custom.blue_bg,
              p: 3,
              borderRadius: 2,
            }}
            height={isMobile ? 420 : 350}
          >
            <Typography variant="h6" gutterBottom>
              {t("responsibleGamingSettings.selfExclusionSection")}
            </Typography>
            <Typography variant="body1">
              {t("responsibleGamingSettings.selfExclusionDescription")}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {t("responsibleGamingSettings.selfExclusionNote1")}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {t("responsibleGamingSettings.selfExclusionNote2")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: theme.palette.custom.white,
                fontWeight: "bold",
              }}
            >
              {t("responsibleGamingSettings.selfExclusionPermanent")}
            </Typography>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                sx={{
                  background: theme.palette.custom.greenbtn,
                  color: theme.palette.custom.white,
                  textTransform: "capitalize",
                }}
              >
                {t("responsibleGamingSettings.selfExcludeButton")}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ResponsibleGamingsettings;
