import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Modal,
} from "@mui/material";

import { useTheme } from "@emotion/react";

import img5 from "../../images/coin1.webp";
import svg from "../../images/svg.svg";
import { endPoints, PaymentEndpoints } from "../../constant/Environment";
import { useSelector } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useDispatch } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { getAllData, addData, addBetData } from "../../Utility/API";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import SweepStakeTypography from "../../component/SweepStakeTypography";
import { useNavigate } from "react-router-dom";
import coinimg1 from "../../images/mainpackage.png";
import coinimg2 from "../../images/secondpackage.png";
import PaymentModal from "./PaymentModal";
import CoinBackImg from "../../images/coin-back.svg";
import CoinBigImg from "../../images/coin-big.svg";
import CoinSmallImg from "../../images/coin-small.svg";
import LeftImg from "../../images/tag-left.svg";
import RightImg from "../../images/tag-right.svg";

const BuyCoinsNew = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginData = useSelector((state) => state.auth.IsLoginData);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  const [mainItems, setMainItems] = useState([]);

  const [payModal, setPayModal] = useState(false);

  const getCoinPackageList = async (list) => {
    let url = `${endPoints.api.GET_PACKAGE}`;
    dispatch(setLoading(true));
    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.status === "success" && response?.data?.length > 0) {
          const excludePackageIds = response?.data[0]?.exclude_package || [];

          const filteredPackages = response?.data?.filter(
            (item) => !excludePackageIds.includes(item?.id)
          );

          setMainItems(filteredPackages);
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  const [selecteNewPackage, setSelectdNewPackage] = useState({});

  const handleOpen = (data) => {
    setSelectdNewPackage(data);
    // setOpen(true);
    setPayModal(true);
  };

  const GetUserById = async () => {
    try {
      const url = `${endPoints.api.GET_BY_USERID}/${loginData?.idUser}`;
      const response = await getAllData(url);
      dispatch(setLoginData({ user: response?.data, isAuthenticated: true }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoinPackageList();
  }, []);

  const payModalClose = () => {
    setPayModal(false);
  };

  return (
    <>
      <main className="inner-body inner_space">
        <PaymentModal
          open={payModal}
          onClose={payModalClose}
          selecteNewPackage={selecteNewPackage}
          // websiteEnv={websiteEnv}
          GetUserById={GetUserById}
          getCoinPackageList={getCoinPackageList}
        />

        <div className="icon_heading">
          <Typography sx={{ color: theme.palette.custom.white_gray }}>
            <span
              style={{
                marginRight: "10px",
              }}
            >
              <img src={coinimg1} />
            </span>{" "}
            Most Popular
          </Typography>
        </div>

        <Grid
          className="buy_row"
          container
          spacing={{ xs: 5, sm: 4, md: 2 }}
          style={{
            marginBottom: "40px",
          }}
        >
          <div className="button_scroll">
            <div className="c_scroll ">
              <div className="custom_row">
                {mainItems?.map((item, index) => {
                  if (item.isPopular == 1) {
                    return (
                      <main className="custom_col" key={item.id}>
                        <Card
                          className="c_card middle_card"
                          sx={{
                            background: theme.palette.custom.lgray,
                            borderColor: theme.palette.custom.redblue_border,
                          }}
                        >
                          {item.isFeature == 1 ? (
                            <Typography
                              className="offer-box"
                              //#03B349
                              sx={{
                                background: theme.palette.custom.greenbtn,
                                color: theme.palette.custom.white,
                              }}
                            >
                              Featured
                            </Typography>
                          ) : null}

                          <div className="card_label">
                            <p>
                              <span>Free</span>
                              <span>SC 25</span>
                            </p>
                            <img src={svg} alt="icon" />
                          </div>

                          <div className="buy_card1">
                            <div className="right_half">
                              <CardMedia
                                component="img"
                                height="100%"
                                image={img5}
                              />
                            </div>
                            <div className="left_half">
                              <Typography
                                className="f18 f-bold"
                                sx={{ color: theme.palette.custom.white_gray }}
                              >
                                {/* {item.package_amount} Real Cash */}
                                {item.bonus_amount} BC
                              </Typography>

                              <Button
                                className="best_btn"
                                size="small"
                                sx={{
                                  background: theme.palette.custom.red,
                                  color: theme.palette.custom.white,
                                }}
                                disabled={item?.isDisabled}
                                onClick={() => {
                                  handleOpen(item);
                                  // handleFeatureButton(item?.menu_sort_order);
                                }}
                              >
                                <span>BUY FOR</span> ${item.purchase_price}
                              </Button>
                            </div>
                          </div>
                          <Typography
                            className="bottom_middle"
                            size="small"
                            sx={{
                              background: theme.palette.custom.dark_d,
                              color: theme.palette.custom.white,
                            }}
                          >
                            {/* +{item.bonus_amount} Free GC */}+{item.package_amount}{" "}
                            Free Bonus
                          </Typography>
                        </Card>
                      </main>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
        </Grid>

        <div className="icon_heading">
          <Typography sx={{ color: theme.palette.custom.white_gray }}>
            <span
              style={{
                marginRight: "10px",
              }}
            >
              <img src={coinimg1} />
            </span>{" "}
            Most Popular
          </Typography>
        </div>
        <Grid className="buy_row" container spacing={{ xs: 2, sm: 4, md: 4 }}>
          {mainItems?.map((item, index) => {
            if (item.isPopular == 1) {
              return (
                <>
                  <Grid item xs={8} md={9}>
                    <Card
                      className="c_card long-card"
                      sx={{
                        background: theme.palette.custom.gray3,
                        borderColor: theme.palette.custom.btn_border,
                      }}
                    >
                      <div className="long_img_coin">
                        <img
                          class="big_coin"
                          src={CoinBigImg}
                          alt="Coin icon"
                        />
                        <img
                          class="small_coin"
                          src={CoinSmallImg}
                          alt="Coin icon"
                        />
                        <img
                          class="back_coin"
                          src={CoinBackImg}
                          alt="Coin icon"
                        />
                      </div>
                      {item.isFeature == 1 ? (
                        <div className="green_label">
                          <Box
                            sx={{
                              color: theme.palette.custom.blackWhite,
                            }}
                          >
                            <img src={RightImg} alt="tag-right-part" />
                            <Typography
                              sx={{ background: theme.palette.custom.green01 }}
                              variant="p"
                              class="span"
                            >
                              Featured
                            </Typography>
                            <img src={LeftImg} alt="tag-left-part" />
                          </Box>
                        </div>
                      ) : null}

                      <div className="half_flex">
                        <Typography
                          className="f18 f-bold"
                          sx={{ color: theme.palette.custom.white_gray }}
                        >
                          {item?.bonus_amount} GC
                        </Typography>

                        <Button
                          size="small"
                          sx={{
                            background: theme.palette.custom.red,
                            color: theme.palette.custom.white,
                          }}
                          disabled={item?.isDisabled}
                          onClick={() => {
                            handleOpen(item);
                          }}
                        >
                          ${item.purchase_price}
                        </Button>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={4} md={3}>
                    <Typography
                      sx={{ background: theme.palette.custom.dark_d }}
                      className="right_carddiv"
                    >
                      <Button
                        size="small"
                        sx={{
                          background: theme.palette.custom.gray3,
                          color: theme.palette.custom.white,
                        }}
                      >
                        Daily Transfer :{" "}
                        {item.max_claim_perday == 0
                          ? "N/A"
                          : item.max_claim_perday >= 100
                          ? "Unlimited"
                          : item.max_claim_perday == 1
                          ? `${item.max_claim_perday} Time`
                          : `${item.max_claim_perday} Times`}
                      </Button>
                      <Button
                        size="small"
                        sx={{
                          background: theme.palette.custom.greenhalf,
                          color: theme.palette.custom.green01,
                        }}
                      >
                        Free Bonus {item.package_amount}
                      </Button>
                    </Typography>
                  </Grid>
                </>
              );
            } else {
              return null;
            }
          })}
        </Grid>

        <div className="icon_heading">
          <Typography
            sx={{ color: theme.palette.custom.white_gray, marginTop: 5 }}
          >
            <span
              style={{
                marginRight: "10px",
              }}
            >
              <img src={coinimg2} />
            </span>{" "}
            More coin packages below
          </Typography>
        </div>

        <Grid className="buy_row" container spacing={{ xs: 2, sm: 4, md: 4 }}>
          {mainItems?.map((item, index) => {
            if (item.isPopular == 1) {
              return null;
            } else {
              return (
                <>
                  <Grid item xs={8} md={9}>
                    <Card
                      className="c_card long-card"
                      sx={{
                        background: theme.palette.custom.gray3,
                        borderColor: theme.palette.custom.btn_border,
                      }}
                    >
                      <div className="long_img_coin">
                        <img
                          class="big_coin"
                          src={CoinBigImg}
                          alt="Coin icon"
                        />
                        <img
                          class="small_coin"
                          src={CoinSmallImg}
                          alt="Coin icon"
                        />
                        <img
                          class="back_coin"
                          src={CoinBackImg}
                          alt="Coin icon"
                        />
                      </div>

                      {/* <div className="green_label">
                        <Box
                          sx={{
                            color: theme.palette.custom.blackWhite,
                          }}
                        >
                          <img
                            src={RightImg}
                            alt="tag-right-part"
                          />
                          <Typography
                            sx={{ background: theme.palette.custom.green01 }}
                            variant="p"
                            class="span"
                          >
                            MEGA 1ST OFFER
                          </Typography>
                          <img
                            src={LeftImg}
                            alt="tag-left-part"
                          />
                        </Box>
                      </div> */}

                      <div className="half_flex">
                        <Typography
                          className="f18 f-bold"
                          sx={{ color: theme.palette.custom.white_gray }}
                        >
                          {item?.bonus_amount} BC
                        </Typography>
                        <Button
                          size="small"
                          sx={{
                            background: theme.palette.custom.red,
                            color: theme.palette.custom.white,
                          }}
                          disabled={item?.isDisabled}
                          onClick={() => {
                            handleOpen(item);
                          }}
                        >
                          ${item.purchase_price}
                        </Button>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={4} md={3}>
                    <Typography
                      sx={{ background: theme.palette.custom.dark_d }}
                      className="right_carddiv"
                    >
                      <Button
                        size="small"
                        sx={{
                          background: theme.palette.custom.gray3,
                          color: theme.palette.custom.white,
                        }}
                      >
                        Daily Transfer :
                        {item.max_claim_perday == 0
                          ? "N/A"
                          : item.max_claim_perday >= 100
                          ? "Unlimited"
                          : item.max_claim_perday == 1
                          ? `${item.max_claim_perday} Time`
                          : `${item.max_claim_perday} Times`}
                      </Button>
                      <Button
                        size="small"
                        sx={{
                          background: theme.palette.custom.greenhalf,
                          color: theme.palette.custom.green01,
                        }}
                      >
                        Free Bonus {item.package_amount}
                      </Button>
                    </Typography>
                  </Grid>
                </>
              );
            }
          })}
        </Grid>

        <Grid className="buy_footer" container>
          <Grid item container justifyContent="center" spacing={2}>
            <Grid item>
              <Button
                size="small"
                sx={{
                  background: theme.palette.custom.greenbtn,
                  color: theme.palette.custom.white,
                }}
                onClick={() => {
                  navigate("/contact-us");
                }}
              >
                <span style={{ textTransform: "capitalize" }}>
                  24/7 Customer Help
                </span>
              </Button>
            </Grid>

            <Grid item>
              <Button
                size="small"
                sx={{
                  background: theme.palette.custom.blue,
                  color: theme.palette.custom.white,
                }}
                onClick={() => {
                  navigate("/purchase-history");
                }}
              >
                <span style={{ textTransform: "capitalize" }}>
                  Purchase History
                </span>
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <SweepStakeTypography></SweepStakeTypography>
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default BuyCoinsNew;
