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
import { useAuth } from "../../AuthContext";
import { BsFire } from "react-icons/bs";
import { useTheme } from "@emotion/react";
import img1 from "../../images/img1.webp";
import img2 from "../../images/img2.webp";
import img3 from "../../images/img3.webp";
import img4 from "../../images/banner.jpg";
import img5 from "../../images/coin1.webp";
import img6 from "../../images/mainitem1.png";
import img7 from "../../images/main1.png";
import img8 from "../../images/main3.png";
import { endPoints, PaymentEndpoints } from "../../constant/Environment";
import { useSelector } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useDispatch } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { getAllData, addData, addBetData } from "../../Utility/API";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { SkrillEnv } from "../../constant/SkrillEnv";
import SweepStakeTypography from "../../component/SweepStakeTypography";
import { useNavigate } from "react-router-dom";
import coinimg1 from "../../images/mainpackage.png";
import coinimg2 from "../../images/secondpackage.png";
import bonuscashImg from "../../images/goldcoin.png";
import realcashImg from "../../images/saga_coin.png";
import skrill from "../../images/skrill.png";
import { isMobile } from "react-device-detect";
import { getWebsiteInfo } from "../../Utility/ConfigData";
import StripeModal from "./StripeModal";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
const BuyCoins = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const dispatch = useDispatch();
  const [coinPackageList, setCoinPackageList] = useState([]);
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const [featuredItems, setFeaturedItems] = useState([]);
  const [mainItems, setMainItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [buyprice, setBuyprice] = useState(0);
  const [buyorder, setBuyorder] = useState(0);
  const [isfeatured, setIsfeatured] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const websiteEnv = getWebsiteInfo();
  const [stripeOpen, setStripeOpen] = useState(false);

  const cards = [
    {
      title: "Card 1",
      description: "This is the first card",
      image: img1,
    },
  ];
  const cards1 = [
    {
      title: "Card 1",
      description: "This is the first card",
      image: img1,
    },
    {
      title: "Card 2",
      description: "This is the second card",
      image: img2,
    },
    {
      title: "Card 3",
      description: "This is the third card",
      image: img3,
    },
    {
      title: "Card 4",
      description: "This is the second card",
      image: img2,
    },
    {
      title: "Card 5",
      description: "This is the first card",
      image: img5,
    },
    {
      title: "Card 6",
      description: "This is the first card",
      image: img6,
    },
  ];

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

  const API_KEY_MERCHANT_TEST = `${SkrillEnv.keys}`;

  const API_ENV = `${SkrillEnv.Env}`;

  const [selecteNewPackage, setSelectdNewPackage] = useState({});

  const handleOpen = (data) => {
    setSelectdNewPackage(data);
    setOpen(true);
  };

  const paymentmodal = (sortOrder) => {
    console.log(
      "selecteNewPackage.purchase_price",
      selecteNewPackage.purchase_price
    );
    if (selecteNewPackage) {
      const merchantRefNum = RandomRefNum(`spinsaga_${loginData?.idUser}`);
      SkrillAdd(
        selecteNewPackage.purchase_price,
        merchantRefNum,
        selecteNewPackage
      );
    }
  };

  const submitPackageData = async () => {
    const merchantRefNum = RandomRefNum(`spinsaga_${loginData?.idUser}`);
    let payload = {
      merchantRefNum: merchantRefNum, // loginData?.sessionId,
      packageId: selecteNewPackage.id,
      usersession: loginData?.sessionId,
    };
    try {
      dispatch(setLoading(true));
      let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.ADD_PAYMENT_METHOD}`;
      const packageResult = await addBetData(url, payload);
      // console.log("packageResult", packageResult?.data?.status);
      dispatch(setLoading(false));
      if (packageResult?.data?.status) {
        setOpen(false);
        setStripeOpen(true);
      } else {
        setOpen(false);
        setStripeOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectdNewPackage({});
  };
  const stripeClose = () => {
    setStripeOpen(false);
  };

  const SkrillAdd = async (depositamount, referenceNo, selectedPackage) => {
    let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.SKRILL_ADD}`;
    dispatch(setLoading(true));
    let data = {
      id_skrill_wallet_transaction: 0,
      merchantRefNum: referenceNo,
      id_user: loginData?.idUser,
      amount: Number((depositamount * 100).toFixed(2)),
      currencyCode: "USD",
      paymentHandleToken: "",
      pay_from_email: "",
      bonus_amount: selectedPackage.bonus_amount,
      package_amount: selectedPackage.package_amount,
      packagename: selectedPackage.package_name,
      packageId: selectedPackage.id,
    };
    try {
      let response = await addBetData(url, data);
      if (response?.data?.status == "success") {
        setOpen(false);
        // skrill modal script
        window.paysafe.checkout.setup(
          API_KEY_MERCHANT_TEST,
          {
            currency: "USD", // 4 currencies currently supported by Paysafe Checkout - "USD", "CAD", "EUR", "GBP"
            // amount: depositamount * 100, // This qualifies as USD $ 100.00. Multiply Payment Amount by 100 and supply here.
            amount: Number((depositamount * 100).toFixed(2)), // This qualifies as USD $ 100.00. Multiply Payment Amount by 100 and supply here.
            payout: false, // payout: true --> for Withdrawal (standalone credits); payout: false --> for Payments/Deposit
            payoutConfig: {
              // payoutConfig section required only when payout: true [for Withdrawal cases].
              maximumAmount: 100000000,
            },
            locale: "en_US",
            simulator: "EXTERNAL",
            imageUrl:
              "https://hosted.paysafe.com/checkout/resource/demo-store/images/logo.png", // Supply Your Logo URL here.
            environment: API_ENV, // environment: "LIVE" --> Production, "TEST" --> test environment for customers to try out Checkout & its features
            buttonColor: "#66cc99", // feel free to change the color of buttons (RGB value)
            companyName: "Bettdraft", // Supply Your Company Name here
            holderName: "John Smith", // Supply Customer's Name here
            customer: {
              firstName: loginData?.name,
              lastName: loginData?.surname,
              email: loginData?.email,
              phone: loginData?.mobile,
              dateofBirth: loginData?.birthDate,
            },
            billingAddress: {
              // Supply customer's billing Address here.
              nickName: loginData?.name,
              street: loginData?.address,
              city: loginData?.town,
              zip: loginData?.zipCode,
              country: loginData?.country,
              state: loginData?.stateCode,
            },
            merchantRefNum: referenceNo, // Will be unique and must keep changing every transaction
            canEditAmount: false, // Makes the payment amount editable on Checkout screen. Make it false to open Checkout with a fixed non-editable amount.
            merchantDescriptor: {
              dynamicDescriptor: "XYZ",
              phone: "1234567890",
            },
            displayPaymentMethods: [
              "neteller",
              "skrill",
              "paysafecard",
              "paysafecash",
              "instantach",
              "paypal",
              "card",
              "vippreferred",
              "sightline",
              "ach",
              "eft",
            ],
            // displayPaymentMethods : Array serves two purposes. You can use it to restrict the payment methods that a customer can see.
            // You can also use it to order the payment methods based on your preference.
            // If this field is present, the customer will only see those payment methods in the order specified, hence,
            // Ensure that you provide all payment methods if you are using it only for the purpose of payment method ordering.
            paymentMethodDetails: {
              // Please read the Checkout Objects Documentation on developer.paysafe.com .....
              paysafecard: {
                // .... for details on paymentMethodDetails (including all supported mandatory and optional fields)
                consumerId: "123456",
              },
              paysafecash: {
                consumerId: "123456",
              },
              sightline: {
                consumerId: "12341231256",
                SSN: "123456789",
                last4ssn: "6789",
                //accountId: "1009688222"  // Supply Account ID only if multiple accounts are configured with same payment method
              },
              vippreferred: {
                consumerId: "120288765",
                //accountId: "1679688456"  // Supply Account ID only if multiple accounts are configured with same payment method
              },
              card: {
                accountId: "284006353",
                // Supply Account ID only if multiple accounts are configured with same payment method
              },
              skrill: {
                consumerId: loginData?.email,
                emailSubject: "Payout for Greg Neteller",
                emailMessage: "You Have Received Payout of $100.",
              },
              instantach: {
                consumerId: "john.doe@email.com",
                paymentId: "3aeb9c63-6386-46a3-9f8e-f452e722228a",
                emailSubject: "Instant ACH Payout",
                emailMessage:
                  "Your Instant ACH Payout request has been processed",
              },
              neteller: {
                consumerId: "netellertest_EUR@neteller.com",
                recipientDescription: "logo_url_alt_text",
                logoUrl: "http://www.paysafe.com/icon.jpg",
              },
            },
            // threeDs: {
            //   merchantUrl: "https://demostore.com/merchantUrl",
            //   deviceChannel: "BROWSER",
            //   messageCategory: "PAYMENT",
            //   transactionIntent: "GOODS_OR_SERVICE_PURCHASE",
            //   authenticationPurpose: "PAYMENT_TRANSACTION",
            // },
            threeDs: {
              //Required for 3DS2
              authenticationPurpose: "PAYMENT_TRANSACTION",
              deviceChannel: "BROWSER",
              merchantUrl:
                "https://api.qa.paysafe.com/checkout/v2/index.html#/desktop",
              messageCategory: "PAYMENT",
            },

            // returnLinks: [
            //   {
            //     rel: "default",
            //     // href: "https://159.65.219.202:5000?pay=12",
            //     href: `${PaymentEndpoints.apiBaseUrl}?pay=12`,
            //     method: "GET",
            //   },
            //   {
            //     rel: "on_completed",
            //     // href: "https://159.65.219.202:5000?pay=12",
            //     href: `${PaymentEndpoints.apiBaseUrl}?pay=12`,
            //     method: "GET",
            //   },
            // ],
          },
          function (instance, error, result) {
            if (result && result.paymentHandleToken) {
              dispatch(setLoading(false));
              instance.close();
              SkrillPay(
                result?.amount,
                referenceNo,
                result?.paymentHandleToken,
                selectedPackage
              );
            } else if (result.paymentHandleToken == null) {
              SkrillFailed(depositamount, referenceNo);
              dispatch(setLoading(false));
              instance.close();
            } else {
              // alert(error);
              console.log("error");
              showErrorSnackbar(error);
              dispatch(setLoading(false));
            }
            if (result.token) {
              //alert(""Payment Token (Returned By Paysafe GW): "" + result.token);
              console.log(result.token);
              // pass this token to server to make the payment or payout using Paysafe Payments API.
            }
          },
          function (stage, expired) {
            dispatch(setLoading(false));
            switch (stage) {
              case "PAYMENT_HANDLE_NOT_CREATED": // Handle the scenario
              case "PAYMENT_HANDLE_CREATED": // Handle the scenario
              case "PAYMENT_HANDLE_REDIRECT": // Handle the scenario
              case "PAYMENT_HANDLE_PAYABLE": // Handle the scenario
              default: // Handle the scenario
            }
          },
          function (instance, amount, paymentMethod) {
            dispatch(setLoading(false));
            // use parameters amount and payment method to do riskCheck
            // Applicable to only Cards, PaySafe Cash, VIPP and Sightline
            if (amount == 2000) {
              instance.decline("Please use amount less than 100");
              // showErrorSnackbar("Please use amount less than 100");
            } else {
              instance.accept();
            }
          }
        );
      } else {
        showErrorSnackbar(response.data.message);
        dispatch(setLoading(false));
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
      showErrorSnackbar(
        "Issue connecting to server (error code 15). Please contact support for further assistance."
      );
    }
  };

  const SkrillPay = async (
    depositamount,
    referenceNo,
    tokenId,
    selectedPackage
  ) => {
    //  let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.SKRILL_WALLET}`;
    let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.DEPOSIT_PAYMENT}`;
    dispatch(setLoading(true));
    let data = {
      merchantRefNum: referenceNo,
      amount: depositamount,
      id_user: loginData?.idUser,
      accountId: "284006353",
      paymentHandleToken: tokenId,
      currencyCode: "USD",
      settleWithAuth: true,
      bonus_amount: selectedPackage?.bonus_amount,
      package_amount: selectedPackage?.package_amount,
      packagename: selectedPackage?.package_name,
      pakageId: selectedPackage?.id,
    };
    try {
      // loaderCoin = true;
      dispatch(setLoading(true));
      let response = await addBetData(url, data);
      // loaderCoin = false;
      if (response?.data?.status == "success") {
        showSuccessSnackbar(response?.data?.message);
        GetUserById();
        getCoinPackageList();
      } else {
        showErrorSnackbar(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      showErrorSnackbar(
        "Issue connecting to server (error code 15). Please contact support for further assistance."
      );
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const RandomRefNum = (prefix) => {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return `${prefix}_${randomNum}`;
  };

  const SkrillFailed = async (depositamount, referenceNo) => {
    let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.FAILED_DEPOSIT}`;
    dispatch(setLoading(true));
    let data = {
      merchantRefNum: referenceNo,
      amount: depositamount,
      id_user: loginData?.idUser,
      accountid: "string",
      paymentHandleToken: "string",
      currencyCode: "string",
      settleWithAuth: "string",
      status: "string",
      description: "string",
      tstatus: 0,
    };
    try {
      dispatch(setLoading(true));
      let response = await addBetData(url, data);
      if (response?.data?.status == "success") {
        showSuccessSnackbar(response?.data?.message);
        GetUserById();
        getCoinPackageList();
      } else if (response?.data?.status == "failure") {
        showErrorSnackbar(response?.data?.message);
      } else {
        showErrorSnackbar(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      showErrorSnackbar(
        "Issue connecting to server (error code 15). Please contact support for further assistance."
      );
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    width: isMobile ? "100%" : 400,
    bgcolor: theme.palette.custom.white,
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: 24,
    p: 1,
  };

  const messages = [
    {
      text: "Bag the Luxury You Deserve! 💼 Ready to treat yourself? Deposit today for your chance to win a luxury Chanel bag! A limited number of bags are up for grabs. Act fast — your perfect style could be just a deposit away.",
    },
    {
      text: "Unlock Exclusive Rewards 🎁 Deposit today, earn the rewards! Reach new levels and unlock premium prizes, including a luxury cruise and designer handbags. What are you waiting for? Start climbing the tiers today!",
    },
    {
      text: "Refer a Friend and Get Rewarded! Refer a friend and get rewarded with a luxury cruise or Chanel bag! When they deposit, you both could win big. Start referring now and let the luxury flow!",
    },
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  //   }, 10000); // 10 seconds

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, [messages?.length]);

  return (
    <>
      <Helmet>
        <title>{t('buyCoins.pageTitle')}</title>
        <meta name="description" content={t('buyCoins.metaDescription')} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/buy-coins/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/buy-coins/" />
        <meta property="og:title" content={t('buyCoins.pageTitle')} />
        <meta property="og:description" content={t('buyCoins.metaDescription')} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('buyCoins.pageTitle')} />
        <meta name="twitter:description" content={t('buyCoins.metaDescription')} />
        <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
      </Helmet>
      {/* <div className="highlighted-header" >
        <strong>{messages[currentIndex].text}</strong>
        </div> */}

      <main className="inner-body inner_space">
        <StripeModal
          open={stripeOpen}
          onClose={stripeClose}
          selecteNewPackage={selecteNewPackage}
          // websiteEnv={websiteEnv}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          id="modal_purchase"
        >
          <Box sx={style}>
            <Typography
              sx={{ color: theme.palette.custom.black_black }}
              id="modal-modal-title "
              variant="h6"
              component="h2"
              textAlign="center"
            >
              Please confirm your purchase
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box display="flex" justifyContent="space-evenly">
                <Grid
                  md={6}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <img src={bonuscashImg} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.custom.black_black,
                      textAlign: "center",
                    }}
                    fontWeight="bold"
                  >
                    {selecteNewPackage.bonus_amount}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.custom.black_black }}
                    fontWeight="bold"
                  >
                    BONUS
                  </Typography>
                </Grid>
                <Grid
                  md={6}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{ marginTop: "7px" }}
                >
                  <img src={realcashImg} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.custom.black_black,
                      textAlign: "center",
                    }}
                    fontWeight="bold"
                  >
                    {selecteNewPackage.package_amount}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.custom.black_black }}
                    fontWeight="bold"
                  >
                    FREE CASH
                  </Typography>
                </Grid>
              </Box>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  size="medium"
                  sx={{
                    background: theme.palette.custom.red_gradient,
                    color: theme.palette.custom.white,
                    marginTop: "20px",
                    textTransform: "capitalize",
                  }}
                  onClick={() => paymentmodal(buyorder)}
                >
                  Pay with Skrill ${selecteNewPackage.purchase_price}
                </Button>
                {/* {websiteEnv == "stage" || websiteEnv == "local" ? ( */}
                <Button
                  size="medium"
                  sx={{
                    background: theme.palette.custom.red_gradient,
                    color: theme.palette.custom.white,
                    marginTop: "20px",
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    submitPackageData();
                  }}
                >
                  Pay with Card ${selecteNewPackage.purchase_price}
                </Button>
                {/* ) : null} */}
              </div>
              {/* <Typography
                variant="body2"
                textAlign="center"
                sx={{
                  color: theme.palette.custom.black_black,
                  marginTop: "10px",
                }}
              >
                Payments processed by <img src={skrill} />
              </Typography> */}
              <Typography
                sx={{
                  color: theme.palette.custom.black_black,
                  marginTop: "10px",
                }}
                variant="body2"
                textAlign="center"
              >
                Bonus Cash purchases are final and purchases are subject
              </Typography>
              <Typography
                sx={{ color: theme.palette.custom.black_black }}
                variant="body2"
                textAlign="center"
              >
                to our{" "}
                <u
                  onClick={() => {
                    navigate("/terms-conditions");
                  }}
                >
                  terms and conditions.
                </u>
              </Typography>
            </Typography>
          </Box>
        </Modal>
        <Grid container spacing={5}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={12}>
              <Card className="big-img radius-none">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={img4}
                    alt={card.title}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className="icon_heading mt-5">
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

        <Grid className="buy_row" container spacing={{ xs: 5, sm: 4, md: 2 }}>
          {mainItems?.map((item, index) => {
            if (item.isPopular == 1) {
              return (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    className="c_card "
                    sx={{
                      background: theme.palette.custom.l_black,
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

                    <div className="half_flex">
                      <div className="left_half">
                        <Typography
                          className="f18 f-bold"
                          sx={{ color: theme.palette.custom.white_gray }}
                        >
                          {/* {item.package_amount} Real Cash */}
                          {item.bonus_amount} GC
                        </Typography>
                        <Button
                          className="red_btn"
                          size="small"
                          sx={{
                            background: theme.palette.custom.red_gradient,
                            color: theme.palette.custom.white,
                          }}
                        >
                          {/* +{item.bonus_amount} Free GC */}+{item.package_amount}{" "}
                          Free Bonus
                        </Button>
                        <Button
                          className="red_btn"
                          size="small"
                          sx={{
                            background: theme.palette.custom.red_gradient,
                            color: theme.palette.custom.white,
                          }}
                        >
                          Daily Transfer Limit :{" "}
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
                            background: theme.palette.custom.greenbtn,
                            color: theme.palette.custom.white,
                          }}
                          disabled={item?.isDisabled}
                          onClick={() => {
                            handleOpen(item);
                            // handleFeatureButton(item?.menu_sort_order);
                          }}
                        >
                          BUY FOR <br /> ${item.purchase_price}
                        </Button>
                      </div>
                      <div className="right_half">
                        <CardMedia
                          component="img"
                          height="100%"
                          image={img5}
                          alt={cards1[0]?.title}
                        />
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

        <div className="icon_heading mt-5">
          <Typography sx={{ color: theme.palette.custom.white_gray }}>
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

        <Grid className="buy_row" container spacing={{ xs: 3, sm: 4, md: 5 }}>
          {mainItems?.map((item, index) => {
            if (item.isPopular == 1) {
              return null;
            } else {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    className="c_card"
                    sx={{
                      background: theme.palette.custom.l_black,
                      borderColor: theme.palette.custom.btn_border,
                    }}
                  >
                    <div className="half_flex">
                      <div className="left_half">
                        <Typography
                          className="f18 f-bold"
                          sx={{ color: theme.palette.custom.white_gray }}
                        >
                          {/* {item?.package_amount} Real Cash */}
                          {item?.bonus_amount} GC
                        </Typography>

                        <Button
                          className="red_btn"
                          size="small"
                          sx={{
                            background: theme.palette.custom.red_gradient,
                            color: theme.palette.custom.white,
                          }}
                        >
                          {/* +{item?.bonus_amount} Free GC */}+{item?.package_amount}{" "}
                          Free Bonus
                        </Button>

                        <Button
                          className="red_btn"
                          size="small"
                          sx={{
                            background: theme.palette.custom.red_gradient,
                            color: theme.palette.custom.white,
                          }}
                        >
                          Daily Transfer Limit :{" "}
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
                            background: theme.palette.custom.greenbtn,
                            color: theme.palette.custom.white,
                          }}
                          disabled={item?.isDisabled}
                          onClick={() => {
                            handleOpen(item);
                            // handleMainButton(item?.menu_sort_order);
                          }}
                        >
                          BUY FOR <br /> ${item.purchase_price}
                        </Button>
                      </div>
                      <div className="right_half">
                        <CardMedia
                          component="img"
                          height="100%"
                          image={
                            item?.menu_sort_order == "Main 1"
                              ? img7
                              : item?.menu_sort_order == "Main 2"
                              ? img5
                              : img8
                          }
                          alt={cards1[0]?.title}
                        />
                      </div>
                    </div>
                  </Card>
                </Grid>
              );
            }
          })}
        </Grid>

        <Grid className="buy_footer" container spacing={5}>
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

export default BuyCoins;
