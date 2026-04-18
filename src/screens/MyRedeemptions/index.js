import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { addData, getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import moment from "moment";
import CustomDatePicker from "../Customdatepicker";
import { isMobile } from "react-device-detect";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { Helmet } from "react-helmet";

const MyRedeemptions = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [gamelist, setGameList] = useState([]);
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();
  const [cashList, setCashList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const[cryptoList, setCryptoList] = useState([]);
  const [value, setValue] = React.useState("three");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getRedeemption();
    getCashTransaction();
    getCardTransaction();
    getCryptoTransaction();
  }, []);

  const handleSearch = () => {
    getRedeemption();
  };

  const getRedeemption = async () => {
    let url = `${endPoints.api.GIFT_TRANSACTION}`;
    dispatch(setLoading(true));
    let data = {
      fromdate: fromDate,
      todate: toDate,
      user_id: loginData?.idUser,
    };
    try {
      dispatch(setLoading(true));
      let response = await addData(url, data);
      if (response.data.status == "success") {
        setGameList(response?.data?.data ?? "");
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getCashTransaction = async () => {
    let url = `${endPoints.api.GIFT_CASH_TRANSACTION}${loginData?.idUser}/1/1000`;
    dispatch(setLoading(true));

    try {
      dispatch(setLoading(true));
      let response = await getAllData(url);

      if (response?.status === "success") {
        setCashList(response?.data ?? []);
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getCardTransaction = async () => {
    let url = `${endPoints.api.GIFT_CARD_TRANSACTION}${loginData?.idUser}/1/1000`;
    dispatch(setLoading(true));

    try {
      dispatch(setLoading(true));
      let response = await getAllData(url);

      if (response?.status === "success") {
        setCardList(response?.data ?? []);
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

    const getCryptoTransaction = async () => {
    let url = `${endPoints.api.CRYPTO_TRANSACTION_BY_USERID}${loginData?.idUser}/1/1000`;
    dispatch(setLoading(true));

    try {
      dispatch(setLoading(true));
      let response = await getAllData(url);

      if (response?.status === "success") {
        setCryptoList(response?.data ?? []);
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const cancelCashTrans = async (row) => {
    let url = `${endPoints.api.CANCEL_CASH_TRANSACTION}`;
    const data = {
      id_transaction: row?.id_transaction,

      id_user: loginData?.idUser,
    };
    dispatch(setLoading(true));
    try {
      let response = await addData(url, data);
      if (response?.data?.status == "success") {
        dispatch(setLoading(false));
        showSuccessSnackbar(response?.data?.message);
        getCryptoTransaction();
        GetUserById();
      } else {
        showErrorSnackbar(response?.data?.message);
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
      showErrorSnackbar(
        "Issue connecting to the server (error code 15). Please contact support for further assistance."
      );
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const today = new Date();

  const disableToDate = (date) => {
    if (fromDate) {
      const fromDateObj = moment(fromDate).format("YYYY-MM-DD");
      const currentDateObj = moment(date).format("YYYY-MM-DD");
      return currentDateObj < fromDateObj;
    }
    return false;
  };

  const cancelRedemption = async (alldata) => {
    let url = `${endPoints.api.CANCEL_REDEEMPTION}`;
    const data = {
      id: alldata?.id,
      gift_id: alldata?.gift_id,
      user_id: loginData?.idUser,
      status: "3",
    };
    dispatch(setLoading(true));
    try {
      let response = await addData(url, data);
      if (response?.data?.status == "success") {
        dispatch(setLoading(false));
        showSuccessSnackbar(response?.data?.message);
        getRedeemption();
        GetUserById();
      } else {
        showErrorSnackbar(response?.data?.message);
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
      showErrorSnackbar(
        "Issue connecting to the server (error code 15). Please contact support for further assistance."
      );
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const GetUserById = async () => {
    try {
      if (loginData?.idUser) {
        const url = `${endPoints.api.GET_BY_USERID}/${loginData?.idUser}`;
        const response = await getAllData(url);
        dispatch(setLoginData({ user: response?.data, isAuthenticated: true }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Redemptions - Spinsaga Casino</title>
        <meta name="description" content="Track your redemption history and claim more rewards." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section
        className="inner_space table_design"
        style={{ paddingLeft: isMobile ? "20px" : "" }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          // sx={{ marginTop: "30px" }}
        >
          {t("redemptions.myRedemptions")}
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          {/* <Tab value="one" label="Gift Card" />
          <Tab value="two" label="Cash" /> */}
          <Tab value="three" label={t("redemptions.cryptoRedeem")} />
        </Tabs>

        <Box mt={2}>

          {/* {value === "one" && (
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={6}
                md={12}
                container
                alignItems="center"
                justifyContent="flex-end"
                spacing={2}
              >
                <Grid item>
                  <div className="from_flex">
                    <Typography variant="h4" component="h4">
                      {t("redemptions.from")}
                    </Typography>
                    <CustomDatePicker
                      value={fromDate}
                      onChange={(newDate) => setFromDate(newDate)}
                      maxDate={toDate ? new Date(toDate) : today}
                    />
                  </div>
                </Grid>

                <Grid item>
                  <div className="from_flex">
                    <Typography variant="h4" component="h4">
                      {t("redemptions.to")}
                    </Typography>
                    <CustomDatePicker
                      value={toDate}
                      onChange={(newDate) => setToDate(newDate)}
                      minDate={fromDate ? new Date(fromDate) : null}
                      maxDate={today}
                      shouldDisableDate={disableToDate}
                    />
                  </div>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="success"
                    disabled={fromDate && toDate ? false : true}
                    onClick={handleSearch}
                    sx={{
                      backgroundColor: theme.palette.custom.red_white,
                      color: theme.palette.custom.white_red,
                    }}
                  >
                    {t("redemptions.search")}
                  </Button>
                </Grid>
              </Grid>

              <TableContainer
                component={Paper}
                sx={{ maxHeight: 500 }}
                className="table_custom"
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("redemptions.dateRequested")}</TableCell>
                      <TableCell>{t("redemptions.amount")}</TableCell>
                      <TableCell>{t("redemptions.method")}</TableCell>
                      <TableCell>{t("redemptions.status")}</TableCell>
                      <TableCell>{t("redemptions.id")}</TableCell>
                      <TableCell>{t("redemptions.action")}</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {gamelist.length > 0 &&
                      gamelist.map((row) => {
                        return (
                          <TableRow key={row?.id}>
                            <TableCell>
                              <div>
                                {moment
                                  .parseZone(row?.created_on)
                                  .format("MMM DD, YYYY")}
                              </div>
                              <div>
                                {moment
                                  .parseZone(row?.created_on)
                                  .format("HH:mm:ss a")}
                              </div>
                            </TableCell>
                            <TableCell>{row?.package_price}</TableCell>
                            <TableCell>{t("redemptions.giftCard")}</TableCell>
                            <TableCell>
                              {row?.status == "1"
                                ? t("redemptions.pending")
                                : row?.status == "2"
                                ? t("redemptions.delivered")
                                : row?.status == "3"
                                ? t("redemptions.canceled")
                                : ""}
                            </TableCell>
                            <TableCell>{row?.transaction_id}</TableCell>
                            <TableCell>
                              {row?.status == "1" ? (
                                <Button
                                  variant="contained"
                                  sx={{
                                    backgroundColor:
                                      theme.palette.custom.red_white,
                                    color: theme.palette.custom.white_red,
                                    textTransform: "capitalize",
                                  }}
                                  onClick={() => {
                                    cancelRedemption(row);
                                  }}
                                >
                                  {t("redemptions.cancel")}
                                </Button>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {gamelist.length == 0 && (
                <Button
                  sx={{
                    backgroundColor: theme.palette.custom.gray_green,
                    color: theme.palette.custom.white_green,
                    marginTop: "10px",
                    width: "100%",
                    height: 60,
                  }}
                >
                  <Typography style={{ textTransform: "none" }}>
                    {t("redemptions.noRedemptions")}
                  </Typography>
                </Button>
              )}
            </Grid>
          )}
          {value === "two" && (
            <Grid container spacing={3}>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 500 }}
                className="table_custom"
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("redemptions.dateRequested")}</TableCell>
                      <TableCell>{t("redemptions.amount")}</TableCell>
                      <TableCell>{t("redemptions.method")}</TableCell>
                      <TableCell>{t("redemptions.status")}</TableCell>
                      <TableCell>{t("redemptions.id")}</TableCell>
                      <TableCell>{t("redemptions.action")}</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {cashList.length > 0 &&
                      cashList.map((row) => {
                        return (
                          <TableRow key={row?.id}>
                            <TableCell>
                              <div>
                                {moment
                                  .parseZone(row?.insertion_time)
                                  .format("MMM DD, YYYY")}
                              </div>
                              <div>
                                {moment
                                  .parseZone(row?.insertion_time)
                                  .format("HH:mm:ss a")}
                              </div>
                            </TableCell>
                            <TableCell>${row?.amount}</TableCell>
                            <TableCell>{t("redemptions.cash")}</TableCell>
                            <TableCell>
                              {row?.status == "0"
                                ? t("redemptions.pending")
                                : row?.status == "1"
                                ? t("redemptions.approved")
                                : row?.status == "2"
                                ? t("redemptions.hold")
                                : row?.status == "3"
                                ? t("redemptions.canceled")
                                : ""}
                            </TableCell>
                            <TableCell>{row?.external_id}</TableCell>
                            <TableCell>
                              {row?.status == "0" ? (
                                <Button
                                  variant="contained"
                                  sx={{
                                    backgroundColor:
                                      theme.palette.custom.red_white,
                                    color: theme.palette.custom.white_red,
                                    textTransform: "capitalize",
                                  }}
                                  onClick={() => {
                                    cancelCashTrans(row);
                                  }}
                                >
                                  {t("redemptions.cancel")}
                                </Button>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {cashList.length == 0 && (
                <Button
                  sx={{
                    backgroundColor: theme.palette.custom.gray_green,
                    color: theme.palette.custom.white_green,
                    marginTop: "10px",
                    width: "100%",
                    height: 60,
                  }}
                >
                  <Typography style={{ textTransform: "none" }}>
                    {t("redemptions.noRedemptions")}
                  </Typography>
                </Button>
              )}
            </Grid>
          )} */}


          {value === "three" && (
            <Grid container spacing={3}>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 500 }}
                className="table_custom"
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("redemptions.dateRequested")}</TableCell>
                      <TableCell>{t("redemptions.amount")}</TableCell>
                      <TableCell>{t("redemptions.method")}</TableCell>
                      <TableCell>{t("redemptions.status")}</TableCell>
                      <TableCell>{t("redemptions.id")}</TableCell>
                      <TableCell>{t("redemptions.action")}</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {cryptoList.length > 0 &&
                      cryptoList.map((row) => {
                        return (
                          <TableRow key={row?.id}>
                            <TableCell>
                              <div>
                                {moment
                                  .parseZone(row?.insertion_time)
                                  .format("MMM DD, YYYY")}
                              </div>
                              <div>
                                {moment
                                  .parseZone(row?.insertion_time)
                                  .format("HH:mm:ss a")}
                              </div>
                            </TableCell>
                            <TableCell>${row?.amount}</TableCell>
                            <TableCell>{t("redemptions.crypto")}</TableCell>
                            <TableCell>
                              {row?.status == "0"
                                ? t("redemptions.pending")
                                : row?.status == "1"
                                ? t("redemptions.approved")
                                : row?.status == "2"
                                ? t("redemptions.hold")
                                : row?.status == "3"
                                ? t("redemptions.canceled")
                                : ""}
                            </TableCell>
                            <TableCell>{row?.external_id}</TableCell>
                            <TableCell>
                              {row?.status == "0" ? (
                                <Button
                                  variant="contained"
                                  sx={{
                                    backgroundColor:
                                      theme.palette.custom.red_white,
                                    color: theme.palette.custom.white_red,
                                    textTransform: "capitalize",
                                  }}
                                  onClick={() => {
                                    cancelCashTrans(row);
                                  }}
                                >
                                  {t("redemptions.cancel")}
                                </Button>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {cryptoList.length == 0 && (
                <Button
                  sx={{
                    backgroundColor: theme.palette.custom.gray_green,
                    color: theme.palette.custom.white_green,
                    marginTop: "10px",
                    width: "100%",
                    height: 60,
                  }}
                >
                  <Typography style={{ textTransform: "none" }}>
                    {t("redemptions.noRedemptions")}
                  </Typography>
                </Button>
              )}
            </Grid>
          )}

        </Box>
      </section>
    </>
  );
};

export default MyRedeemptions;
