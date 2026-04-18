import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography, Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import moment from "moment";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";

const UserTransaction = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [gamelist, setGameList] = useState([]);
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();

  useEffect(() => {
    getMyTrans();
  }, []);

  const getMyTrans = async () => {
    const url = `${endPoints.api.USER_TRANSACTION}/${loginData?.idUser}/1/1000`;
    dispatch(setLoading(true));
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

  return (
    <>
      <Helmet>
        <title>Transaction History - Spinsaga Casino</title>
        <meta name="description" content="View all your deposits, redemptions, and reward transactions." />
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
            {t("userTransaction.myTransaction")}
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
          ></Grid>

          <TableContainer
            component={Paper}
            sx={{ maxHeight: 500 }}
            className="table_custom"
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("userTransaction.date")}</TableCell>
                  <TableCell>{t("userTransaction.description")}</TableCell>
                  {/* <TableCell>Coin Type</TableCell> */}
                  <TableCell>{t("userTransaction.sagaCoin")}</TableCell>
                  <TableCell>{t("userTransaction.method")}</TableCell>

                  {/* <TableCell>Balance</TableCell> */}
                  <TableCell>{t("userTransaction.status")}</TableCell>
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
                              .parseZone(row?.insertion_time)
                              .format("MMM DD, YYYY")}
                          </div>
                        </TableCell>
                        <TableCell>{row?.description}</TableCell>
                        {/* <TableCell>
                        {row.playingWithCoin == "1" ? "Gold" : "Saga"}
                      </TableCell> */}
                        {/* <TableCell>
                        <b> {row.betamount}</b>
                      </TableCell> */}
                        <TableCell>
                          <b> {row.amount}</b>
                        </TableCell>
                        <TableCell> {row.operation}</TableCell>
                        <TableCell>{row?.transaction_status}</TableCell>
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
                {t("userTransaction.noTransaction")}
              </Typography>
            </Button>
          )}
        </Grid>
      </section>
    </>
  );
};

export default UserTransaction;
