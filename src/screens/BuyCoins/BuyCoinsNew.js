import { Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useTheme } from "@emotion/react";

import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbarContext } from "../../component/SnackbarContext";
import SweepStakeTypography from "../../component/SweepStakeTypography";
import { endPoints } from "../../constant/Environment";
import CoinBackImg from "../../images/coin-back.svg";
import CoinBigImg from "../../images/coin-big.svg";
import CoinSmallImg from "../../images/coin-small.svg";
import coinimg1 from "../../images/mainpackage.png";
import svg from "../../images/newSvg.svg";
import coinimg2 from "../../images/secondpackage.png";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { getAllData } from "../../Utility/API";
import DailyReward from "../DailyReward";
import RedeemSCCode from "../RedeemSCCode";
import CopiedButton from "./CopiedButton";
import MailFeature from "./MailFeature";
import PaymentButton from "./PaymentButton";
import PaymentModal from "./PaymentModal";
import SharePost from "./SharePost";
import ShareTimerText from "./ShareTimerText";
import TimerButton from "./TimerButton";
import WheelOfFortune from "./WheelofFortune";
import BirthDayFeature from "./BirthDayFeature";
import ReferFriendInfoModal from "./ReferFriendInfoModal";
import EmailPackage from "./EamilPacakage";

const BuyCoinsNew = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const { isAuthenticated, IsLoginData } = authState;
  // console.log("isAuthenticated", IsLoginData);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const [selecteNewPackage, setSelectdNewPackage] = useState({});
  const {
    dailyLoginClaim,
    nextDailyLogin,
    validation,
    verification,
    packagecount,
    nextPost,
    postClaim,
    nextMail,
    mailClaim,

    birthDayClaim,
    nextBirthDay,
    lastBirthDay,
    showBirthDayClaim,
  } = IsLoginData || {};

  // console.log('loginData',loginData)

  const [mainItems, setMainItems] = useState([]);

  const [referAndReward, setReferAndReward] = useState([]);
  const [selectedRefer, setSelectedRefer] = useState({});
  const [payModal, setPayModal] = useState(false);
  const [paymentMode, setPaymentMode] = useState([]);
  const [segments, setSegments] = useState([]);
  const [probabilities, setProbabilities] = useState([]);
  const [colors, setColors] = useState([]);
  const [wofdata, setWofData] = useState([]);

  const [mailModal, setMailModal] = useState(false);
  const [disabledMail, setDisabledMail] = useState(false);

  const [birthdayModal, setBirthDayModal] = useState(false);
  const [disabledBirthDay, setDisabledBirthDay] = useState(false);

  // console.log('mailClaim',mailClaim,'disabledMail',disabledMail)

  const [codeModal, setCodeModal] = useState(false); // cliam sc coin modal

  const getCoinPackageList = async (list) => {
    let url = `${endPoints.api.GET_PACKAGE}`;
    dispatch(setLoading(true));
    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.status === "success" && response?.data?.length > 0) {
          const excludePackageIds = response?.data[0]?.exclude_package || [];

          const filteredPackages = response?.data?.filter(
            (item) => !excludePackageIds.includes(item?.id),
          );

          setMainItems(filteredPackages);
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  const getConfigurationList = async (list) => {
    let url = `${endPoints.api.GET_CONFIGURATION}`;
    dispatch(setLoading(true));
    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.status === "success" && response?.data?.length > 0) {
          const filteredData = response?.data?.filter((item) => item.isActive);

          setReferAndReward(filteredData);
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  const handleOpenPaymentModal = (data) => {
    setSelectdNewPackage(data);
    setPayModal(true);
  };

  const GetUserById = async () => {
    if (IsLoginData?.idUser) {
      try {
        const url = `${endPoints.api.GET_BY_USERID}/${IsLoginData?.idUser}`;
        const response = await getAllData(url);
        dispatch(setLoginData({ user: response?.data, isAuthenticated: true }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCoinPackageList();
    GetUserById();
    getConfigurationList();
  }, []);

  useEffect(() => {
    // Check if packageId is in URL parameters (for email packages)
    const packageId = searchParams.get("packageId");
    if (packageId) {
      setEmailPackageOpen(true);
    }
  }, [searchParams]);

  const payModalClose = () => {
    setPayModal(false);
  };

  const fetchPaymentMethods = async () => {
    try {
      let url = `${endPoints.api.GET_PAYMENTS}`;
      const response = await getAllData(url);
      if (response?.status === "success") {
        setPaymentMode(response?.data);
      } else {
        showErrorSnackbar(response?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const [openDailyRewards, setOpenDailyRewards] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [openWheel, setOpenWheel] = useState(false);
  const [emailPackageOpen, setEmailPackageOpen] = useState(false);

  const handleOpenWheel = async () => {
    try {
      let url = `${endPoints.api.GET_SPIN_VALUES}/${IsLoginData?.idUser}`;
      const response = await getAllData(url);
      if (
        response?.status === "success" &&
        response?.data?.segments?.length &&
        response?.data?.probabilities?.length &&
        response?.data?.colors.length
      ) {
        setSegments(response?.data?.segments);
        setProbabilities(response?.data?.probabilities);
        setColors(response?.data?.colors || []);
        setWofData(response?.data);
        setOpenWheel(true); // Opening wheel only when data is coming
      } else {
        showErrorSnackbar(t("buyCoinsPage.somethingWentWrong"));
      }
    } catch (err) {
      console.error(err);
      showErrorSnackbar(t("buyCoinsPage.somethingWentWrong"));
    }
  };

  const handleCloseWheel = () => {
    setOpenWheel(false);
  };

  const openShareModal = (item) => {
    setSelectedRefer(item);
    setShareModal(true);
  };

  const closeRewardModal = (flag) => {
    if (flag) {
      GetUserById();
      setOpenDailyRewards(false);
    } else {
      setOpenDailyRewards(false);
    }
  };

  const calculateBoostCoin = (sagaCoin, percentage) => {
    const coinpct = (sagaCoin * percentage) / 100;
    return coinpct ? coinpct?.toFixed(2) : "";
  };

  return (
    <>
      {/* <Helmet>
        <title>{t("buyCoinsPage.pageTitle")}</title>
        <meta
          name="description"
          content={t("buyCoinsPage.pageDescription")}
        />
      </Helmet> */}
      <Helmet>
        <title>{t("buyCoins.pageTitle")}</title>
        <meta name="description" content={t("buyCoins.metaDescription")} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/buy-coins/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/buy-coins/" />
        <meta property="og:title" content={t("buyCoins.pageTitle")} />
        <meta property="og:description" content={t("buyCoins.metaDescription")} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("buyCoins.pageTitle")} />
        <meta name="twitter:description" content={t("buyCoins.metaDescription")} />
        <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
      </Helmet>

      <main className="inner-body inner_space">
        {codeModal && (
          <RedeemSCCode
            openCodeModal={codeModal}
            closeCodeModal={() => {
              setCodeModal(false);
            }}
          />
        )}
        <PaymentModal
          open={payModal}
          onClose={payModalClose}
          selecteNewPackage={selecteNewPackage}
          GetUserById={GetUserById}
          getCoinPackageList={getCoinPackageList}
          paymentMode={paymentMode}
        />
        {openDailyRewards && (
          <DailyReward
            openDailyRewards={openDailyRewards}
            closeRewardModal={closeRewardModal}
            selectedRefer={selectedRefer}
          />
        )}
        {shareModal && (
          <SharePost
            openDailyRewards={shareModal}
            closeRewardModal={() => {
              setShareModal(false);
            }}
            selectedPost={selectedRefer}
          />
        )}

        {mailModal && (
          <MailFeature
            openMailModal={mailModal}
            closeMailModal={() => {
              setMailModal(false);
            }}
            selectedPost={selectedRefer}
            buttonDisabled={() => {
              setDisabledMail(true);
            }}
          />
        )}
        {birthdayModal && (
          <BirthDayFeature
            openMailModal={birthdayModal}
            closeMailModal={() => {
              setBirthDayModal(false);
            }}
            selectedPost={selectedRefer}
            buttonDisabled={() => {
              setDisabledBirthDay(true);
            }}
          />
        )}

        {/* wheel of fortune code  */}

        <WheelOfFortune
          open={openWheel}
          handleClose={handleCloseWheel}
          wofdata={wofdata}
        />

        {/* end of wheel of fortune code  */}

        {/* first section hide right now */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: isAuthenticated ? "0px" : "60px",
          }}
        >
          <div className="icon_heading">
            <Typography sx={{ color: theme.palette.custom.white_gray }}>
              <span
                style={{
                  marginRight: "10px",
                }}
              >
                <img src={coinimg1} />
              </span>
              Special Offers
            </Typography>
          </div>

          {/* <div>
            <Button
              className="full_btn"
              size="small"
              sx={{
                background: theme.palette.custom.pink_bg,
                color: theme.palette.custom.white_gray,
              }}
              onClick={() => {
                isAuthenticated ? setCodeModal(true) : navigate("/login");
              }}
            >
              Claim SC
            </Button>
          </div> */}
        </div>

        <Grid className="buy_row" container spacing={{ xs: 5, sm: 4, md: 2 }}>
          <div className="button_scroll">
            <div className="c_scroll ">
              <div className="custom_row">
                {mainItems?.map((item, index) => {
                  if (item.isSpecial == 1) {
                    return (
                      <main className="custom_col" key={item.id}>
                        <Card
                          className="c_card middle_card"
                          sx={{
                            background: theme.palette.custom.lgray,
                            borderColor: theme.palette.custom.redblue_border,
                          }}
                        >
                          <div className="card_label">
                            <p>
                              <span
                                style={{ fontSize: "10px", color: "white" }}
                              >
                                {t("buyCoinsPage.freeSC")}
                              </span>
                              <span style={{ color: "white" }}>
                                {" "}
                                {item.package_amount}
                              </span>
                            </p>
                            <img src={svg} alt="icon" />
                          </div>

                          <div className="buy_card1">
                            <div className="right_half">
                              <CardMedia
                                component="img"
                                height="100%"
                                image={`${endPoints?.imageCDN}${item.creative}`}
                              />
                            </div>
                            <div className="left_half">
                              <Typography
                                className="f18 f-bold"
                                sx={{ color: theme.palette.custom.white_gray }}
                              >
                              ${item.purchase_price}
                              </Typography>

                              <PaymentButton
                                item={item}
                                GetUserById={GetUserById}
                                getCoinPackageList={getCoinPackageList}
                                className="best_btn"
                                allowOnPress={true}
                                handleOnPress={handleOpenPaymentModal}
                              />
                            </div>
                          </div>
                        </Card>
                      </main>
                    );
                  } else {
                    return null;
                  }
                })}

                {/* workign code with dummy data format */}

                {/* {referAndReward.map((ele) => {
                  if (
                    ((validation == "1" || verification === "1") &&
                      ele.conf_name == "daily_bouns") ||
                    ele.conf_name == "refer_friend" ||
                    ele.conf_name == "social_media" ||
                    ele.conf_name == "mailing" ||
                    (ele.conf_name == "birthday_bonus" && showBirthDayClaim)
                  ) {
                    return (
                      <main className="custom_col">
                        <Card
                          className="c_card middle_card"
                          sx={{
                            background: theme.palette.custom.lgray,
                            borderColor: theme.palette.custom.redblue_border,
                          }}
                        >
                          <div className="card_label">
                            <p>
                              <span
                                style={{ fontSize: "10px", color: "white" }}
                              >
                                {t("buyCoinsPage.freeSC")}
                              </span>
                              <span
                                style={{ fontSize: "10px", color: "white" }}
                              >
                                {ele.conf_name == "daily_bouns" ||
                                ele.conf_name == "mailing" ||
                                ele.conf_name == "birthday_bonus"
                                  ? null
                                  : ele.sc_coin}
                              </span>
                            </p>
                            <img src={svg} alt="icon" />
                          </div>

                          <div className="buy_card1">
                            <div className="right_half">
                              <CardMedia
                                component="img"
                                height="100%"
                                image={`${endPoints?.imageCDN}${ele.icon}`}
                              />
                            </div>
                            <div className="left_half">
                              <Typography
                                className="f18 f-bold"
                                sx={{ color: theme.palette.custom.white_gray }}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {ele.name}
                                {ele.conf_name == "refer_friend" && (
                                  <div style={{ marginLeft: "10px" }}>
                                    <ReferFriendInfoModal />
                                  </div>
                                )}
                              </Typography>

                              {ele.conf_name == "refer_friend" ? (
                                <CopiedButton />
                              ) : ele.conf_name == "social_media" ? (
                                <Button
                                  className="best_btn"
                                  size="small"
                                  sx={{
                                    background: theme.palette.custom.red,
                                    color: theme.palette.custom.white,
                                  }}
                                  onClick={() => {
                                    isAuthenticated
                                      ? openShareModal(ele)
                                      : navigate("/login");
                                  }}
                                  disabled={postClaim}
                                >
                                  <ShareTimerText
                                    initialTime={nextPost}
                                    postClaim={postClaim}
                                    mailFeature={false}
                                  />
                                </Button>
                              ) : ele.conf_name == "daily_bouns" ? (
                                <Button
                                  className="best_btn"
                                  size="small"
                                  sx={{
                                    background: theme.palette.custom.red,
                                    color: theme.palette.custom.white,
                                  }}
                                  onClick={() => {
                                    isAuthenticated
                                      ? handleOpenWheel()
                                      : navigate("/login");
                                  }}
                                  disabled={dailyLoginClaim}
                                >
                                  <TimerButton
                                    initialTime={nextDailyLogin}
                                    isDailyLoginClaim={dailyLoginClaim}
                                  />
                                </Button>
                              ) : ele.conf_name == "mailing" ? (
                                <Button
                                  className="best_btn"
                                  size="small"
                                  sx={{
                                    background: theme.palette.custom.red,
                                    color: theme.palette.custom.white,
                                  }}
                                  onClick={() => {
                                    setSelectedRefer(ele);
                                    isAuthenticated
                                      ? setMailModal(true)
                                      : navigate("/login");
                                  }}
                                  disabled={mailClaim || disabledMail}
                                >
                                  <ShareTimerText
                                    initialTime={nextMail}
                                    postClaim={mailClaim}
                                    mailFeature={true}
                                  />
                                </Button>
                              ) : ele.conf_name == "birthday_bonus" ? (
                                <Button
                                  className="best_btn"
                                  size="small"
                                  sx={{
                                    background: theme.palette.custom.red,
                                    color: theme.palette.custom.white,
                                  }}
                                  onClick={() => {
                                    setSelectedRefer(ele);
                                    isAuthenticated
                                      ? setBirthDayModal(true)
                                      : navigate("/login");
                                  }}
                                  disabled={birthDayClaim || disabledBirthDay}
                                >
                                  <ShareTimerText
                                    initialTime={nextBirthDay}
                                    postClaim={birthDayClaim}
                                    mailFeature={true}
                                  />
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </Card>
                      </main>
                    );
                  } else {
                    return null;
                  }
                })} */}
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
            {t("buyCoinsPage.mostPopularTitle")}
          </Typography>
        </div>
        <Grid className="buy_row" container spacing={{ xs: 2, sm: 4, md: 4 }}>
          {mainItems?.map((item, index) => {
            if (item.isPopular == 1 && item.isSpecial == 0) {
              return (
                <>
                  <Grid item xs={4} md={6}>
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
                          <Box>
                            <Typography
                              sx={{
                                color: "white",
                              }}
                              variant="p"
                            >
                              {t("buyCoinsPage.featured")}
                            </Typography>
                          </Box>
                        </div>
                      ) : null}

                      <div className="half_flex">
                        <PaymentButton
                          item={item}
                          GetUserById={GetUserById}
                          getCoinPackageList={getCoinPackageList}
                          allowOnPress={true}
                          handleOnPress={handleOpenPaymentModal}
                        />

                        {item?.freeSpin && (
                          <Button
                            size="small"
                            sx={{
                              ml: 1,
                              borderRadius: "20px",
                              px: { xs: 1, md: 2 },
                              py: 0.5,
                              minWidth: { xs: 50, md: "auto" },
                              background: theme.palette.custom.red,
                              color: theme.palette.custom.white,
                              fontWeight: 700,
                              fontSize: { xs: "11px", md: "14px" },
                              boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
                              border: "1px solid rgba(255,255,255,0.04)",
                              textTransform: "capitalize",
                              whiteSpace: "nowrap",
                              marginLeft: { xs: "-10px" },
                            }}
                          >
                            <Box
                              component="span"
                              sx={{ display: { xs: "none", md: "inline" } }}
                            >
                              +{item.spinCount} {t("buyCoinsPage.freeSpins")}
                            </Box>
                            <Box
                              component="span"
                              sx={{
                                display: { xs: "inline", md: "none" },
                                fontSize: "11px",
                              }}
                            >
                              <>
                                +{item?.spinCount} {t("buyCoinsPage.freeSpin")}
                              </>
                            </Box>
                          </Button>
                        )}
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <Typography
                      sx={{ background: theme.palette.custom.dark_d }}
                      className="right_carddiv"
                    >
                      <Button
                        size="large"
                        sx={{
                          background: theme.palette.custom.greenhalf,
                          color: theme.palette.custom.green01,
                        }}
                      >
                        {t("buyCoinsPage.freeSC")} ${item.package_amount}
                        {item?.isBoost
                          ? ` + $${calculateBoostCoin(item?.purchase_price, item?.boostValue)} ⚡ Boost`
                          : ""}
                      </Button>

                      <Button
                        size="large"
                        sx={{
                          background: theme.palette.custom.greenhalf,
                          color: theme.palette.custom.green01,
                        }}
                      >
                        {item?.package_name}
                      </Button>
                    </Typography>
                  </Grid>

                  {/* <Grid item xs={4} md={3}>
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
                        Daily{" "}
                        {item.max_claim_perday == 0
                          ? "N/A"
                          : item.max_claim_perday >= 100
                          ? "Unlimited"
                          : item.max_claim_perday == 1
                          ? `${item.max_claim_perday} `
                          : `${item.max_claim_perday} `}{" "}
                        Transfer for {`${item.days}`}{" "}
                        {item.days == 1 ? "day" : "days"}
                      </Button>
                    </Typography>
                  </Grid> */}
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
            {t("buyCoinsPage.moreCoinPackagesTitle")}
          </Typography>
        </div>

        <Grid className="buy_row" container spacing={{ xs: 2, sm: 4, md: 4 }}>
          {mainItems?.map((item, index) => {
            if (item.isPopular == 1 || item.isSpecial == 1) {
              return null;
            } else {
              return (
                <>
                  <Grid item xs={4} md={6}>
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

                      <div className="half_flex">
                        <PaymentButton
                          item={item}
                          GetUserById={GetUserById}
                          getCoinPackageList={getCoinPackageList}
                          //to comment both below these lines for payment modal later for enable when muiplte payment are there (these are used 3 times)
                          allowOnPress={true}
                          handleOnPress={handleOpenPaymentModal}
                        />
                        {item?.freeSpin && (
                          <Button
                            size="small"
                            sx={{
                              ml: 1,
                              borderRadius: "20px",
                              px: { xs: 1, md: 2 },
                              py: 0.5,
                              minWidth: { xs: 50, md: "auto" },
                              background: theme.palette.custom.red,
                              color: theme.palette.custom.white,
                              fontWeight: 700,
                              fontSize: { xs: "11px", md: "14px" },
                              boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
                              border: "1px solid rgba(255,255,255,0.04)",
                              textTransform: "capitalize",
                              whiteSpace: "nowrap",
                              marginLeft: { xs: "-10px" },
                            }}
                          >
                            <Box
                              component="span"
                              sx={{ display: { xs: "none", md: "inline" } }}
                            >
                              +{item.spinCount} {t("buyCoinsPage.freeSpins")}
                            </Box>
                            <Box
                              component="span"
                              sx={{
                                display: { xs: "inline", md: "none" },
                                fontSize: "11px",
                              }}
                            >
                              <>
                                +{item?.spinCount} {t("buyCoinsPage.freeSpin")}
                              </>
                            </Box>
                          </Button>
                        )}
                      </div>
                    </Card>
                  </Grid>

                  <Grid item xs={8} md={6}>
                    <Typography
                      sx={{ background: theme.palette.custom.dark_d }}
                      className="right_carddiv"
                    >
                      <Button
                        size="large"
                        sx={{
                          background: theme.palette.custom.greenhalf,
                          color: theme.palette.custom.green01,
                        }}
                      >
                        {t("buyCoinsPage.freeSC")} ${item.package_amount}
                        {item?.isBoost
                          ? ` + $${calculateBoostCoin(item?.purchase_price, item?.boostValue)} ⚡ Boost`
                          : ""}
                      </Button>

                      <Button
                        size="large"
                        sx={{
                          background: theme.palette.custom.greenhalf,
                          color: theme.palette.custom.green01,
                        }}
                      >
                        {item?.package_name}
                      </Button>
                    </Typography>
                  </Grid>

                  {/* <Grid item xs={4} md={3}>
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
                        Daily{" "}
                        {item.max_claim_perday == 0
                          ? "N/A"
                          : item.max_claim_perday >= 100
                          ? "Unlimited"
                          : item.max_claim_perday == 1
                          ? `${item.max_claim_perday} `
                          : `${item.max_claim_perday} `}{" "}
                        Transfer for {`${item.days}`}{" "}
                        {item.days == 1 ? "day" : "days"}
                      </Button>
                    </Typography>
                  </Grid> */}
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
                  {t("buyCoinsPage.customerHelp")}
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
                  {t("buyCoinsPage.purchaseHistory")}
                </span>
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <SweepStakeTypography></SweepStakeTypography>
          </Grid>
        </Grid>
      </main>

      {/* Email Package Modal */}
      <EmailPackage
        open={emailPackageOpen}
        onClose={() => setEmailPackageOpen(false)}
      />
    </>
  );
};

export default BuyCoinsNew;
