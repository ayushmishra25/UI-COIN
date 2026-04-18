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
  Autocomplete,
  TextField,
  Avatar,
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import skrill from "../../images/SkrillLogo.png";
import "./infoStyle.css";
import { Link } from "react-router-dom";
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
import { SkrillEnv } from "../../constant/SkrillEnv";
import Loader from "../../component/Loader";
import StripeModal from "./StripeModal";
import VisaImg from "../../images/visa.svg";
import DiscoverImg from "../../images/discover.svg";
import MastercardImg from "../../images/master.svg";
import Amazon_PayImg from "../../images/amazon.png";
import PaymentButton from "./PaymentButton";
import NowPaymentModal from "./NowPaymentModal";
import { CurrencyList } from "./CurrencyList";
const PaymentModal = (props) => {
  const {
    open,
    onClose,
    selecteNewPackage,
    getCoinPackageList,
    GetUserById,
    paymentMode,
  } = props;
  const [stripeOpen, setStripeOpen] = useState(false);
  const [nowPayOpen, setNowPayOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isCrypto, setIsCrypto] = useState(false);
  
  const [cryptoCurrency, setCryptoCurrency] = useState(CurrencyList);


  const [selectedCrypto, setSelectedCrypto] = useState("");
  const theme = useTheme();
  // console.log("selecteNewPackage", selecteNewPackage);
  const { bonus_amount, purchase_price } = selecteNewPackage;
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  useEffect(() => {
    // getAllCrytoCurrency();
  }, []);

  const getAllCrytoCurrency = async () => {
    try {
      const url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.GET_CRYPTO_CURRENCY}`;
      const response = await getAllBetData(url);
      if (response.status == "success") {
        setCryptoCurrency(response.data);
      } else {
        setCryptoCurrency([]);
      }
      // console.log("response", response);
    } catch (error) {
      console.error("Error fetching crypto currency data:", error);
    }
  };
  const stripeClose = () => {
    setStripeOpen(false);
  };
  const closeModal = (flag) => {
    console.log("flag----", flag);
    //https://nowpayments.io/payment/?iid=6295514203
    onClose();
    setSelectedCrypto("");
    if (flag) {
      console.log("called flag used ");
      setNowPayOpen(true);
    }
  };
  const stripeShow =
    (paymentMode ?? []).some(
      (item) => item?.paymentMode === "Stripe" && item?.isActive
    ) || paymentMode.length == 0;

  const skrillShow =
    (paymentMode ?? []).some(
      (item) => item?.paymentMode === "Skrill" && item?.isActive
    ) || paymentMode.length == 0;

  const paywithCrypto = async () => {
    // setIsCrypto(true);

    if (selectedCrypto === "") {
      showErrorSnackbar("Please select currency");
      return;
    }

    try {
      setLoading(true);
      let req = {
        id_user: loginData?.idUser,
        price_currency: "usd",
        pay_currency: selectedCrypto,
        packageId: selecteNewPackage.id,
      };
      // console.log("Request for crypto payment:", req);
      const response = await addBetData(
        `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.CRYPTO_PAYMENT}`,
        req
      );
      setLoading(false);
      console.log("Response from crypto payment:", response);
      if (response.data.status === "success") {
        // showSuccessSnackbar("Payment successful!");

        closeModal(true);
        //
        // setPaymentUrl(response?.data?.data?.invoice_url || '')
        getPaymentDetailsByPaymentId(response?.data?.data?.payment_id || "");
        // GetUserById()
        // getCoinPackageList();
      } else {
        showErrorSnackbar(
          response.data.message || "Payment failed. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during payment:", error);
      showErrorSnackbar("Payment failed. Please try again.");
    }
  };

  // const getPaymentDetailsByPaymentId = async (paymentId) => {
  //   try {
  //     const url =   `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.GET_PAYMENT_DETAILS}/${paymentId}`;
  //     // `${endPoints.api.GET_PAYMENT_DETAILS}/${paymentId}`;
  //     const response = await getAllBetData(url);
  //     console.log("Response from getPaymentDetailsByPaymentId:", response);
  //     if (response?.status === "success") {
  //       // Handle successful response
  //     } else {
  //       showErrorSnackbar("Failed to fetch payment details.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching payment details:", error);
  //     showErrorSnackbar("Failed to fetch payment details.");
  //   }
  // };
  const getPaymentDetailsByPaymentId = async (
    paymentId,
    { maxAttempts = 25, initialDelay = 2000 } = {}
  ) => {
    let attempt = 0;
    let delay = initialDelay; // ms, exponential backoff up to 5s

    while (attempt < maxAttempts) {
      try {
        const url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.GET_PAYMENT_DETAILS}/${paymentId}`;
        const response = await getAllBetData(url);
        console.log("[poll] payment status resp:", response);

        // Normalize status from various APIs
        const status = response?.status;

        // Success / terminal success
        if (status === "success") {
          showSuccessSnackbar("Payment confirmed!");
          // Refresh balances and package list if handlers are provided
          try {
            setNowPayOpen(false);
            GetUserById && (await GetUserById());
            getCoinPackageList && (await getCoinPackageList());
          } catch (e) {
            console.warn("Post-payment refresh error:", e);
          }
          return response;
        }

        // Transient/waiting states -> keep polling (DO NOT show error/snackbar)
        if (status === "waiting") {
          setPaymentInfo(response);
          // setPaymentStatus(
          //   "Awaiting payment confirmation... please do not refresh or close this window until your transaction is complete."
          // );
          attempt += 1;
          await new Promise((resolve) => setTimeout(resolve, delay));
          if (delay < 5000) delay = Math.min(5000, Math.round(delay * 1.5));
          continue; // try again
        }

        // Terminal failure states -> stop polling
        if (
          status === "failed" ||
          status === "expired" ||
          status === "cancelled" ||
          status === "canceled"
        ) {
          showErrorSnackbar("Payment failed or expired.");
          return response;
        }

        // Unknown status: log and retry conservatively
        console.warn("Unknown payment status:", status);
      } catch (error) {
        console.error(
          "Error fetching payment details (attempt",
          attempt + 1,
          "):",
          error
        );
        // fall through to retry
      }

      attempt += 1;
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (delay < 5000) delay = Math.min(5000, Math.round(delay * 1.5));
    }

    showErrorSnackbar(
      "Still waiting for payment confirmation. Please check later."
    );
    setNowPayOpen(false);

    return null;
  };

  return (
    <>
      <StripeModal
        open={stripeOpen}
        onClose={stripeClose}
        selecteNewPackage={selecteNewPackage}
      />
      <NowPaymentModal
        open={nowPayOpen}
        paymentUrl={paymentUrl}
        paymentInfo={paymentInfo}
        onClose={() => {
          setNowPayOpen(false);
        }}
        selecteNewPackage={selecteNewPackage}
      />
      <Dialog
        open={open}
        onClose={() => {
          onClose();
        }}
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
        {loading && <Loader loading={loading} />}
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
            Complete Purchase
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => {
              closeModal(false);
            }}
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
            {/* Bonus Cash Section */}
            <Grid item xs={12}>
        
              <div className="purchase_main">
                <div className="purchase_left">
                  <Typography
                    className="small_p"
                    sx={{
                      color: theme.palette.custom.l_gray,
                    }}
                    variant="h6"
                  >
                    Order Summary
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      color: theme.palette.custom.l_gray,
                    }}
                  >
                    {bonus_amount}
                  </Typography>
                </div>
                <div className="purchase_right">
                  <Typography
                    variant="h3"
                    sx={{
                      color: theme.palette.custom.white,
                    }}
                  >
                    <span
                      sx={{
                        color: theme.palette.custom.l_gray,
                      }}
                    >
                      Total
                    </span>{" "}
                    ${purchase_price}
                  </Typography>
                </div>
              </div>
              <hr className="devided_hr" />
              {/* pay with crypto now payment code  */}

              <Typography
                className="purchase_card"
                sx={{
                  backgroundColor: theme.palette.custom.lgray,
                }}
              >
                <Typography
                  className="purchase_header"
                  sx={{
                    backgroundColor: theme.palette.custom.dgray,
                    color: theme.palette.text.primary,
                  }}
                >
                  Crypto Payments
                </Typography>

                <Typography
                  // className="purchase_pay"
                  sx={{
                    backgroundColor: theme.palette.custom.gray3,
                    color: theme.palette.text.primary,
                  }}
                >
                  <Autocomplete
                    options={cryptoCurrency}
                    value={
                      cryptoCurrency.find((o) => o.value === selectedCrypto) ||
                      null
                    }
                    onChange={(_, option) =>
                      setSelectedCrypto(option?.value || "")
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) =>
                      option?.name ? `${option.name} (${option.symbol})` : ""
                    }
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Avatar
                            src={option.icon_svg}
                            alt={option.symbol}
                            sx={{ width: 24, height: 24 }}
                            imgProps={{ loading: "lazy" }}
                          />
                          <Typography variant="body2">
                            {option.name} ({option.symbol})
                          </Typography>
                        </Box>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Currency"
                        size="small"
                        sx={{
                          mt: 1,
                          "& .MuiInputBase-root": {
                            backgroundColor: theme.palette.background.default,
                          },
                        }}
                      />
                    )}
                    clearOnBlur
                    autoHighlight
                    disableClearable={false}
                  />
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    sx={{
                      background: theme.palette.custom.red,
                      color: theme.palette.custom.white,
                      px: 2,
                      mt: 2,
                      mb: 2,
                    }}
                    onClick={() => {
                      paywithCrypto();
                    }}
                  >
                    Pay Now
                  </Button>
                </Box>
              </Typography>

              {/* pay with skrill */}
              {/* {skrillShow && ( */}
              <Typography
                className="purchase_card"
                sx={{
                  backgroundColor: theme.palette.custom.lgray,
                  marginTop: 2,
                }}
              >
                <Typography
                  className="purchase_header"
                  sx={{
                    backgroundColor: theme.palette.custom.dgray,
                    color: theme.palette.text.primary,
                  }}
                >
                  Banking
                </Typography>

                <Typography
                  className="purchase_pay"
                  sx={{
                    backgroundColor: theme.palette.custom.gray3,
                    color: theme.palette.text.primary,
                  }}
                >
                  <div className="flex_img">
                    <img src={skrill} alt="skrill" style={{ width: "50px" }} />
                  </div>
                  <PaymentButton
                    item={selecteNewPackage}
                    GetUserById={GetUserById}
                    getCoinPackageList={getCoinPackageList}
                    showPayNow={true}
                    closeModal={closeModal}
                  />
                </Typography>
              </Typography>
              {/* // )} */}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentModal;
