import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, getAllData } from "../../Utility/API";
import Loader from "../../component/Loader";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { endPoints } from "../../constant/Environment";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";

import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BirthDayFeature = (props) => {
  const { openMailModal, closeMailModal, selectedPost, buttonDisabled } = props;
  const IsLoginData = useSelector((state) => state.auth.IsLoginData);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const dispatch = useDispatch();

  const submit = async () => {
    const data = {
      id_user: IsLoginData?.idUser || null,
    };

    setLoading(true);
    const url = `${endPoints.api.BIRTHDAY_CLAIM}`;
    const response = await addData(url, data);
    console.log("response", response);
    setLoading(false);
    if (response.data.status == "success") {
      GetUserById();
      closeMailModal(true);
      buttonDisabled();

      showSuccessSnackbar(
        response?.message ?? "Thank you! You will receive bouns shortly."
      );
    } else {
      showErrorSnackbar(response?.data?.message || "Something went wrong");
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
      <Dialog
        open={openMailModal}
        size=""
        className="first_modal"
        onClose={closeMailModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
        <DialogTitle id="alert-dialog-title"> {selectedPost?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Claim your birthday bonus and receive free Real Cash! Are you sure
            you want to proceed?
          </DialogContentText>
          {loading && <Loader loading={loading} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeMailModal()} color="primary">
            Cancel
          </Button>
          <Button
            //   className="full_btn"
            size="medium"
            sx={{
              background: theme.palette.custom.pink_bg,
              color: theme.palette.custom.white_gray,
              marginTop: 0,
            }}
            onClick={() => {
              submit();
            }}
          >
            Confirm
          </Button>

          {/* <Button
            disabled={error || email == ""}
            onClick={() => {
      
              submit();
            }}
            color="primary"
            autoFocus
          >
            Confirm
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BirthDayFeature;
