import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Stack,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import StarsIcon from "@mui/icons-material/Stars";
import vip from "../../images/loyalty/VIP.svg";
import basic from "../../images/loyalty/Basic.svg";
import { endPoints } from "../../constant/Environment";
import {
  addBetData,
  addData,
  getAllBetData,
  getAllData,
} from "../../Utility/API";
import reward1 from "../../images/loyalty/reward/reward1.svg";
import reward2 from "../../images/loyalty/reward/reward2.svg";
import reward3 from "../../images/loyalty/reward/reward3.svg";
import reward4 from "../../images/loyalty/reward/reward4.svg";
import bronze from "../../images/loyalty/bronze.png";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { Helmet } from "react-helmet";

const Loyalty = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [vipdata, setVipData] = useState("");
  const [tiers, setTiers] = useState([]);

  const fetchVipPackage = async () => {
    let url = `${endPoints.api.GET_VIP_PACKAGES}`;
    dispatch(setLoading(true));
    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.status === "success") {
          setTiers(response?.data);
        } else {
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  const VipData = async () => {
    let url = `${endPoints.api.USER_VIP_LEVEL}/${loginData?.idUser}`;
    dispatch(setLoading(true));
    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.status == "success") {
          setVipData(response?.data);
        } else {
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  useEffect(() => {
    fetchVipPackage();
    VipData();
  }, []);

  const rewards = [
    {
      title: t("loyaltyPage.reward1Title"),
      description: t("loyaltyPage.reward1Description"),
      image: reward1,
    },
    {
      title: t("loyaltyPage.reward2Title"),
      description: t("loyaltyPage.reward2Description"),
      image: reward2,
    },
    {
      title: t("loyaltyPage.reward3Title"),
      description: t("loyaltyPage.reward3Description"),
      image: reward3,
    },
    {
      title: t("loyaltyPage.reward4Title"),
      description: t("loyaltyPage.reward4Description"),
      image: reward4,
    },
  ];

  const benefits = [
    {
      title: t("loyaltyPage.benefitVIPHostTitle"),
      items: [
        t("loyaltyPage.benefitVIPHostItem1"),
        t("loyaltyPage.benefitVIPHostItem2"),
        t("loyaltyPage.benefitVIPHostItem3"),
        t("loyaltyPage.benefitVIPHostItem4"),
      ],
    },
    {
      title: t("loyaltyPage.benefitVIPPromotionsTitle"),
      items: [
        t("loyaltyPage.benefitVIPPromotionsItem1"),
        t("loyaltyPage.benefitVIPPromotionsItem2"),
        t("loyaltyPage.benefitVIPPromotionsItem3"),
      ],
    },
    {
      title: t("loyaltyPage.benefitVIPGiftsTitle"),
      items: [
        t("loyaltyPage.benefitVIPGiftsItem1"),
        t("loyaltyPage.benefitVIPGiftsItem2"),
        t("loyaltyPage.benefitVIPGiftsItem3"),
      ],
    },
  ];

  const TierCard = ({ tier }) => {
    return (
      <Card
        sx={{
          background: theme.palette.custom.light_gray,
          color: theme.palette.custom.white,
          textAlign: "center",
          minWidth: { xs: 310, sm: 380, md: 380 },
          maxWidth: { xs: 340, sm: 420, md: 420 },
          boxShadow: "6px 6px 12px rgba(0, 0, 0, 1)",
          borderRadius: 3,
          border: "1px solid #333",
          p: 2,
          mx: "auto",
          position: "relative",
          mt: 5,
          overflow: "visible",
        }}
      >
        <Box
          component="img"
          // src={tier.icon}
          // src={`${endPoints.apiBaseUrl}${tier.levelimage}`}
          src={`${endPoints.imageCDN}${tier.levelimage}`}  // cdn image has been replaced
          alt={tier.packagename}
          sx={{
            width: 100,
            height: 100,
            position: "absolute",
            top: { xs: "-45px", md: "-50px" },
            left: { xs: "32%", md: "37%" },
            zIndex: "1",
          }}
        />
        {tier?.vip_club_access == "1" ? (
          <Box
            component="img"
            src={vip}
            alt={"vip icon"}
            sx={{
              width: 80,
              height: 80,
              position: "absolute",
              top: "-37px",
              left: { xs: "75%", md: "78%" },
              zIndex: "1",
            }}
          />
        ) : (
          <Box
            component="img"
            src={basic}
            alt={"basic icon"}
            sx={{
              width: 80,
              height: 80,
              position: "absolute",
              top: "-37px",
              left: { xs: "75%", md: "78%" },
              zIndex: "1",
            }}
          />
        )}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            {tier.packagename}
          </Typography>

          <CardContent sx={{ textAlign: "left" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: theme.palette.custom.pink_bg,
              }}
            >
              {t("loyaltyPage.gcPurchased")} {" "}
              <span
                style={{
                  color: theme.palette.custom.yellow,
                  fontWeight: "bolder",
                }}
              >
                {tier?.gc_required
                  ? Number(tier?.gc_required).toLocaleString() + t("loyaltyPage.perMonth")
                  : ""}
              </span>
            </Typography>
            <Typography variant="body2">
              {t("loyaltyPage.monthlyCoinBoost")} {" "}
              <span
                style={{
                  color: theme.palette.custom.yellow,
                  fontWeight: "bolder",
                }}
              >
                {tier.weekly_gc_boost}{t("loyaltyPage.percent")}
              </span>
            </Typography>
            <Typography variant="body2">
              {t("loyaltyPage.giftDelivery")} {" "}
              <span
                style={{
                  color: theme.palette.custom.yellow,
                  fontWeight: "bolder",
                }}
              >
                {tier.gift_delivery}
              </span>
            </Typography>
            <Typography variant="body2">
              {t("loyaltyPage.exclusiveGames")} {" "}
              <span
                style={{
                  color: theme.palette.custom.yellow,
                  fontWeight: "bolder",
                }}
              >
                {tier.exclusive_games == "1" ? t("loyaltyPage.yes") : t("loyaltyPage.no")}
              </span>
            </Typography>
            <Typography variant="body2">
              {t("loyaltyPage.cashRedemption")} {" "}
              <span
                style={{
                  color: theme.palette.custom.yellow,
                  fontWeight: "bolder",
                }}
              >
                {tier?.cash_redemption}
              </span>
            </Typography>
            <Typography variant="body2">
              {t("loyaltyPage.luxuryGifts")} {" "}
              <span
                style={{
                  color: theme.palette.custom.yellow,
                  fontWeight: "bolder",
                }}
              >
                {tier?.luxury_rewards == "1" ? t("loyaltyPage.yes") : t("loyaltyPage.no")}
              </span>
            </Typography>
            <Typography variant="body2">
              {t("loyaltyPage.birthdayBonus")} {" "}
              <span
                style={{
                  color: theme.palette.custom.yellow,
                  fontWeight: "bolder",
                }}
              >
                {tier?.birthday_bonus}
              </span>
            </Typography>
            <Typography variant="body2">
              {t("loyaltyPage.withdrawalLimit")} {" "}
              <span
                style={{
                  color: theme.palette.custom.yellow,
                  fontWeight: "bolder",
                }}
              >
                {tier?.withdrawl_limit}
              </span>
            </Typography>
            <Typography variant="body2">
              {t("loyaltyPage.freeSpins")} {" "}
              <span
                style={{
                  color: theme.palette.custom.yellow,
                  fontWeight: "bolder",
                }}
              >
                {tier?.free_spins}
              </span>
            </Typography>
          </CardContent>
        </Box>
      </Card>
    );
  };

  return (
    <>
      <Helmet>
        <title>{t("loyaltyPage.pageTitle")}</title>
        <meta name="description" content={t("loyaltyPage.pageDescription")} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Box sx={{ p: { xs: 0 } }}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, fontWeight: "bold", marginBottom: "20px" }}
          >
            {t("loyaltyPage.mainHeading")}
          </Typography>
        </Toolbar>

        <Card
          sx={{
            background: theme.palette.custom.light_gray,
            color: theme.palette.custom.white,
            textAlign: "center",
            minWidth: { xs: 310, sm: 380, md: 250 },
            maxWidth: { xs: 340, sm: 420, md: 290 },
            boxShadow: "6px 6px 12px rgba(0, 0, 0, 1)",
            borderRadius: 3,
            border: "4px solid transparent",
            p: 2,
            mx: "auto",
            position: "relative",
            mt: 5,
            overflow: "visible",
            // backgroundImage: `
            //   linear-gradient(${theme.palette.custom.light_gray}, ${theme.palette.custom.light_gray}),
            //   radial-gradient(circle, #ff0, #00f, #0ff, #f00)
            // `,
            backgroundImage: `
              linear-gradient(${theme.palette.custom.light_gray}, ${theme.palette.custom.light_gray}),
              radial-gradient(circle, #ff0, #00f, #0ff, #f00, #0f0)
            `,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          <Box
            component="img"
            src={`${endPoints.imageCDN}${vipdata.levelimage}`}
            sx={{
              width: 105,
              height: 105,
              position: "absolute",
              top: { xs: "-65px", md: "-60px" },
              left: { xs: "35%", md: "32%" },
              zIndex: "1",
            }}
          />
          <Typography
            variant="h6"
            color="white"
            fontWeight="bold"
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            {vipdata?.packagename}
          </Typography>
          <Box
            sx={{
              backgroundColor: "#FFC107",
              color: "black",
              borderRadius: 12,
              px: 2,
              py: 0.5,
              mt: 0.5,
              fontWeight: "bold",
              fontSize: 9,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              margin: "0 auto",
            }}
          >
            {t("loyaltyPage.currentLevel")}
          </Box>
          <CardContent sx={{ textAlign: "left" }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    p: 1,
                    textAlign: "center",
                    color: "white",
                    fontSize: 12,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "12px", fontWeight: "bolder" }}
                  >
                    {t("loyaltyPage.coinBoost")}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "16px", fontWeight: "bolder" }}
                  >
                    {vipdata?.weekly_gc_boost}%
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    p: 1,
                    textAlign: "center",
                    color: "white",
                    fontSize: 12,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "12px", fontWeight: "bolder" }}
                  >
                    {t("loyaltyPage.giftDelivery")}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "16px", fontWeight: "bolder" }}
                  >
                    {vipdata?.gift_delivery}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    p: 1,
                    textAlign: "center",
                    color: "white",
                    fontSize: 12,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "12px", fontWeight: "bolder" }}
                  >
                    {t("loyaltyPage.vipAccess")}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "16px", fontWeight: "bolder" }}
                  >
                    {vipdata?.vip_club_access == "1" ? "Yes" : "No"}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    p: 1,
                    textAlign: "center",
                    color: "white",
                    fontSize: 12,
                  }}
                >
                  {" "}
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "12px", fontWeight: "bolder" }}
                  >
                    {t("loyaltyPage.freeSpins")}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "16px", fontWeight: "bolder" }}
                  >
                    {vipdata?.free_spins}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Container sx={{ py: 4, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {tiers?.length ?? "9"} {t("loyaltyPage.tiersToClimb")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: theme.palette.custom.gray }}
          >
            {t("loyaltyPage.tierDescription")}
          </Typography>
          {/* <Typography
          variant="body1"
          sx={{ mb: 3, color: theme.palette.custom.gray }}
        >
          Reaching these levels means you can keep your status for a whole year
          and enjoy access to the number 1 VIP Club on the market.
        </Typography> */}

          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 4,
              pb: 2,
              whiteSpace: "nowrap",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              marginTop: "40px",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                minWidth: "40%",
                flexShrink: 0,
              }}
            />
            {tiers.map((tier, index) => (
              <TierCard key={index} tier={tier} />
            ))}
          </Box>

          <Box
            textAlign="center"
            sx={{
              p: { xs: 0, md: 6 },
              color: theme.palette.custom.white,
              mb: { xs: 4, md: 2 },
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.custom.white }}>
              {t("loyaltyPage.loyaltyProgramTitle")}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.custom.yellow,
                fontWeight: "bold",
                mb: 2,
              }}
            >
              {t("loyaltyPage.loyaltyProgramSubtitle")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {t("loyaltyPage.loyaltyClubWelcome")}
            </Typography>

            <Grid container spacing={1} justifyContent="center">
              {rewards.map((reward, index) => (
                <Grid item xs={6} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      background: theme.palette.custom.light_gray,
                      color: theme.palette.custom.white,
                      textAlign: "center",
                      // height: { xs: "320px", md: "265px" },
                      height: "100%",
                      borderRadius: "5px",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 1 } }}>
                      <Box
                        component="img"
                        src={reward.image}
                        alt={reward.title}
                        sx={{ width: "110px", height: "110px" }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {reward.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: "5px",
                          fontWeight: "light",
                          fontSize: { xs: "14px", md: "13px" },
                        }}
                      >
                        {reward.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box
            textAlign="center"
            sx={{ color: theme.palette.custom.white, p: { md: 2 } }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {t("loyaltyPage.vipClubTitle")}
            </Typography>
            <Typography variant="body1">
              {t("loyaltyPage.vipClubDescription")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                ml: { md: 2 },
                p: { md: 2 },
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  sx={{
                    // minWidth: 280,
                    // maxWidth: 320,
                    minWidth: { xs: 310, sm: 280, md: 280 },
                    maxWidth: { xs: 340, sm: 320, md: 320 },
                    background: theme.palette.custom.light_gray,
                    color: "white",
                    // p: 2,
                    marginTop: { xs: 3 },
                    borderRadius: 2,
                    boxShadow: 3,
                    scrollSnapAlign: "start",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bolder", mb: 2, textAlign: "start" }}
                    >
                      {benefit.title}
                    </Typography>
                    {benefit.items.map((item, idx) => (
                      <Box
                        key={idx}
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <StarsIcon
                          sx={{
                            color: theme.palette.custom.yellow,
                            fontSize: 22,
                            mr: 1,
                          }}
                        />
                        <Typography textAlign="start" variant="body2">
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Loyalty;
