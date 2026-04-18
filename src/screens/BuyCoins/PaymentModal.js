import {
  Alert,
  Avatar,
  Box,
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { endPoints, PaymentEndpoints } from "../../constant/Environment";
import { addBetData, getAllBetData, getAllData } from "../../Utility/API";
import { CurrencyList } from "./CurrencyList";
import "./infoStyle.css";
import NowPaymentModal from "./NowPaymentModal";
import PaymentButton from "./PaymentButton";
import StripeModal from "./StripeModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setFreeSpinGames } from "../../redux/Reducers/GlobalReducer/globalSlice";

const PaymentModal = (props) => {
  const {
    open,
    onClose,
    selecteNewPackage,
    getCoinPackageList,
    GetUserById,
    paymentMode,
  } = props;
  const { t } = useTranslation();
  const [stripeOpen, setStripeOpen] = useState(false);
  const [nowPayOpen, setNowPayOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isCrypto, setIsCrypto] = useState(false);

  const [cryptoCurrency, setCryptoCurrency] = useState(CurrencyList);
  const [copied, setCopied] = useState(false);

  const [selectedCrypto, setSelectedCrypto] = useState("");
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  // console.log("selecteNewPackage", selecteNewPackage);
  const { purchase_price,multplier,freeSpin, gameName, package_name } = selecteNewPackage;
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const isPollingRef = useRef(false);

  // console.log("paymentMode", freeSpin, gameName, multplier);

  const stripeClose = () => {
    setStripeOpen(false);
  };
  const closeModal = (flag) => {
    console.log("flag----", flag);
    //https://nowpayments.io/payment/?iid=6295514203
    isPollingRef.current = false; // Stop polling when modal closes
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

  const paywithCrypto = async (type) => {
    // setIsCrypto(true);
    console.log("selectedCrypto", type);

    // if (selectedCrypto === "") {
    //   showErrorSnackbar("Please select currency");
    //   return;
    // }

    try {
      setLoading(true);
      let req = {
        id_user: loginData?.idUser,
        price_currency: "usd",
        pay_currency: type.value,
        packageId: selecteNewPackage.id,
      };

      const response = await addBetData(
        `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.CRYPTO_PAYMENT}`,
        req
      );
      setLoading(false);

      console.log("Response from crypto payment:", response);
      if (response.data.status === "success") {
        setSelectedCrypto(type);
        // closeModal(true);  donot open aniother modal
        isPollingRef.current = true; // Start polling
        getPaymentDetailsByPaymentId(response?.data?.data?.payment_id || "");
      } else {
        showErrorSnackbar(
          response.data.message || t("paymentModal.paymentFailed")
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during payment:", error);
      showErrorSnackbar(t("paymentModal.paymentFailed"));
    }
  };

    const fetchFreeSpinGames = async () => {
            try {
              const url = `${endPoints.api.RECENT_FREE_SPIN_GAMES}/${loginData.idUser}`;
              const response = await getAllData(url);
              
              if (response?.status === "success" && response?.data) {
                dispatch(setFreeSpinGames(response.data));
              }
            } catch (error) {
              console.error("Error fetching free spin games:", error);
              dispatch(setFreeSpinGames([]));
            }
    };

  const getPaymentDetailsByPaymentId = async (
    paymentId,
    { maxAttempts = 60, initialDelay = 5000 } = {}
  ) => {
    let attempt = 0;
    let delay = initialDelay; // ms, exponential backoff up to 5s

    while (attempt < maxAttempts && isPollingRef.current) {
      try {
        const url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.GET_PAYMENT_DETAILS}/${paymentId}`;
        const response = await getAllBetData(url);
        console.log("[poll] payment status resp:", response);

        // Check if polling should stop
        if (!isPollingRef.current) {
          // console.log("Polling stopped - modal closed");
          return null;
        }

        // Normalize status from various APIs
        const status = response?.status;
        // Success / terminal success
        if (status == "finished" || status == "partially_paid") {
          isPollingRef.current = false; // Stop polling on success
          showSuccessSnackbar(status == "finished"?t("paymentModal.paymentConfirmed"):t("paymentModal.paymentPartial"));
          // Refresh balances and package list if handlers are provided
          try {
            setNowPayOpen(false);
            onClose();
            fetchFreeSpinGames();
            GetUserById && (await GetUserById());
            getCoinPackageList && (await getCoinPackageList());
          } catch (e) {
            console.warn("Post-payment refresh error:", e);
          }
          return response;
        }

        // Transient/waiting states -> keep polling (DO NOT show error/snackbar)
        else if (status === "waiting") {
          setPaymentInfo(response);
          attempt += 1;
          await new Promise((resolve) => setTimeout(resolve, delay));
          if (delay < 5000) delay = Math.min(5000, Math.round(delay * 1.5));
          continue; // try again
        }

        // Terminal failure states -> stop polling
      else if (
          status === "failed" ||
          status === "expired" ||
          status === "cancelled" ||
          status === "canceled"
        ) {
          isPollingRef.current = false; // Stop polling on failure
          showErrorSnackbar(t("paymentModal.paymentFailedOrExpired"));
          setNowPayOpen(false);
           onClose();
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

    // Only show error if polling wasn't stopped manually
    if (isPollingRef.current) {
      showErrorSnackbar(
        t("paymentModal.waitingForConfirmation")
      );
    }
    isPollingRef.current = false; // Ensure polling is stopped
    setNowPayOpen(false);
     onClose();

    return null;
  };
  const [currencySearch, setCurrencySearch] = useState("");
  const filteredCurrencies = React.useMemo(() => {
    const q = currencySearch.trim().toLowerCase();
    if (!q) return CurrencyList;
    return CurrencyList.filter(
      (c) =>
        (c.name || "").toLowerCase().includes(q) ||
        (c.symbol || "").toLowerCase().includes(q)
    );
  }, [CurrencyList, currencySearch]);

  // Derive coin details from selection
  const handleCopyAddress = async () => {
    const addr = paymentInfo?.data?.pay_address || "";
    if (!addr) return;
    try {
      await navigator.clipboard.writeText(addr);
      setCopied(true);
    } catch (e) {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = addr;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
    }
  };
  ///
  // console.log('paymentInfo?.data?.pay_address',paymentInfo)
  // console.log("selectedCrypto", `${`https://api.qrserver.com/v1/create-qr-code/?data=${selectedCrypto.name.toLowerCase()}:${paymentInfo?.data?.pay_address}&size=150x150`}`);
  return (
    <>
      <StripeModal
        open={stripeOpen}
        onClose={stripeClose}
        selecteNewPackage={selecteNewPackage}
      />
      {/* hide this code for now payment
       <NowPaymentModal
        open={nowPayOpen}
        paymentUrl={paymentUrl}
        paymentInfo={paymentInfo}
        onClose={() => {
          setNowPayOpen(false);
        }}
        selecteNewPackage={selecteNewPackage}
      /> */}
      <Dialog
        open={open}
        onClose={() => {
          onClose();
        }}
        fullWidth
        maxWidth="sm"
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
          <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            {t("paymentModal.completePurchase")}
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
          {selectedCrypto ? (
            <Paper elevation={0}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <IconButton
                    aria-label="close"
                    onClick={() => {
                      setSelectedCrypto("");
                      setPaymentInfo({});
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {t("paymentModal.payWithCrypto")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3} alignItems="flex-start">
                <Grid item xs={12}>
                  <Alert severity="info" variant="outlined">
                    {paymentInfo?.message ? (
                      <>
                        {t("paymentModal.paymentStatus", { status: paymentInfo?.status })}
                      </>
                    ) : (
                      t("paymentModal.dontCloseModal")
                    )}

                    {paymentInfo?.data?.network && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {t("paymentModal.network")} : {paymentInfo?.data?.network}
                      </Typography>
                    )}

                    {paymentInfo?.data?.estimatedAmount ? (
                      <>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {t("paymentModal.packageAmount")} :&nbsp;
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ fontWeight: 700 }}
                          >
                            ${purchase_price}
                          </Typography>
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {t("paymentModal.payCrypto")} :&nbsp;
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ fontWeight: 700 }}
                          >
                            {paymentInfo?.data?.estimatedAmount} (
                            {selectedCrypto?.symbol})
                          </Typography>
                        </Typography>
                      </>
                    ) : null}

                    <Typography variant="body2" sx={{ mt: 1 }}>
                       {t("paymentModal.processingTime")}
                    </Typography>
                  </Alert>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Box component="ul" sx={{ mt: 2, pl: 3 }}>
                    <li>
                      <Typography variant="body1">
                        {t("paymentModal.correctAddressWarning")}
                      </Typography>
                    </li>
                    {/* <li>
                      <Typography variant="body1">
                        Values sent below the minimum deposit value will be
                        lost.
                      </Typography>
                    </li> */}
                  </Box>
                  <TextField
                    label={t("paymentModal.paymentAddress")}
                    value={paymentInfo?.data?.pay_address || ""}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t("paymentModal.copyAddress")}>
                            <IconButton
                              aria-label={t("paymentModal.copyAddress")}
                              onClick={handleCopyAddress}
                              edge="end"
                            >
                              <ContentCopyIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontFamily:
                          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block" }}
                  >
                    {t("paymentModal.clickToCopy")}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "flex-start", md: "center" },
                    }}
                  >
                    <Box
                      component="img"
                      src={`https://api.qrserver.com/v1/create-qr-code/?data=${selectedCrypto?.name?.toLowerCase()}:${
                        paymentInfo?.data?.pay_address
                      }&size=150x150`}
                      alt="QR Code"
                      sx={{
                        width: 220,
                        height: 220,
                        borderRadius: 1,
                        bgcolor: "background.default",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <Box
              sx={{
                p: 1,
                bgcolor: "background.default",
                color: "text.primary",
              }}
            >
                <Paper
                elevation={0}
                sx={{
                  mt: 2,
                  p: 2,
                  mb: 2,
                  borderRadius: 3,
                }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={7}>
                    <Stack
                      direction="row"
                      spacing={{ xs: 1.5, sm: 2 }}
                      alignItems={{ xs: "flex-start", sm: "center" }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: { xs: 0.5, sm: 1 },
                            fontWeight: "bold",
                            fontSize: { xs: 16, sm: 20 },
                          }}
                        >
                          {t("paymentModal.payWithCrypto")}
                        </Typography>

                        <Typography
                          variant="h5"
                          sx={{
                            color: (t) => t.palette.custom.l_gray,
                            fontSize: { xs: 18, sm: 24 },
                          }}
                        >
                          {package_name}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <Stack
                      direction="row"
                      justifyContent={{ xs: "space-between", sm: "flex-end" }}
                      alignItems="center"
                      spacing={1.5}
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    >
                      <Chip
                        label={t("paymentModal.total")}
                        size="small"
                        variant="outlined"
                        color="secondary"
                      />

                      <Typography
                        variant="h5"
                        sx={{
                          color: (t) => t.palette.custom.white,
                          fontSize: { xs: 18, sm: 24 },
                        }}
                      >
                        ${purchase_price}
                      </Typography>
                    </Stack>
                     <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      justifyContent={{ xs: "stretch", sm: "flex-end" }}
                      sx={{ mt: 2 }}
                    >
                     
                      <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                                                <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ flexWrap: "wrap" }}
                        >
                          <Typography variant="overline" color="text.secondary">
                            {t("paymentModal.orderSummary")}
                          </Typography>
                          <Tooltip title={t("paymentModal.orderSummaryTooltip")}>
                            <InfoOutlinedIcon fontSize="small" />
                          </Tooltip>
                        </Stack>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

               {freeSpin && (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mb: 2,mt:1 }}
          >
            <strong>{t("paymentModal.freeSpinUnlocked")}</strong> {t("paymentModal.freeSpinUnlockedText", { gameName })}
          </Typography>
          )}

                <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: theme.palette.text.secondary,
              mt: 1,
              mb: 2,
            }}
          >
            { " "} {multplier == 2.0 && t("paymentModal.playthrough2x")}

            {multplier == 3.0 && t("paymentModal.playthrough3x")}

            {multplier == 4.0 && t("paymentModal.playthrough4x")}

            {multplier == 5.0 && t("paymentModal.playthrough5x")}   
            
            {/* // : ""} */}
          </Typography>
             
              {/* <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                Pay With Crypto
              </Typography> */}

              {/* Search for currency */}
              <TextField
                fullWidth
                size="small"
                placeholder={t("paymentModal.searchCurrency")}
                variant="outlined"
                value={currencySearch}
                onChange={(e) => setCurrencySearch(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <Grid container spacing={2}>
                {filteredCurrencies.map((coin, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Card
                      onClick={() => {
                        //setSelectedCrypto(coin.value)
                        paywithCrypto(coin);
                      }}
                      sx={{
                        p: 1.5,
                        bgcolor: (t) =>
                          t.palette.mode === "dark"
                            ? t.palette.background.paper
                            : t.palette.grey[900],
                        borderRadius: 2,
                        cursor: "pointer",
                        transition: "transform .2s ease, box-shadow .2s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        {/* Left square icon panel */}
                        <Box
                          sx={{
                            width: 72,
                            height: 72,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: (t) =>
                              t.palette.mode === "dark"
                                ? t.palette.grey[900]
                                : t.palette.grey[200],
                            flexShrink: 0,
                          }}
                        >
                          <Avatar
                            // src="https://cryptologos.cc/logos/algorand-algo-logo.png"
                            src={coin.icon || coin.icon_png}
                            alt={coin.symbol}
                            sx={{ width: 48, height: 48 }}
                          />
                        </Box>

                        {/* Right content */}
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="h6" noWrap>
                            {coin.name} ({coin.symbol})
                          </Typography>
                          {/* <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                            {coin.balance ?? "0.00000000"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Min. Amount:{" "}
                            <Typography
                              component="span"
                              variant="body2"
                              fontWeight={700}
                            >
                              {coin.min ?? "0.001"}
                            </Typography>
                          </Typography> */}
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>         
                ))}
                {filteredCurrencies.length === 0 && (
                  <Box sx={{ width: "100%", textAlign: "center", py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      {t("paymentModal.noCurrenciesMatch")} "{currencySearch}".
                    </Typography>
                  </Box>
                )}
              </Grid>
               <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      justifyContent={{ xs: "stretch", sm: "flex-end" }}
                      sx={{ mt: 2 }}
                    >
                     
                      <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                        <PaymentButton
                          item={selecteNewPackage}
                          GetUserById={GetUserById}
                          getCoinPackageList={getCoinPackageList}
                          showPayNow={true}
                          closeModal={closeModal}
                          style={
                            isXs
                              ? { width: "100%", padding: "5px 5px"}
                              : { padding: "3px 6px",textTransform:"lowercase" }
                          }
                        />
                      </Box>
                    </Stack>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentModal;
