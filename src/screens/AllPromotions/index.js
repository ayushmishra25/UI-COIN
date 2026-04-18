import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { endPoints } from "../../constant/Environment";
import coinimg1 from "../../images/mainpackage.png";
import svg from "../../images/newSvg.svg";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { getAllData } from "../../Utility/API";
import CopiedButton from "../BuyCoins/CopiedButton";
import MailFeature from "../BuyCoins/MailFeature";
import SharePost from "../BuyCoins/SharePost";
import ShareTimerText from "../BuyCoins/ShareTimerText";
import TimerButton from "../BuyCoins/TimerButton";
import WheelOfFortune from "../BuyCoins/WheelofFortune";
import BirthDayFeature from "../BuyCoins/BirthDayFeature";
import ReferFriendInfoModal from "../BuyCoins/ReferFriendInfoModal";
import RedeemSCCode from "../RedeemSCCode";
import PaymentButton from "../BuyCoins/PaymentButton";
import MonthlyPromotions from "../MonthlyPromotions";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";

const AllPromotions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated, IsLoginData } = authState;
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  const {
    dailyLoginClaim,
    nextDailyLogin,
    validation,
    verification,
    nextPost,
    postClaim,
    nextMail,
    mailClaim,
    birthDayClaim,
    nextBirthDay,
    lastBirthDay,
    showBirthDayClaim,
  } = IsLoginData || {};

  const {timer,is24HrsOver,claimed} = IsLoginData?.dailyReward || {};

  const [mainItems, setMainItems] = useState([]);
  const [referAndReward, setReferAndReward] = useState([]);
  const [selectedRefer, setSelectedRefer] = useState({});
  const [segments, setSegments] = useState([]);
  const [probabilities, setProbabilities] = useState([]);
  const [colors, setColors] = useState([]);
  const [wofdata, setWofData] = useState([]);
  const [mailModal, setMailModal] = useState(false);
  const [disabledMail, setDisabledMail] = useState(false);
  const [birthdayModal, setBirthDayModal] = useState(false);
  const [disabledBirthDay, setDisabledBirthDay] = useState(false);
  const [codeModal, setCodeModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [openWheel, setOpenWheel] = useState(false);
  const [openPromo, setOpenPromo] = useState(false);
    const [disableMonthly, setDisableMonthly] = useState(false);
  const[promotionName,setPromotionName]=useState("");  



  const getConfigurationList = async () => {
    let url = `${endPoints.api.GET_CONFIGURATION}`;
    dispatch(setLoading(true));
    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.status === "success" && response?.data?.length > 0) {
          const filteredData = response?.data?.filter((item) => item.isActive);
          setReferAndReward(filteredData);
          const name = filteredData.find((item) => item.conf_name === "daily_login_streak")?.name || "";
          setPromotionName(name);
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  const handleOpenWheel = async () => {
    try {
      let url = `${endPoints.api.GET_SPIN_VALUES}/${IsLoginData?.idUser}`;
      const response = await getAllData(url);
      if (
        response?.status === "success" &&
        response?.data?.segments?.length &&
        response?.data?.probabilities?.length &&
        response?.data?.colors?.length
      ) {
        setSegments(response?.data?.segments);
        setProbabilities(response?.data?.probabilities);
        setColors(response?.data?.colors || []);
        setWofData(response?.data);
        setOpenWheel(true);
      } else {
        showErrorSnackbar(t("allPromotionsPage.somethingWentWrong"));
      }
    } catch (err) {
      console.error(err);
      showErrorSnackbar(t("allPromotionsPage.somethingWentWrong"));
    }
  };

  const handleCloseWheel = () => {
    setOpenWheel(false);
  };

  const openShareModal = (item) => {
    setSelectedRefer(item);
    setShareModal(true);
  };

  useEffect(() => {
    getConfigurationList();
    GetUserById();
  }, []);

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

    const handleloginStreak = () => {
      GetUserById();
       setOpenPromo(true);
      // if(IsLoginData?.dailyReward?.hasMinPackage){
      //   setOpenPromo(true);
      // }
      // else{
      //   if(IsLoginData?.dailyReward?.packageAmount){
      //     showErrorSnackbar(`Buy a coin pacakage of $${IsLoginData?.dailyReward?.packageAmount} or more and enjoy the daily login streak rewards.`);
      //   } else  
      //   {
      //   showErrorSnackbar(`Buy a coin pacakage and enjoy the daily login streak rewards.`);
      //   }
      // }
    }
    

  return (
    <>
      <Helmet>
        <title>{t("promotionsPage.pageTitle")}</title>
        <meta name="description" content={t("promotionsPage.metaDescription")} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/all-promotions/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/all-promotions/" />
        <meta property="og:title" content={t("promotionsPage.pageTitle")} />
        <meta property="og:description" content={t("promotionsPage.metaDescription")} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("promotionsPage.pageTitle")} />
        <meta name="twitter:description" content={t("promotionsPage.metaDescription")} />
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

        <WheelOfFortune
          open={openWheel}
          handleClose={handleCloseWheel}
          wofdata={wofdata}
        />

        <MonthlyPromotions 
         open={openPromo} 
         onClose={() => setOpenPromo(false)} 
         buttonDisabled={() => {setDisableMonthly(true);}}
         promotionName={promotionName}
         />

        <div className="icon_heading" style={{ marginTop: isAuthenticated ? "0px" : "60px",display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <Typography sx={{ color: theme.palette.custom.white_gray }}>
            <span style={{ marginRight: "10px" }}>
              <img src={coinimg1} />
            </span>
            {t("allPromotionsPage.heading")}
          </Typography>

            {isAuthenticated &&
            (
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
                        {t("allPromotionsPage.claimSC")}
            </Button>
            )}
        </div>

        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
          {referAndReward.map((ele) => {
            if (isAuthenticated ? 
              (((validation === "1" || verification === "1") && 
              ele.conf_name === "daily_bouns") ||
              ele.conf_name === "refer_friend" ||
              ele.conf_name === "social_media" ||
              ele.conf_name === "mailing" ||
              ele.conf_name === "daily_login_streak" ||
              (ele.conf_name === "birthday_bonus" && showBirthDayClaim))
            : 
              (ele.conf_name === "daily_bouns" ||
              ele.conf_name === "refer_friend" ||
              ele.conf_name === "social_media" ||
              ele.conf_name === "mailing" ||
              ele.conf_name === "daily_login_streak" ||
              (ele.conf_name === "birthday_bonus"))
            ) {
              return (
                <Grid item xs={6} sm={6} md={3} key={ele.id}>
                  <Card
                    className="c_card middle_card"
                    sx={{
                      background: theme.palette.custom.lgray,
                      borderColor: theme.palette.custom.redblue_border,
                    }}
                  >
                    <div className="card_label">
                      <p>
                        <span style={{ fontSize: "10px", color: "white" }}>
                          {t("allPromotionsPage.freeSC")}
                        </span>
                        <span style={{ fontSize: "10px", color: "white" }}>
                          {ele.conf_name == "daily_bouns" ||
                          ele.conf_name == "mailing" ||
                          ele.conf_name == "birthday_bonus" || 
                          ele.conf_name == "daily_login_streak"
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
                        ) : ele.conf_name == "daily_login_streak" ? (
                          <Button
                            className="best_btn"
                            size="small"
                            sx={{
                              background: theme.palette.custom.red,
                              color: theme.palette.custom.white,
                              fontSize:"13px!important",
                            }}
                            onClick={() => {
                              setSelectedRefer(ele);
                              isAuthenticated
                                ? handleloginStreak()
                                : navigate("/login");
                            }}
                            // disabled={claimed}
                          >
                            {t("allPromotionsPage.claimNow")}
                            {/* <TimerButton
                              initialTime={timer}
                              isDailyLoginClaim={claimed}
                            /> */}
                          </Button>
                        ) 
                        
                        : ele.conf_name == "birthday_bonus" ? (
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
                </Grid>
              );
            } else {
              return null;
            }
          })}
        </Grid>
      </main>
    </>
  );
};

export default AllPromotions;



