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
  Box,
  Modal,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import icon1 from "../../images/Gift.svg";
import icon2 from "../../images/money.svg";
import SweepStakeTypography from "../../component/SweepStakeTypography";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { endPoints } from "../../constant/Environment";
import { addBetData, addData, getAllData, updateUser } from "../../Utility/API";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { isMobile } from "react-device-detect";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import CashModal from "./CashModal";
import { Helmet } from "react-helmet";
import CardModal from "./CardModal";
import LocationWarningModal from "../LocationWarningModal";
import CryptoModal from "./CryptoModal";

const Redeem = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [dense, setDense] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const { isUserInAllowedRegion } = authState;
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [cashModalOpen, setCasModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [CryptoModalopen, setCrytoModalOpen] = useState(false);
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();
  const [locationModal, setLocationModal] = useState(false); // location modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenEmail = () => {
    setOpenEmail(true);
  };
  const handleClose = () => setOpen(false);

  const handleCloseEmail = () => setOpenEmail(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 500,
    bgcolor: theme.palette.custom.white,
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: 24,
    p: 1,
  };

  const UpdateUserDetail = async () => {
    let data = {
      idUser: loginData?.idUser,
      login: loginData?.login,
      name: loginData?.name,
      surname: loginData?.surname,
      email: loginData?.email,
      birthDate: loginData?.birthDate,
      nation: loginData?.nation,
      country: loginData?.country,
      town: loginData?.town,
      address: loginData?.address,
      mobile: loginData?.mobile,
      zipCode: loginData?.zipCode,
    };

    let url = `${endPoints.api.UPDATE_PERSONAL}`;
    dispatch(setLoading(true));
    setOpen(false);

    try {
      const response = await updateUser(url, data);
      dispatch(setLoading(false));
      if (response?.status == "success") {
        showSuccessSnackbar(response?.message);
      } else if (response?.status == "kycfailed") {
        navigate("/kyc-check");
      } else {
        showErrorSnackbar(response?.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      showErrorSnackbar("An error occurred while updating your information.");
    }
  };

  const UpdateEmailVerification = async () => {
    let data = {
      idUser: loginData.idUser,
      login: loginData.login,
    };
    dispatch(setLoading(true));
    setOpenEmail(false);
    let url = `${endPoints.api.resendMail}`;
    try {
      const response = await addData(url, data);
      dispatch(setLoading(false));
      if (response?.data?.status == "success") {
        showSuccessSnackbar(response.data.message);
        console.log(response);
      } else {
        showErrorSnackbar(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
    }
  };

  const handleVerification = () => {
    if (isUserInAllowedRegion) {
      setLocationModal(true);
      return;
    }
    if (loginData?.verification == "0") {
      handleOpenEmail();
    } else if (loginData?.validation !== "1") {
      handleOpen();
    } else {
      navigate("/gift-card");
    }
  };

  const handleCashVerification = () => {
    if (isUserInAllowedRegion) {
      setLocationModal(true);
      return;
    }
    if (loginData?.verification == "0") {
      handleOpenEmail();
    } else if (loginData?.validation !== "1") {
      handleOpen();
    } else {
      // navigate("/gift-card");
      setCasModalOpen(true);
    }
  };

  const handleCardVerification = () => {
    if (isUserInAllowedRegion) {
      setLocationModal(true);
      return;
    }
    if (loginData?.verification == "0") {
      handleOpenEmail();
    } else if (loginData?.validation !== "1") {
      handleOpen();
    } else {
      setCardModalOpen(true);
    }

    //  setCardModalOpen(true);
  };

   const handleCryptoVerification = () => {
    if (isUserInAllowedRegion) {
      setLocationModal(true);
      return;
    }
    if (loginData?.verification == "0") {
      handleOpenEmail();
    } 
    // else if (loginData?.validation !== "1") {
    //   handleOpen();
    // } 
    else {
      setCrytoModalOpen(true);
    }

    //  setCardModalOpen(true);
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

  useEffect(() => {
    GetUserById();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('redeem.pageTitle')}</title>
        <meta name="description" content={t('redeem.metaDescription')} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ color: theme.palette.custom.black_light }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            {t('redeem.completeVerification')}
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{
              color: theme.palette.custom.black_light,
              marginTop: "10px",
            }}
          >
            To redeem your gift card, please verify your profile. You can also
            start verification anytime by clicking “Verify Profile” in the
            Profile section
          </Typography>
          {/* <Box display="flex" justifyContent="space-evenly">

          </Box> */}
          <Typography id="modal-modal-description">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                size="large"
                sx={{
                  background: theme.palette.custom.red_gradient,
                  color: theme.palette.custom.white,
                  marginTop: "20px",
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  UpdateUserDetail();
                }}
              >
                {t('redeem.verifyProfile')}
              </Button>
              {/* <Button
                size="large"
                sx={{
                  background: theme.palette.custom.red_gradient,
                  color: theme.palette.custom.white,
                  marginTop: "20px",
                  textTransform: "capitalize",
                }}
                onClick={()=>{handleClose()}}
              >
                Close
              </Button> */}
            </Box>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openEmail}
        onClose={handleCloseEmail}
        aria-labelledby="email-verification-title"
        aria-describedby="email-verification-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ color: theme.palette.custom.black_light }}
            id="email-verification-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            {t('redeem.completeEmailVerification')}
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{
              color: theme.palette.custom.black_light,
              marginTop: "10px",
              padding: isMobile ? "20px" : "0px",
            }}
          >
            {t('redeem.verifyEmailText')}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              sx={{
                background: theme.palette.custom.red_gradient,
                color: theme.palette.custom.white,
                marginTop: "20px",
                textTransform: "capitalize",
              }}
              onClick={() => {
                UpdateEmailVerification();
              }}
            >
              {t('redeem.verifyEmail')}
            </Button>
          </Box>
        </Box>
      </Modal>

      {locationModal && (
        <LocationWarningModal
          open={locationModal}
          onClose={() => {
            setLocationModal(false);
          }}
        />
      )}

      <CashModal
        open={cashModalOpen}
        onClose={() => {
          setCasModalOpen(false);
        }}
      />
      <CardModal
        open={cardModalOpen}
        onClose={() => {
          setCardModalOpen(false);
        }}
      />

      <CryptoModal
        open={CryptoModalopen}
        onClose={() => {
          setCrytoModalOpen(false);
        }}/>

      <main className="inner-body top_space b_space redeem_main">
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={12}>
            <Card
              className="redeem_card"
              sx={{
                background: theme.palette.custom.l_black2,
              }}
            >
              <Typography
                className="heading-p"
                sx={{ color: theme.palette.custom.white_gray }}
              >
                {t('redeem.redeemCoins')}
              </Typography>
              <Typography sx={{ color: theme.palette.custom.white_gray }}>
                {t('redeem.redeemDescription')}
              </Typography>
              <Typography sx={{ color: theme.palette.custom.white_gray }}>
                {t('redeem.coinRate')}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.custom.white_gray }}
                fontWeight="bold"
              >
                {t('redeem.scRate')}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.custom.white_gray }}
                fontWeight="bold"
              >
                {/* 50,000 GC = 1.00 SC */}
                {t('redeem.gcRate')}
              </Typography>
              {/* <Typography className="heading-h2" sx={{ color: theme.palette.custom.white_gray }}>
                Redeem coins
              </Typography> */}
              {/* <Typography
                sx={{ color: theme.palette.custom.white_gray, mt: "5px" }}
              >
                Total balance: {loginData?.account?.balance} GC
              </Typography> */}
              <Typography
                className="mt-5"
                sx={{ color: theme.palette.custom.green1 }}
              >
                {t('redeem.redeemableBalance')}{" "}
                {loginData && loginData?.account?.balance !== undefined
                  ? parseFloat(loginData?.account?.balance || 0).toFixed(2)
                  : 0}{" "}
                SC
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={5} justifyContent="center">
          <Grid
            container
            spacing={{ xs: 2, sm: 4, md: 5 }}
            className="space_4"
            justifyContent="center"
            item
            xs={12}
            md={8}
          >

            {/* gift card redeem */}
            {/* <Grid item xs={6} md={4}>
              <Card
                className="gift_card"
                sx={{
                  background: theme.palette.custom.l_black2,
                }}
              >
                <Typography
                  className="color_body"
                  variant="body2"
                  sx={{ background: theme.palette.background.red }}
                >
                  <Typography
                    className="gift_img"
                    sx={{ borderColor: theme.palette.custom.white }}
                  >
                    <img src={icon1} alt="img" />
                  </Typography>
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h5">
                    GIFT CARDS
                  </Typography>
                  <Button
                    className="red_btn"
                    size="small"
                    sx={{
                      background: theme.palette.custom.greenbtn,
                      color: theme.palette.custom.white,
                    }}
                    onClick={handleVerification}
                  >
                    REDEEM GIFT CARDS
                  </Button>
                  <Typography
                    className="mt-5"
                    sx={{ color: theme.palette.custom.green1 }}
                  >
                    Redeemable balance:{" "}
                    {loginData && loginData?.account?.balance !== undefined
                      ? parseFloat(loginData?.account?.balance || 0).toFixed(2)
                      : 0}{" "}
                    SC
                  </Typography>
                </CardContent>
              </Card>
            </Grid> */}

            {/* cash redeem */} 
            {/* <Grid item xs={6} md={4}>
              <Card
                className="gift_card"
                sx={{
                  background: theme.palette.custom.l_black2,
                }}
              >
                <Typography
                  className="color_body"
                  variant="body2"
                  sx={{ background: theme.palette.custom.blue }}
                >
                  <Typography
                    className="gift_img"
                    sx={{ borderColor: theme.palette.custom.white }}
                  >
                    <img src={icon2} alt="img" />
                  </Typography>
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h5">
                    CASH PRIZE
                  </Typography>
                  <Button
                    className="red_btn"
                    size="small"
                    sx={{
                      background: theme.palette.custom.greenbtn,
                      color: theme.palette.custom.white,
                    }}
                    onClick={handleCashVerification}
                  >
                    REDEEM Cash
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.custom.white_gray }}
                    fontWeight="bold"
                  >
                    Redeemable balance:{" "}
                    {loginData && loginData?.account?.balance !== undefined
                      ? parseFloat(loginData?.account?.balance || 0).toFixed(2)
                      : 0}{" "}
                    SC
                  </Typography>
                </CardContent>
              </Card>
            </Grid> */}

            {/* crypto redeem */}
            <Grid item xs={6} md={4}>
              <Card
                className="gift_card"
                sx={{
                  background: theme.palette.custom.l_black2,
                }}
              >
                <Typography
                  className="color_body"
                  variant="body2"
                  sx={{ background: theme.palette.custom.blue }}
                >
                  <Typography
                    className="gift_img"
                    sx={{ borderColor: theme.palette.custom.white }}
                  >
                    <img src={icon2} alt="img" />
                  </Typography>
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h5">
                    {t('redeem.cryptoPrize')}
                  </Typography>
                  <Button
                    className="red_btn"
                    size="small"
                    sx={{
                      background: theme.palette.custom.greenbtn,
                      color: theme.palette.custom.white,
                    }}
                    onClick={handleCryptoVerification}
                    // disabled="true"
                  >
                    {t('redeem.redeemCrypto')}
                  </Button>
                  {/* <Typography className="mt-5" sx={{ color: theme.palette.custom.green1 }}>
                    Redeemable balance: 0.00 SC
                  </Typography> */}
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.custom.white_gray }}
                    fontWeight="bold"
                  >
                    {/* COMING SOON... */}
                    {t('redeem.redeemableBalance')}{" "}
                    {loginData && loginData?.account?.balance !== undefined
                      ? parseFloat(loginData?.account?.balance || 0).toFixed(2)
                      : 0}{" "}
                    SC
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* <Grid item xs={6} md={4}>
              <Card
                className="gift_card"
                sx={{
                  background: theme.palette.custom.l_black2,
                }}
              >
                <Typography
                  className="color_body"
                  variant="body2"
                  sx={{ background: theme.palette.custom.blue }}
                >
                  <Typography
                    className="gift_img"
                    sx={{ borderColor: theme.palette.custom.white }}
                  >
                    <img src={icon2} alt="img" />
                  </Typography>
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h5">
                    CARD PAYABLE
                  </Typography>
                  <Button
                    className="red_btn"
                    size="small"
                    sx={{
                      background: theme.palette.custom.greenbtn,
                      color: theme.palette.custom.white,
                    }}
                    onClick={handleCardVerification}
                  >
                    Redeem Card Payable
                  </Button>

                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.custom.white_gray }}
                    fontWeight="bold"
                  >
                    Redeemable balance:{" "}
                    {loginData && loginData?.account?.balance !== undefined
                      ? parseFloat(loginData?.account?.balance || 0).toFixed(2)
                      : 0}{" "}
                    SC
                  </Typography>
                </CardContent>
              </Card>
            </Grid> */}

            <Grid item xs={12} md={10}>
              <div className="redeem_content">
                <Typography
                  sx={{
                    color: theme.palette.custom.gray_gray,
                  }}
                  gutterBottom
                  variant="subtitle1"
                >
                  {t('redeem.processingTimeInfo')}
                </Typography>

                <Box
                  component="ul"
                  sx={{ paddingLeft: "20px", margin: 0, listStyleType: "disc" }}
                >
                  <li>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "gray", marginBottom: "8px" }}
                    >
                      {" "}
                      {t('redeem.processingTime')}
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "gray", marginBottom: "8px" }}
                    >
                      {t('redeem.skrillProcessingNote')}
                    </Typography>
                  </li>
                </Box>

                <Box
                  component="ul"
                  sx={{ paddingLeft: "20px", margin: 0, listStyleType: "disc" }}
                >
                  <li>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "gray", marginBottom: "8px" }}
                    >
                      {t('redeem.skrillTime')}
                    </Typography>
                  </li>
                  {/* <li>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "gray", marginBottom: "8px" }}
                    >
                      Trustly (if the instant banking option is not available):
                      up to 3-5 business days.
                    </Typography>
                  </li> */}
                </Box>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  sx={{
                    color: theme.palette.custom.gray_gray,
                    fontWeight: "bold",
                  }}
                >
                  {t('redeem.redemptionNote')}
                </Typography>
              </div>
            </Grid>

            <SweepStakeTypography />
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default Redeem;
