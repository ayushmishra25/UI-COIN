import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { BsStarFill } from "react-icons/bs";
import bronze_coin from "../../images/loyalty/bronze.png";
import gold_coin from "../../images/loyalty/gold.png";
import saphire_coin from "../../images/loyalty/saphire.png";
import ruby_coin from "../../images/loyalty/ruby.png";
import daimond_coin from "../../images/loyalty/daimond.png";
import black_coin from "../../images/loyalty/black-daimond.png";
import emerald_coin from "../../images/loyalty/emerald.png";
import crown_coin from "../../images/loyalty/crown.png";
import tick from "../../images/loyalty/tick.png";
import cross from "../../images/loyalty/cross.png";
import { endPoints } from "../../constant/Environment";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../Utility/API";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import SweepStakeTypography from "../../component/SweepStakeTypography";
import { isMobile } from "react-device-detect";

const Loyalty = () => {
  const theme = useTheme();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [data, setData] = useState("");

  const LoyaltyData = async () => {
    let url = `${endPoints.api.LOYALTY_DATA}`;
    dispatch(setLoading(true));
    let data = {
      id_user: loginData?.idUser,
    };
    try {
      dispatch(setLoading(true));
      let response = await addData(url, data);
      if (response.data.status == "success") {
        setData(response?.data?.data ?? "");
      } else {
        console.log(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    LoyaltyData();
  }, []);

  const featuresData = [
    {
      label: "Daily Prize Drops",
      values: [true, true, true, true, true, true, true, true],
    },
    {
      label: "24/7 Customer Support",
      values: [true, true, true, true, true, true, true, true],
    },
    {
      label: "Access to Games",
      values: [true, true, true, true, true, true, true, true],
    },
    {
      label: "Race Rewards",
      values: [true, false, true, true, true, true, true, true],
    },
    {
      label: "Daily Login Reward",
      values: [
        {  gcValue: "100" }, 
        {  gcValue: "200" }, 
        {  gcValue: "300" }, 
        {  gcValue: "400" }, 
        {  gcValue: "500" }, 
        {  gcValue: "600" }, 
        {  gcValue: "700" }, 
        {  gcValue: "800" }, 
      ],
    },
    {
      label: "Monthly Bonus",
      values: [true, true, true, true, true, true, true, true],
    },
    {
      label: "Community Chat",
      values: [false, false, true, true, true, true, true, true],
    },
    {
      label: "Chat Promotions",
      values: [false, false, true, true, true, true, true, true],
    },
    {
      label: "Priority Customer Support",
      values: [false, false, true, true, true, true, true, true],
    },
    {
      label: "24HRS Redemption Processing",
      values: [false, false, false, true, true, true, true, true],
    },
    {
      label: "Personal Account Hosts",
      values: [false, false, false, false, true, true, true, true],
    },
    {
      label: "VIP Support via WhatsApp",
      values: [false, false, false, false, false, true, true, true],
    },
    {
      label: "Daily Free Bonus Email Draw",
      values: [true, false, true, true, true, true, true, true],
    },
  ];

  const planData = [
    { src: bronze_coin, label: "BRONZE", color: "bronze" },
    { src: gold_coin, label: "GOLD", color: "gold" },
    { src: saphire_coin, label: "SAPPHIRE", color: "sapphire" },
    { src: emerald_coin, label: "EMERALD", color: "emerald" },
    { src: ruby_coin, label: "RUBY", color: "ruby" },
    { src: daimond_coin, label: "DIAMOND", color: "daimond" },
    { src: black_coin, label: "BLACK DIAMOND", color: "black_daimond" },
    { src: crown_coin, label: "CROWN JEWEL", color: "crown" },
  ];

  return (
    <>
      <Grid sx={{ py: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          style={{ color: theme.palette.custom.white_black }}
        >
          SpinSaga Loyalty Program: Become a VIP
        </Typography>

        <Typography
          variant="h6"
          style={{ color: theme.palette.custom.white_black }}
          gutterBottom
        >
          Current Level:{" "}
          <span style={{ color: theme.palette.custom.red_white }}>
            {data?.levelpackage}
          </span>
        </Typography>

        <Box
          my={5}
          mx={5}
          p={4}
          style={{ backgroundColor: theme.palette.custom.black_light }}
        >
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            Next Level:{" "}
            <span
              style={{ color: theme.palette.custom.yellow, fontWeight: "600" }}
            >
              {data?.nextlevelpackage}
            </span>
          </Typography>
          <Typography variant="body2">
            Collect 20 <BsStarFill style={{ color: theme.palette.custom.yellow }} />  to Level Up{" "}
            {/* <BsStarFill style={{ color: theme.palette.custom.yellow }} /> 
            more stars to level up! */}
          </Typography>
        </Box>

        <Box my={5} mx={5}>
          <Typography variant="body1">
          Stars earned in the last 30 Days:{" "}
            <BsStarFill style={{ color: theme.palette.custom.yellow }} />{" "}
            {data?.points}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
        How to Level Up?
        </Typography>

        <Typography variant="body1" paragraph>
          You begin at the <span style={{ color: theme.palette.custom.red_white }}>Bronze</span>{" "} Level and SPIN your way through the SAGA of stars. For every 50 SC spent on games, you earn a <BsStarFill style={{ color: theme.palette.custom.yellow }} />{" "}
          Spinning Winning. 24/7 🚀

        </Typography>

        <Box mt={4}>
          <Typography variant="body1">  
           Each <BsStarFill style={{ color: theme.palette.custom.yellow }} />{" "}  earned is valid for 30 days. 
          </Typography>
          <Typography variant="body1" mt={2}>
            There are 8 levels for you to conquer, where you get Daily Prize Drops, Monthly Bonuses, VIP Support and MUCH MORE!
          </Typography>
          <Typography variant="body1" mt={2}>
          The prizes keep getting better as you continue to Level Up! 
          </Typography>
          <Typography variant="body1" mt={2}>
          You don't believe us? Look at the chart below!
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Diamond system levels & features
        </Typography>
        <Typography variant="body2">
          Here's what great offers and upgrades await as you play your way
          through the galaxy of the SpinSaga Star System
        </Typography>

        <TableContainer
          className="featuretable"
          sx={{ marginTop: 5 }}
          component={Paper}
        >
          <Table>
            <TableHead
              classNmae="coin_list"
              style={{
                backgroundColor: theme.palette.custom.black_light,
              }}
            >
              <TableRow>
                <TableCell
                  style={{
                    borderBottom: `20px solid ${theme.palette.background.black1}`,
                  }}
                ></TableCell>
                {planData.map((plan, index) => (
                  <TableCell
                    style={{
                      borderBottom: `20px solid ${theme.palette.background.black1}`,
                    }}
                    align="center"
                    key={index}
                  >
                    <Grid item xs="3" md="2">
                      <img
                        src={plan.src}
                        height="60"
                        width="60"
                        alt={plan.label}
                      />
                      <Typography
                        variant="body1"
                        textAlign="center"
                        style={{ color: theme.palette.custom[plan.color] }}
                      >
                        {plan.label}
                      </Typography>
                    </Grid>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {featuresData.map((feature, index) => (
                <React.Fragment key={index}>
                  {/* Actual data row */}
                  <TableRow
                    style={{
                      backgroundColor: theme.palette.custom.black_light,
                      borderTop: "none",
                      borderBottom: "none",
                    }}
                  >
                    <TableCell
                      style={{
                        borderBottom: "none",
                      }}
                    >
                      <Typography variant="body1">{feature?.label}</Typography>
                    </TableCell>
                    {feature.values.map((value, i) => (
                      <TableCell
                        style={{
                          borderBottom: "none",
                        }}
                        align="center"
                        key={i}
                      >
                        {typeof value == "object" ? (
                          <>
                            {/* <Typography variant="subtitle2">
                              {value?.scValue} SC
                            </Typography> */}
                            <Typography variant="subtitle2">
                              {value?.gcValue} GC
                            </Typography>
                          </>
                        ) : (
                          <img src={value ? tick : cross} alt="check" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer row for gap (with red background) */}
                  <TableRow>
                    <TableCell
                      colSpan={planData.length + 1}
                      style={{
                        paddingTop: "15px",
                        backgroundColor: theme.palette.background.black1,
                        borderBottom: "none",
                      }}
                    />
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid
        container
        alignItems="center "
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        <SweepStakeTypography />
      </Grid>
    </>
  );
};

export default Loyalty;
