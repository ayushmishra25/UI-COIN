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
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useSnackbarContext } from "../../component/SnackbarContext";
import {
  getAllData,
  addData,
  addBetData,
  getAllBetData,
} from "../../Utility/API";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import Loader from "../../component/Loader";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";

const CardModal = (props) => {
  const { open, onClose } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const [cardInfo, setCardInfo] = useState([]);
  const loginData = useSelector((state) => state.auth.IsLoginData);

  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [withDrawCoin, setWithDrawCoin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [selectedCard, setSelectedCard] = useState("");

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
    } else if (
      parseInt(withDrawCoin) > loginData?.casinobench?.withdrawl_limit
    ) {
      showErrorSnackbar(
        `Maximum withdrawal amount is ${loginData?.casinobench?.withdrawl_limit}`
      );
      return;
    } else {
      withDrawCashCardSubmit();
    }
  };

  const withDrawCashCardSubmit = async () => {
    let url = `${endPoints.api.SKRIL_CARD_WITHDRAW}`;
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
      customerId: selectedCard.customerId, // get this from the slected code
      handleId: selectedCard.handleId,
    };
    try {
      let response = await addData(url, data);
      console.log("response", response);
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
      setHelperText("");
      setError(false);
      setSelectedCard("");
      setWithDrawCoin("");
    }
  }, [open]);

  useEffect(() => {
    getAddedCardInfo();
  }, [loginData]);

  const getAddedCardInfo = async () => {
    try {
      if (loginData?.idUser) {
        let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.CARD_INFO_BY_ID}/${loginData?.idUser}`;
        const response = await getAllBetData(url);
        // console.log("response", response);
        if (response?.status === "success") {
          setCardInfo(response.data);
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
            Cash Withdrawal via Card
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
            {cardInfo.length > 0 ? (
              <Grid item xs={12}>
                <div className="">
                  <div className="">
                    <div>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          select
                          fullWidth
                          label="Select Card"
                          name="cardExpiryMonth"
                          value={selectedCard.last4 || ""}
                          onChange={(e) => {
                            const selected = cardInfo.find(
                              (card) => card.last4 === e.target.value
                            );
                            setSelectedCard(selected || {});
                          }}
                        >
                          {cardInfo.map((card) => (
                            <MenuItem key={card.last4} value={card.last4}>
                              **** **** **** {card.last4}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Typography
                        variant="h6"
                        align="left"
                        sx={{ marginTop: 2 }}
                      >
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
                          let value = e.target.value;
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
                      disabled={error || selectedCard == ""}
                    >
                      Redeem Now
                    </Button>
                  </div>
                </div>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: theme.palette.custom.l_gray,
                  }}
                >
                  Please add your card first before redeeming via card
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <Link
                    style={{
                      cursor: "pointer",
                    }}
                    underline="hover"
                    onClick={() => {
                      onClose();
                      navigate("/add-card");
                    }}
                  >
                    Click here to add a card
                  </Link>
                </Typography>
                <Button
                  size="medium"
                  sx={{
                    background: theme.palette.custom.red,
                    color: theme.palette.custom.white,
                    marginTop: 2,
                  }}
                  onClick={() => {
                    onClose();
                  }}
                >
                  Ok
                </Button>
              </Grid>
            )}

            {/* */}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardModal;
