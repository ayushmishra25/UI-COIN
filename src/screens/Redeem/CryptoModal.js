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
  MenuItem,
  TextField,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { endPoints, PaymentEndpoints } from "../../constant/Environment";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { getAllData, addData, getAllBetData } from "../../Utility/API";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import Loader from "../../component/Loader";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";

const CryptoModal = (props) => {
  const { open, onClose } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const loginData = useSelector((state) => state.auth.IsLoginData);

  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  const [withDrawCoin, setWithDrawCoin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [cryptoValue, setCryptoValue] = useState([]);
  const [address, setAddress] = useState("");

  const RandomRefNum = (prefix) => {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return `${prefix}_${randomNum}`;
  };

  const withDrawOption = () => {

    console.log("withDrawCoin",withDrawCoin);
    if (!withDrawCoin) {
      showErrorSnackbar("Please enter coin to redeem to continue.");
      return;
    } else if (
      parseInt(loginData?.account?.balance) === 0 ||
      parseInt(withDrawCoin) > parseInt(loginData?.account?.balance)
    ) {
      showErrorSnackbar(
        "You do not have sufficient coin in your account to process this redeem."
      );
      return;
    }
    // if (parseInt(withDrawCoin) < 15) {
    //   showErrorSnackbar("Minimum withdrawal amount is 15");
    //   return;
    // }
     else if (
      parseInt(withDrawCoin) > loginData?.casinobench?.withdrawl_limit
    ) {
      showErrorSnackbar(
        `Maximum redeem amount is ${loginData?.casinobench?.withdrawl_limit}`
      );
      return;
    } else if (!selectedCrypto) {
      showErrorSnackbar("Please select a crypto currency.");
      return;
    } else if (!address) {
      showErrorSnackbar("Please enter your crypto address.");
      return;
    } else {
      withDrawCryptoSubmit();
    }
  };

  const withDrawCryptoSubmit = async () => {
    let url = `${endPoints.api.CRYPTO_REDEEM}`;
    const merchantRefNum = RandomRefNum(`spinsaga_${loginData?.idUser}`);
    setIsLoading(true);
    let data = {
      merchantRefNum: merchantRefNum,
      amount: withDrawCoin,
      id_user: loginData?.idUser,
      currency: selectedCrypto?.currency,
      address: address,
      customerIp: "49.36.215.4",
      street: loginData?.address,
      city: loginData?.stateName,
      zip: loginData?.zipCode,
      state: loginData?.stateCode,
      country: loginData?.country,
      emailId: loginData?.email,
      firstName: loginData?.name,
      lastName: loginData?.surname,
      phone: loginData?.mobile || loginData?.phone,
      // email: email,
    };
    try {
      let response = await addData(url, data);
      setIsLoading(false);
      if (response.data.status === "success") {
        setWithDrawCoin("");
        setAddress("");
        GetUserById();
        onClose();

        setSuccessModal(true);
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
      setSelectedCrypto("");
      setWithDrawCoin("");
      setAddress("");
    }
  }, [open]);

  useEffect(() => {
    getCryptoValues();
  }, []);

  const getCryptoValues = async () => {
    try {
      if (loginData?.idUser) {
        let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.GET_CRYPTO_BY_USER}/${loginData?.idUser}`;
        const response = await getAllBetData(url);
        if (response.length > 0) {
          setCryptoValue(response);
        }
      }
    } catch (error) {
      console.error(error);
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
        slotProps={{
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
            Redeem via Crypto
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
            {cryptoValue.length > 0 ? (
              <Grid item xs={12}>
                <Typography variant="h6" align="left" sx={{ marginTop: 1 }}>
                  Max Redeemable Real Cash : {parseFloat(loginData?.account?.balance || 0).toFixed(2)}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Coins"
                  type="number"
                  value={withDrawCoin}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (!/^\d*\.?\d*$/.test(value)) return;
                    setWithDrawCoin(value);
                  }}
                  inputProps={{ min: 1 }}
                />

                <TextField
                  select
                  fullWidth
                  label="Select Currency"
                  sx={{ marginTop: 2 }}
                  value={selectedCrypto.currency || ""}
                  onChange={(e) => {
                    const selected = cryptoValue.find(
                      (c) => c.currency === e.target.value
                    );
                    setSelectedCrypto(selected || {});
                    setAddress(selected?.address || "");
                  }}
                >
                  {cryptoValue.map((c) => (
                    <MenuItem key={c.currency} value={c.currency}>
                      {c.currency}
                    </MenuItem>
                  ))}
                </TextField>

                {/* <TextField
                  select
                  fullWidth
                  label="Select Currency"
                  sx={{marginTop:2}}
                  value={selectedCrypto.address || ""}
                  onChange={(e) => {
                    const selected = cryptoValue.find(
                      (c) => c.address === e.target.value
                    );
                    setAddress(selected || {});
                  }}
                >
                  {cryptoValue.map((c) => (
                    <MenuItem key={c.address} value={c.address}>
                      {c.address}
                    </MenuItem>
                  ))}
                </TextField> */}

                <TextField
                  fullWidth
                  size="small"
                  placeholder="Your Crypto Address"
                  value={selectedCrypto?.address || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ marginTop: 2 }}
                />

                <Button
                  size="medium"
                  sx={{
                    background: theme.palette.custom.red,
                    color: theme.palette.custom.white,
                    marginTop: 2,
                  }}
                  onClick={withDrawOption}
                  disabled={!selectedCrypto}
                >
                  Redeem Now
                </Button>

                <Typography sx={{ mt: 1 }}>
                  <Link
                    style={{ cursor: "pointer" }}
                    underline="hover"
                    onClick={() => {
                      onClose();
                      navigate("/add-crypto");
                    }}
                  >
                    Click here to add a new crypto wallet
                  </Link>
                </Typography>

              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography sx={{ color: theme.palette.custom.l_gray }}>
                  Please add your crypto wallet first before redeeming via
                  crypto
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <Link
                    style={{ cursor: "pointer" }}
                    underline="hover"
                    onClick={() => {
                      onClose();
                      navigate("/add-crypto");
                    }}
                  >
                    Click here to add a crypto wallet
                  </Link>
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CryptoModal;
