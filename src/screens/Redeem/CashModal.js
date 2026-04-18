import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Button,
  useTheme,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { endPoints } from "../../constant/Environment";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { getAllData, addData, addBetData } from "../../Utility/API";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import Loader from "../../component/Loader";
import SuccessModal from "./SuccessModal";

const CashModal = (props) => {
  const { open, onClose } = props;

  const theme = useTheme();

  const loginData = useSelector((state) => state.auth.IsLoginData);
    // console.log("loginData", loginData);
  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [withDrawCoin, setWithDrawCoin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const RandomRefNum = (prefix) => {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return `${prefix}_${randomNum}`;
  };

  const withDrawOption = () => {
    if (!withDrawCoin) {
      showErrorSnackbar("Please enter coin to withdraw to continue.");
      return; // Stop execution if amount is null
    } else if (
      parseInt(loginData?.account?.balance) == 0 ||
      parseInt(withDrawCoin) > parseInt(loginData?.account?.balance)
    ) {
      showErrorSnackbar(
        "You do not have sufficient coin in your account to process this withdrawal."
      );
      return;
    }
    if (parseInt(withDrawCoin) < 15) {
      showErrorSnackbar("Minimum withdrawal amount is 15");
      return;
    } else if (parseInt(withDrawCoin) > loginData?.casinobench?.withdrawl_limit) {
      showErrorSnackbar(`Maximum withdrawal amount is ${loginData?.casinobench?.withdrawl_limit}`);
      return;
    } else {
      withDrawCashSubmit();
      // onClose();
      // setSuccessModal(true);
    }
  };

  const withDrawCashSubmit = async () => {
    let url = `${endPoints.api.SKRILL_WITHDRAW}`;
    const merchantRefNum = RandomRefNum(`spinsaga_${loginData?.idUser}`);
    setIsLoading(true);
    let data = {
      merchantRefNum: merchantRefNum,
      amount: withDrawCoin,
      customerIp: "49.36.215.4",
      street: loginData?.address,
      city: loginData?.stateName,
      zip: loginData?.zipCode,
      state: loginData?.stateCode,
      country: loginData?.country,
      emailId: loginData?.email,
      id_user: loginData?.idUser,
      firstName: loginData?.name,
      lastName: loginData?.surname,
      phone: loginData?.mobile || loginData?.phone,
      email: email,
    };
    try {
      let response = await addData(url, data);
      //   console.log("response", response);
      setIsLoading(false);
      if (response.data.status == "success") {
        setWithDrawCoin("");
        // showSuccessSnackbar(response.data.message);

        GetUserById();
        onClose();
        setSuccessModal(true);
      } else if (response.data.status == "failure") {
        showErrorSnackbar(response.data.message);
      } else {
        showErrorSnackbar(response.data.message);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("err", err);
    }
  };

  const GetUserById = async () => {
    try {
      if (loginData?.idUser) {
        const url = `${endPoints.api.GET_BY_USERID}/${loginData?.idUser}`;
        const response = await getAllData(url);
        dispatch(setLoginData({ user: response.data, isAuthenticated: true }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (open) {
      setEmail("");
      setHelperText("");
      setError(false);
    }
  }, [open]);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setError(true);
      setHelperText("Please enter a valid email address");
    } else {
      setError(false);
      setHelperText("");
    }
  };

  return (
    <>
      {successModal && (
        <SuccessModal
          onClose={() => {
            setSuccessModal(false);
          }}
          open={successModal}
        />
      )}
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        id="infoModal"
        className="info-modal Purchase_modal"
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        {isLoading && <Loader loading={isLoading} />}
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
            Cash Redeem via Skrill
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <hr />
        <DialogContent
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="">
                <div className="">
                  <div style={{ marginBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      id="email"
                      name="email"
                      label="Email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={handleChange}
                      error={error}
                      helperText={helperText}
                    />
                  </div>
                  <div>
                    <Typography variant="h6" align="left">
                      Max Redeemable Real Cash :{" "}}
                      {parseFloat(loginData?.account?.balance || 0).toFixed(2)}
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      id="email"
                      name="email"
                      placeholder="Enter Coins"
                      type="number"
                      value={withDrawCoin}
                      onChange={(e) => {
                        // const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                        let value = e.target.value;

                        // Allow only numbers and a single decimal point
                        if (!/^\d*\.?\d*$/.test(value)) return;
                        setWithDrawCoin(value);
                      }}
                      inputProps={{ min: 1 }}
                    />
                  </div>
                </div>
                <div className="">
                  <Button
                    size="medium"
                    sx={{
                      background: theme.palette.custom.red,
                      color: theme.palette.custom.white,
                      marginTop: 2,
                    }}
                    onClick={() => {
                      withDrawOption();
                    }}
                    disabled={error || email == ""}
                  >
                    Redeem Now
                  </Button>
                </div>
              </div>
              <hr className="devided_hr" />

              <div className="modal_bottom">
                <Typography
                  sx={{
                    color: theme.palette.custom.l_gray,
                  }}
                >
                  Don't have Skrill? You will receive an email with your
                  redeem with instructions on registering. Redeems are
                  only sent to the email address as yourSpinSaga account.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CashModal;
