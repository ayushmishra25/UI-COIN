import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Button,
  useTheme,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAllBetData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";

const ShowTransferPopup = (props) => {
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();

  const closeModal = async () => {
    const url = `${endPoints.apiBaseUrl}${endPoints.api.SHOW_POPUP}/${IsLoginData?.idUser}/false`;
    try {
      const response = await getAllBetData(url);
      if (response?.status == "success") {
      } else {
        showErrorSnackbar(response?.message);
      }
    } catch (error) {
      console.log(error);
      showErrorSnackbar(
        "Issue connecting to server (error code 15). Please contact support for further assistance."
      );
    } finally {
      onClose(); // Close after API call regardless try or catch
    }
  };

  const { open, onClose } = props;
  const theme = useTheme();

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        id="locationRestrictedModal"
        className="location-modal"
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <DialogContent
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="body1" style={{ fontSize: "18px" }}>
            Your winning Real Cash can be used for redemption.
            <br /> To use them for playing games, transfer your coins using the
            'Transfer Coin' option.
          </Typography>

          <Button
            variant="contained"
            sx={{
              background: theme.palette.custom.pink_bg,
              color: theme.palette.custom.white_gray,
              marginTop: "20px",
              width: "100%",
            }}
            onClick={closeModal}
          >
            Don't show me again
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShowTransferPopup;
