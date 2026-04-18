import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { addData, getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import moment from "moment";
// import moment from "moment";
import { CoPresentOutlined } from "@mui/icons-material";
import CustomDatePicker from "../Customdatepicker";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";

const GameHistory = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [gamelist, setGameList] = useState([]);
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();

  useEffect(() => {
    getGameHistory();
  }, []);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleSearch = () => {
    getGameHistory();
  };

  const getGameHistory = async () => {
    // let url = `${endPoints.apiBaseUrl}${endPoints.api.GAME_HISTORY}`;
    // let url = `${endPoints.api.GAME_HISTORY}/${loginData?.idUser}`;
    const url = `${endPoints.api.GAME_HISTORY}/${loginData?.idUser}`;
    dispatch(setLoading(true));
    let data = {
      fromdate: fromDate,
      todate: toDate,
      userId: loginData?.idUser,
    };
    try {
      dispatch(setLoading(true));

      let response = await getAllData(url);

      if (response?.status === "success") {
        setGameList(response?.data ?? []);
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

  const today = new Date();

  const disableToDate = (date) => {
    if (fromDate) {
      const fromDateObj = moment(fromDate).format("YYYY-MM-DD");
      const currentDateObj = moment(date).format("YYYY-MM-DD");
      return currentDateObj < fromDateObj;
    }
    return false;
  };

  return (
    <>
      <Helmet>
        <title>Game History - Spinsaga Casino</title>
        <meta name="description" content="Review your game history and track your winnings on Spinsaga." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section
        className="inner_space table_design"
        style={{ paddingLeft: isMobile ? "20px" : "" }}
      >
        <Grid container spacing={3}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ marginTop: "30px" }}
          >
            {t("gameHistory.gameHistory")}
          </Typography>

          <Grid
            item
            xs={12}
            sm={6}
            md={10}
            container
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
          >
            {/* <Grid item>
            <div className="from_flex">
              <Typography variant="h4" component="h4">
                From:
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
                To:
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
              disabled={fromDate&&toDate?false:true}
              onClick={handleSearch}
              sx={{
                backgroundColor: theme.palette.custom.red_white,
                color: theme.palette.custom.white_red,
              }}
            >
              Search
            </Button>
          </Grid>
          */}
          </Grid>

          <TableContainer
            component={Paper}
            sx={{ maxHeight: 500 }}
            className="table_custom"
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("gameHistory.date")}</TableCell>
                  <TableCell>{t("gameHistory.gameName")}</TableCell>
                  <TableCell>{t("gameHistory.coinType")}</TableCell>
                  <TableCell>{t("gameHistory.betAmount")}</TableCell>
                  <TableCell>{t("gameHistory.winAmount")}</TableCell>

                  <TableCell>{t("gameHistory.balance")}</TableCell>
                  {/* <TableCell>Transaction ID</TableCell> */}
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
                        <TableCell>{row?.gameName}</TableCell>
                        <TableCell>
                          {row.playingWithCoin == "1" ? t("gameHistory.gold") : t("gameHistory.saga")}
                        </TableCell>
                        <TableCell>
                          <b> {row.betamount.toFixed(2)}</b>
                        </TableCell>
                        <TableCell>
                          <b> {row.winamount.toFixed(2)}</b>
                        </TableCell>
                        <TableCell> {parseFloat(row.balance || 0).toFixed(2)}</TableCell>
                        {/* <TableCell>{row?.txid}</TableCell> */}
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
                {t("gameHistory.noGamesPlayed")}
              </Typography>
            </Button>
          )}
        </Grid>
      </section>
    </>
  );
};

export default GameHistory;
