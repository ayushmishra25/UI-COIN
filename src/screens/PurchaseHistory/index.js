import React, { useEffect, useState } from "react";
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

import SweepStakeTypography from "../../component/SweepStakeTypography";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { Helmet } from "react-helmet";
const PurchaseHistory = () => {
  const theme = useTheme();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [coinHistory, setCoinHistory] = useState([]);

  const getCoinTransaction = async (list) => {
    let url = `${endPoints.api.COIN_TRANSACTION}/${loginData?.idUser}`;

    dispatch(setLoading(true));

    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        GetUserById();
        if (response?.status === "success") {
          if (response?.data?.length > 0) {
            console.log("coins", response.data);
            setCoinHistory(response.data);
          }
        } else {
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  useEffect(() => {
    getCoinTransaction();
  }, []);

  const GetUserById = async () => {
    try {
      if (loginData?.idUser) {
        const url = `${endPoints.api.GET_BY_USERID}/${loginData?.idUser}`;
        const response = await getAllData(url);
        dispatch(setLoginData({ user: response?.data, isAuthenticated: true }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Purchase History - Spinsaga Casino</title>
        <meta name="description" content="Track all your coin purchases and top-up transactions." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="inner_space table_design">
        <Grid
          container
          spacing={3}
          sx={{ paddingLeft: isMobile ? "20px" : "0px" }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ marginTop: "30px" }}
          >
            Coins Purchase History
          </Typography>
          <Typography variant="subtitle1">
            Track your purchases of Bonus Cash here. Bonus Cash enhance your
            gameplay experience, while Real Cash can be redeemed for exciting
            prizes. Keep Spinning, Keep Winning!
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
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.custom.lblack_light,
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.custom.lblack_light,
                    }}
                  >
                    Package Title
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.custom.lblack_light,
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.custom.lblack_light,
                    }}
                  >
                    BC Coins
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.custom.lblack_light,
                    }}
                  >
                    RC Coins
                  </TableCell>
                  
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.custom.lblack_light,
                    }}
                  >
                    Payment ID
                  </TableCell>
                       <TableCell
                    sx={{
                      backgroundColor: theme.palette.custom.lblack_light,
                    }}
                  >
                    Status 
                  </TableCell>
                  {/* <TableCell
                  sx={{
                    backgroundColor: theme.palette.custom.lblack_light,
                  }}
                >
                  Transaction ID
                </TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {coinHistory.length > 0 &&
                  coinHistory.map((item) => {
                    return (
                      <TableRow key={item?.id}>
                        <TableCell
                          sx={{
                            backgroundColor: theme.palette.custom.lblack_light,
                          }}
                        >
                          <Typography variant="body2">
                            {moment
                              .parseZone(item?.addeddate)
                              .format("MMM DD, YYYY")}
                          </Typography>
                          <Typography variant="caption">
                            {moment
                              .parseZone(item?.addeddate)
                              .format("HH:mm:ss a")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {item?.packagename}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            ${item?.amount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {item?.bonus_amount} GC
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {item?.package_amount} SC
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {item?.merchantRefNum}
                          </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="body2">
                          {item?.status}
                        </Typography>
                      </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {coinHistory.length == 0 && (
            <Button
              sx={{
                backgroundColor: theme.palette.custom.gray_green,
                color: theme.palette.custom.white_green,
                marginTop: "10px",
                width: "100%",
                height: 60,
              }}
            >
              No Transaction found.
            </Button>
          )}
        </Grid>

        <Grid container sx={{ mt: 3, justifyContent: "center" }}>
          <SweepStakeTypography />
        </Grid>
      </section>
    </>
  );
};

export default PurchaseHistory;
