import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ImageWithShimmer from "../../component/ImageWithShimmer";
import { endPoints, PaymentEndpoints } from "../../constant/Environment";
import volt from "../../images/Lightning.svg";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Avatar,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { useDispatch, useSelector } from "react-redux";
import { addBetData, addData } from "../../Utility/API";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import CustomizedSwitches from "./CustomSwitch";
import { setShowSearchList } from "../../redux/Reducers/sidebarReducer/sidebarSlice";
import { FaTimes } from "react-icons/fa";
import { isMobile } from "react-device-detect";

const GameModal = (props) => {
  const { selectedGame, openGameModal, onModalClose } = props;
  const { game_name, game_creative, ext_url, game_id, provider } = selectedGame;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isRealCash, setIsRealCash] = useState(false);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const [isLoading, setIsLoading] = useState(false);
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClose = () => {
    onModalClose();
  };
  const playGame = async () => {
    let totalAmount = IsLoginData?.account?.balance || 0;
    if (totalAmount <= 0) {
      const errorMessage = t('gameModal.notEnoughBalance');
      showErrorSnackbar(errorMessage);
      return;
    }
    setIsLoading(true);
    dispatch(setShowSearchList(false));
    let url = `${endPoints.api.CASINO_PLAY}`;
    let payload = {
      user_id: IsLoginData?.idUser,
      gameid: game_id,
      channel: "string",
      partnerid: "string",
      ticket: IsLoginData?.sessionId,
      customerid: "string",
      countrycode: "string",
      cashiertoken: "string",
      customercurrency: "string",
      playingWithCoin: 2,
      balance: 0,
      jurisdiction: "string",
      gamesessionid: "string",
      gameref: "string",
      txid: "string",
      remotetxid: "string",
      amount: 0,
      txtype: "string",
      ended: "string",
      created_on: "",
      id: 0,
    };
    dispatch(setLoading(true));
    await addData(url, payload)
      .then(async (response) => {
        dispatch(setLoading(false));
        setIsLoading(false);
        if (response?.data?.status === "success") {
          onModalClose();
          let finalLaunchUrl = null;
          if (provider == "Iconic") {
            finalLaunchUrl = await fetchLivegameUrl(
              game_id,
              IsLoginData.sessionId
            );
          }
          else if(provider == "Bgaming"){
             finalLaunchUrl = await fetchBgGameUrl(
              game_id,
              IsLoginData.sessionId
            );
          }
          navigate("/game", {
            state: { gameId: game_id, GameProvider: provider,launchUrl: finalLaunchUrl },
          });
        } else {
          showErrorSnackbar(response.data.message);
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        setIsLoading(false);
        showErrorSnackbar(t('gameModal.serverError'));
        console.error(error);
      });
  };

  const fetchLivegameUrl = async (gameId, sessionId) => {
    try {
      const url = `${PaymentEndpoints?.apiBaseUrl}${PaymentEndpoints?.api.LIVE_GAME_LAUNCH}`;
      const data = {
        launchAlias: gameId,
        sessionToken: sessionId,
      };

      const response = await addBetData(url, data);

      if (response?.data?.status == "success") {
        return response?.data?.data?.launchUrl;
      } else {
        console.error("Failed to fetch live game URL");
      }
    } catch (error) {
      console.error("Error in fetchLivegameUrl:", error);
    }
  };

  const fetchBgGameUrl = async (gameId, sessionId) => {
    try {
      const url = `${PaymentEndpoints?.apiBaseUrl}${PaymentEndpoints?.api.LIVE_BG_GAMEING_LAUNCH}`;
      const data = {
        launchAlias: gameId,
        sessionToken: sessionId,
      };

      const response = await addBetData(url, data);

      if (response?.data?.status == "success") {
        return response?.data?.data?.launchUrl;
      } else {
        console.error("Failed to fetch live game URL");
      }
    } catch (error) {
      console.error("Error in fetchBgGameUrl", error);
    }
  };

  const handleSwitchChange = () => {
    setIsRealCash(!isRealCash);
  };

  const TotalScBalance = IsLoginData?.account?.balance || 0;
  
  return (
    <React.Fragment>
      <Dialog
        className="game_modal ourmodal"
        //  fullScreen={fullScreen}
        //  maxWidth ="sm"
        open={openGameModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        // style={{
        //   width: "522px",
        //   // height: "auto",
        //   // maxHeight: "90vh",
        //   // margin: "auto",
        // }}
      >
        <DialogTitle id="responsive-dialog-title">
          {game_name}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 7,
              color: "white",
            }}
          >
            <FaTimes />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid item xs={12} sm={12}>
              <Card>
                <CardActionArea
                  style={{ position: "relative", background: "none" }}
                >
                  {TotalScBalance <= 0 ? (
                    <Typography
                      style={{
                        textAlign: "center",
                        color: "#ffcc00",
                        padding: "15px",
                        fontWeight: "bolder",
                        fontSize: isMobile ? "15px" : "19px",
                      }}
                    >
                      <strong>
                        {t('gameModal.balanceDepleted')}
                      </strong>
                    </Typography>
                  ) : (
                    <CardMedia
                      component="img"
                      height="100%"
                      src={
                        ext_url
                          ? `${ext_url}`
                          : `${endPoints.imageCDN}${game_creative}`
                      }
                      // src={`${endPoints?.imageCDN}${game_creative}`}
                      alt={game_name}
                      className="game_image"
                    />
                  )}
                </CardActionArea>
              </Card>
            </Grid>
          </DialogContentText>
          {/* <DialogContentText>
            <Grid item xs={12} sm={12}>
              <Card>
                <CardActionArea style={{ position: "relative" }}>
                  <div
                    style={{
                      width: "520px",
                      height: "250px",
                      backgroundColor: "#f0f0f0",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <ImageWithShimmer
                      src={`${endPoints.apiBaseUrl}${game_creative}`}
                      alt={game_name}
                      style={{
                        width: "522px",
                        height: "252px",
                      }}
                    />
                  </div>
                </CardActionArea>
              </Card>
            </Grid>
          </DialogContentText> */}
          {/* <div className="custom_flex space_t">
            <div className="flex_half">
              <div className="info_game_modal">
                <h3>Max Multiplier</h3>
                <p>5,000x</p>
              </div>
            </div>
            <div className="flex_half">
              <div className="info_game_modal">
                <h3>Min / Max</h3>
                <p>SAGA 25/ SAGA 6000</p>
              </div>
            </div>
            <div className="flex_half">
              <div className="info_game_modal">
                <h3>Volatility</h3>
                <p>
                  <img src={volt} />
                  <img src={volt} />
                  <img src={volt} />
                  <img src={volt} />
                  <img src={volt} />
                </p>
              </div>
            </div>
            <div className="flex_half">
              <div className="info_game_modal">
                <h3>Provider</h3>
                <p>Spin Saga</p>
              </div>
            </div>
          </div> */}
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: "15px" }}
          >
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="center"
            className="space_t"
            style={{ paddingBottom: "15px" }}
          >
          </Grid>
          <Button
            className="modal_game_modal"
            onClick={playGame}
            style={{
              background: theme.palette.white_green,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} style={{ color: "white" }} />
            ) : (
              t('gameModal.playNow')
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default GameModal;
