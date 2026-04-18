import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField, Link } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { addData, getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { useDispatch } from "react-redux";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const MailFeature = (props) => {
  const { openMailModal, closeMailModal, selectedPost,buttonDisabled } = props;
  const IsLoginData = useSelector((state) => state.auth.IsLoginData);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setError(true);
      setHelperText(t("mailFeatureModal.invalidEmail"));
    } else {
      setError(false);
      setHelperText("");
    }
  };

  const submit = async () => {
    //  showSuccessSnackbar("Thank you, we will review you information");
    const data = {
      id_user: IsLoginData?.idUser || null,
      email: email,
    };

    setLoading(true);
    const url = `${endPoints.api.MAIL_IN_FEATURE}`;
    const response = await addData(url, data);
    console.log("response", response);
    setLoading(false);
    if (response.data.status == "success") {
        GetUserById();
        closeMailModal(true);
        buttonDisabled()
    //   setTimeout(() => {
    //     GetUserById();
    //   }, 5000);

      
      showSuccessSnackbar(t("mailFeatureModal.successMessage"));
    } else {
      showErrorSnackbar(response?.data?.message || t("mailFeatureModal.errorMessage"));
    }
  };


  const GetUserById = async () => {
    try {
      const url = `${endPoints.api.GET_BY_USERID}/${IsLoginData?.idUser}`;
      const response = await getAllData(url);
      dispatch(setLoginData({ user: response?.data, isAuthenticated: true }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={closeMailModal}
        aria-labelledby="customized-dialog-title"
        open={openMailModal}
        className="first_modal"
      >
        <IconButton
          aria-label="close"
          onClick={closeMailModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            background: theme.palette.custom.black2_light2,
            color: theme.palette.custom.white_gray,
          }}
        >
          <DialogTitle id="customized-dialog-title">
            {selectedPost?.name}
          </DialogTitle>
          <Typography variant="h1" component="h5">
            {t("mailFeatureModal.title")}
          </Typography>

          <Grid
            container
            spacing={{ xs: 4, sm: 3, md: 4 }}
            style={{ justifyContent: "center" }}
          >
            {loading && <Loader loading={loading} />}
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                id="email"
                name="email"
                label={t("mailFeatureModal.emailLabel")}
                placeholder={t("mailFeatureModal.emailPlaceholder")}
                value={email}
                onChange={handleChange}
                error={error}
                helperText={helperText}
                sx={{
                  marginTop: 2,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={{ xs: 4, sm: 3, md: 4 }}
            style={{ justifyContent: "center" }}
          >
            <Grid item xs={12}>
              <Button
                className="full_btn"
                size="medium"
                sx={{
                  background: theme.palette.custom.pink_bg,
                  color: theme.palette.custom.white_gray,
                  marginTop: 3,
                }}
                disabled={error || email == ""}
                onClick={() => {
                  submit();
                }}
              >
                {t("mailFeatureModal.submitButton")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default MailFeature;
