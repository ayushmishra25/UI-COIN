import { Redeem } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import gift from "../../images/main3.png";
import realcashImg from "../../images/Sagacoin.png";
import { useTheme } from "@emotion/react";
import { endPoints } from "../../constant/Environment";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { addData, getAllData } from "../../Utility/API";
import { isMobile } from "react-device-detect";
import byuborder from "../../images/border.png";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { Helmet } from "react-helmet";

const GiftCard = () => {
  const { t } = useTranslation();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [giftList, setGiftList] = useState([]);
  const [open, setOpen] = useState(false);
  const [alldata, setAlldata] = useState([]);
  const theme = useTheme();
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();
  const [openConfirm, setOpenConfirm] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 500, // Responsive width
    bgcolor: theme.palette.custom.white,
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: 24,
    p: 1,
  };

  const handleOpen = (data) => {
    setOpen(true);
    setAlldata(data);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getExchangeList();
  }, []);

  const getExchangeList = async (list) => {
    let url = `${endPoints.api.GET_EXCHANGE}/${loginData?.idUser}`;
    dispatch(setLoading(true));

    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.status === "success") {
          if (response?.data?.length > 0) {
            setGiftList(response?.data);
          }
        } else {
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  const RedeemGift = async (giftvalues) => {
    dispatch(setLoading(true));
    setOpen(false);
    try {
      const data = {
        gift_id: giftvalues.id,
        user_id: loginData?.idUser || null,
        gift_title: giftvalues.gift_title,
        package_price: giftvalues.package_price,
        startdate: giftvalues.startdate,
        starttime: giftvalues.starttime,
        enddate: giftvalues.enddate,
        endtime: giftvalues.endtime,
        status: giftvalues.isactive,
        id: giftvalues.id,
      };
      const url = `${endPoints.api.BUY_GIFT}`;
      const response = await addData(url, data);
      if (response?.data?.status == "success") {
        console.log("srar", response);
        dispatch(setLoading(false));
        // showSuccessSnackbar(response?.data?.message);
        setOpenConfirm(true);
        setOpen(false);
        GetUserById();
      } else {
        showErrorSnackbar(response?.data?.message);
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      showErrorSnackbar(
        "An error occurred while processing your request. Please try again later."
      );
    }
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

  return (
    <>
          <Helmet>
            <title>Gift Cards - Spinsaga Casino</title>
            <meta name="description" content="Send and receive Spinsaga Casino gift cards for special occasions." />
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
    <section className="inner_space table_design">
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
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            {t("giftCard.confirmPurchase")}
          </Typography>
          <Box
            display={isMobile ? "" : "flex"}
            justifyContent={isMobile ? "" : "space-evenly"}
          >
            <Grid md="6" xs="12" sm="12" sx={{ padding: 2 }}>
              <img
                style={{
                  height: isMobile ? 95 : 134,
                  width: isMobile ? "100%" : 212,
                }}
                src={alldata?.creative?.includes("https:")  ?  alldata?.creative : `${endPoints.imageCDN}${alldata?.creative}`}
              />
            </Grid>
            <Grid md="6" xs="12" sm="12" sx={{ padding: 2 }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.custom.black_light }}
                fontWeight="bold"
                textAlign="center"
              >
                {alldata?.gift_title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.custom.black_light }}
                textAlign="center"
                fontWeight="bold"
              >
                ${alldata?.package_price} {""}Value
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: "20px" }}
              >
                <img
                  style={{ width: 24, marginRight: "8px", marginTop: "5px" }}
                  src={realcashImg}
                  alt="Real Cash"
                />
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.custom.black_light }}
                  fontWeight="bold"
                >
                  {alldata?.package_price}
                </Typography>
              </Box>
            </Grid>
          </Box>
          <Grid>
            <img src={byuborder} />
          </Grid>
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
                  RedeemGift(alldata);
                }}
              >
                {t("giftCard.redeemNow")}
              </Button>
            </Box>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                color: theme.palette.custom.black_light,
                marginTop: "10px",
              }}
            >
              {alldata?.terms_condition}
            </Typography>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openConfirm}
        // onClose={()=>setOpenConfirm(false)}
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
            {t("giftCard.purchaseProcessed")}
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{
              color: theme.palette.custom.black_light,
              marginTop: "10px",
              fontSize: "18px",
            }}
          >
            {t("giftCard.purchaseMessage")}
          </Typography>
          <Typography
            id="modal-modal-description"
            display="flex"
            justifyContent="space-evenly"
          >
            <Box>
              <Button
                size="large"
                sx={{
                  background: theme.palette.custom.red_gradient,
                  color: theme.palette.custom.white,
                  marginTop: "20px",
                  textTransform: "capitalize",
                }}
                onClick={() => setOpenConfirm(false)}
              >
                {t("giftCard.close")}
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>

      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h4" component="h2" gutterBottom>
            {t("giftCard.title")}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.custom.golden_yellow }}
          >
            {t("giftCard.description")}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <Typography sx={{ color: theme.palette.custom.golden_yellow }}>
                {t("giftCard.scBalance")}
              </Typography>
              <img
                src={realcashImg}
                alt="Real Cash"
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />{" "}
              <Typography
                sx={{ marginRight: "4px", color: theme.palette.custom.white }}
              >
                {loginData?.account?.balance}
                {console.log(
                  "loginData?.account?.balance",
                  loginData?.account?.balance
                )}
              </Typography>
            </Box>
          </Typography>
        </Grid>
        {giftList.length > 0 &&
          giftList.map((item) => {
            return (
              <Grid item md="3" xs="6" key={item?.id}>
                <Card
                  sx={{
                    maxWidth: 280,
                    padding: "5px",
                    height: isMobile ? 260 : 292,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ padding: "10px" }}>
                    <CardMedia
                      sx={{
                        height: isMobile ? 95 : 134,
                      }}
                      image={item?.creative?.includes("https:")  ?  item?.creative : `${endPoints.imageCDN}${item?.creative}`}
                      title={gift?.title}
                    />
                  </Box>
                  <CardContent sx={{ padding: "0px" }}>
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{ color: theme.palette.custom.white }}
                      textAlign="center"
                    >
                      {item?.gift_title?.length > 45
                        ? `${item.gift_title.substring(0, 42)}...`
                        : item.gift_title}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      sx={{ color: theme.palette.custom.white }}
                    >
                      ${item?.sagacoin_price} Value
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingBottom: "5px",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <img
                        src={realcashImg}
                        alt="coins"
                        style={{ width: 20, height: 20 }}
                      />
                      <Typography variant="body2" sx={{ marginLeft: "3px" }}>
                        {item?.sagacoin_price}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        background: theme.palette.custom.redblue_border,
                        color: theme.palette.custom.white,
                        display: "flex",
                        justifyContent: "end",
                      }}
                      size="small"
                      disabled={
                        loginData?.account.balance < 25 ||
                        item?.sagacoin_price > loginData?.account.balance
                      }
                      onClick={() => {
                        handleOpen(item);
                      }}
                    >
                      {t("giftCard.redeem")}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      
      {/* {parseInt(loginData?.account?.balance)  < 99 && (
        <div className="highlighted-header" style={{ marginTop: "20px" }}>
          <strong>
            To view redeem offers, you need a minimum of 100 Redeemable Saga
            Coins.
          </strong>
        </div>
      )} */}

    </section>
    </>
  );
};

export default GiftCard;
