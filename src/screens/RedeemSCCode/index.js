import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { addData, getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const RedeemSCCode = (props) => {
  const { openCodeModal, closeCodeModal, selectedPost } = props;
  const IsLoginData = useSelector((state) => state.auth.IsLoginData);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setCode(value);
  };

  const submit = async () => {
    const data = {
      id_user: IsLoginData?.idUser || null,
      code: code,
    };

    setLoading(true);
    const url = `${endPoints.api.REDEEM_CODE}`;
    const response = await addData(url, data);
    console.log("response", response);
    setLoading(false);
    if (response.data.status == "success") {
        GetUserById();
      closeCodeModal(true);
      showSuccessSnackbar(response?.data?.message);
    } else {
      showErrorSnackbar(response?.data?.message || t("redeemSCCodeModal.errorMessage"));
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
        onClose={closeCodeModal}
        aria-labelledby="customized-dialog-title"
        open={openCodeModal}
        className="first_modal"
      >
        <IconButton
          aria-label="close"
          onClick={closeCodeModal}
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
            {t("redeemSCCodeModal.title")}
          </DialogTitle>
          <Typography variant="h1" component="h5">
            {t("redeemSCCodeModal.description")}
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
                id="code"
                name="Code"
                label={t("redeemSCCodeModal.codeLabel")}
                placeholder={t("redeemSCCodeModal.codePlaceholder")}
                value={code}
                onChange={handleChange}
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
                disabled={code == ""}
                onClick={() => {
                  submit();
                }}
              >
                {t("redeemSCCodeModal.submitButton")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default RedeemSCCode;
