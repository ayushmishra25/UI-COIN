import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { endPoints } from "../../constant/Environment";
import { getAllData } from "../../Utility/API";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { isMobile } from "react-device-detect";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import logo from "../../../src/images/logo.png";
import { useTheme } from "@emotion/react";
import WarningModal from "./WarningModal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TestGameIframe = () => {
  const authState = useSelector((state) => state.auth);
  const globalState = useSelector((state) => state.global);
  const { loading } = globalState;
  const { IsLoginData } = authState;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isWarningModal, setIsWarningModal] = useState(false);

  // const { gameId } = location.state || {};
  const { gameId, GameProvider } = location.state || {};
  const [open, setOpen] = React.useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);
  const theme = useTheme();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    GetUserById();
    navigate("/");
  };

  const getCoins = () => {
    setOpen(false);
    GetUserById();
    navigate("/buy-coins");
  };

  const ClearGame = () => {
    navigate("/");
  };
  useEffect(() => {
    dispatch(setLoading(true));
  }, []);

  const handleIframeLoad = () => {
    dispatch(setLoading(false));
  };

  useEffect(() => {
    let interval;
    // console.log("location", location.pathname);
    if (location.pathname == "/game") {
      interval = setInterval(() => {
        GetUserById();
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [location]);

  useEffect(() => {
    let interval;
    // console.log("location", location.pathname);
    if (location.pathname == "/game") {
      interval = setInterval(() => {
        setIsWarningModal(true);
      }, 300000); // 300000  -- 5 min  60000 -- 1 min
    }

    return () => clearInterval(interval);
  }, [location]);

    // New useEffect to refresh the page every 5 minutes
    // useEffect(() => {
    //   const refreshInterval = setInterval(() => {
    //     window.location.reload();
    //   }, 300000); // 5 minutes
  
    //   return () => clearInterval(refreshInterval);
    // }, []);

  const GetUserById = async () => {
    try {
      if (IsLoginData?.idUser) {
        const url = `${endPoints.api.GET_BY_USERID}/${IsLoginData?.idUser}`;
        const response = await getAllData(url);
        dispatch(setLoginData({ user: response.data, isAuthenticated: true }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFullscreen = () => {
    const iframeElement = iframeRef.current;
    if (!document.fullscreenElement) {
      iframeElement.requestFullscreen?.();
      setIsFullscreen(true); // Set state to fullscreen
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false); // Reset state to normal screen
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const stageUrl = "https://api-stage.spinsagacasino.com:5000/";
  const prodUrl = "https://api-prod.spinsagacasino.com:5000/";

  const getWebUrl = (env, gameId, sessionId) => {
    let naviagteUrl = "";
    if (GameProvider == "Booming Games" || GameProvider == "Evoplay") {
      switch (env) {
        case stageUrl:
          naviagteUrl = `${`https://d2drhksbtcqozo.cloudfront.net/casino/launcher.html?gameid=${gameId}&moneymode=real&partner=spinsagacasino&partnerid=2331&ticket=${sessionId}&jurisdiction=IM&lang=en_sc&channel=web`}`;
          break;
        case prodUrl:
          naviagteUrl = `${`https://cf-casino-cdn-kc-eu-brussels-1-prod.relaxg.com/casino/apex/layer/?moneymode=real&gameid=${gameId}&partner=spinsagacasino&partnerid=2331&ticket=${sessionId}&jurisdiction=IM&lang=en_sc&channel=web&&apex=1&gameurl=https%3A%2F%2Fcf-casino-cdn-kc-eu-brussels-1-prod.relaxg.com%2Fcasino%2Flauncher.html`}`;
          break;
        default:
          naviagteUrl = `${`https://d2drhksbtcqozo.cloudfront.net/casino/apex/layer/?gameid=${gameId}&moneymode=real&partnerid=2331&ticket=${sessionId}&&apex=1&gameurl=https%3A%2F%2Fd2drhksbtcqozo.cloudfront.net%2Fcasino%2Flauncher.html`}`;
      }
      return naviagteUrl;
    } else {
      switch (env) {
        case stageUrl:
          naviagteUrl = `${`https://d2drhksbtcqozo.cloudfront.net/casino/apex/layer/?gameid=${gameId}&moneymode=real&partnerid=2331&ticket=${sessionId}&&apex=1&gameurl=https%3A%2F%2Fd2drhksbtcqozo.cloudfront.net%2Fcasino%2Flauncher.html`}`;
          break;
        case prodUrl:
          naviagteUrl = `${`https://cf-casino-cdn-kc-eu-brussels-1-prod.relaxg.com/casino/apex/layer/?moneymode=real&gameid=${gameId}&partner=spinsagacasino&partnerid=2331&ticket=${sessionId}&channel=web&&apex=1&gameurl=https%3A%2F%2Fcf-casino-cdn-kc-eu-brussels-1-prod.relaxg.com%2Fcasino%2Flauncher.html`}`;
          break;
        default:
          naviagteUrl = `${`https://d2drhksbtcqozo.cloudfront.net/casino/apex/layer/?gameid=${gameId}&moneymode=real&partnerid=2331&ticket=${sessionId}&&apex=1&gameurl=https%3A%2F%2Fd2drhksbtcqozo.cloudfront.net%2Fcasino%2Flauncher.html`}`;
      }
      return naviagteUrl;
    }
  };

  const getMobileUrl = (env, gameId, sessionId) => {
    let naviagteUrl = "";
    if (GameProvider == "Booming Games" || GameProvider == "Evoplay") {
      switch (env) {
        case stageUrl:
          naviagteUrl = `${`https://d2drhksbtcqozo.cloudfront.net/casino/launcher.html?gameid=${gameId}&moneymode=real&partner=spinsagacasino&partnerid=2331&ticket=${sessionId}&jurisdiction=IM&lang=en_sc&channel=mobile`}`;
          break;
        case prodUrl:
          naviagteUrl = `${`https://cf-casino-cdn-kc-eu-brussels-1-prod.relaxg.com/casino/launcher.html?moneymode=real&gameid=${gameId}&partner=spinsagacasino&partnerid=2331&channel=mobile&ticket=${sessionId}&jurisdiction=IM&lang=en_sc`}`;
          break;
        default:
          naviagteUrl = `${`https://d2drhksbtcqozo.cloudfront.net/casino/launcher.html?gameid=${gameId}&channel=mobile&moneymode=real&partner=relax&partnerid=2331&ticket=${sessionId}`}`;
      }
      return naviagteUrl;
    } else {
      switch (env) {
        case stageUrl:
          naviagteUrl = `${`https://d2drhksbtcqozo.cloudfront.net/casino/launcher.html?gameid=${gameId}&channel=mobile&moneymode=real&partner=relax&partnerid=2331&ticket=${sessionId}`}`;
          break;
        case prodUrl:
          naviagteUrl = `${`https://cf-casino-cdn-kc-eu-brussels-1-prod.relaxg.com/casino/launcher.html?moneymode=real&gameid=${gameId}&partner=spinsagacasino&partnerid=2331&channel=mobile&ticket=${sessionId}`}`;
          break;
        default:
          naviagteUrl = `${`https://d2drhksbtcqozo.cloudfront.net/casino/launcher.html?gameid=${gameId}&channel=mobile&moneymode=real&partner=relax&partnerid=2331&ticket=${sessionId}`}`;
      }
      return naviagteUrl;
    }
  };

  return (
    <>
      <React.Fragment>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          ref={iframeRef}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <img
                  className="header-logo"
                  src={logo}
                  alt="logo"
                  onClick={handleClose}
                  style={{ marginLeft: isMobile ? "0px" : "" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  size="medium"
                  sx={{
                    background: theme.palette.custom.red_gradient,
                    color: theme.palette.custom.white,
                    marginRight: "15px",
                    textTransform: "capitalize",
                  }}
                  onClick={getCoins}
                >
                  Get Coins
                </Button>
                <Typography
                  onClick={toggleFullscreen}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    marginRight: "14px",
                  }}
                >
                  {isFullscreen ? (
                    <>
                      <BsFullscreenExit style={{ marginRight: "8px" }} />
                      Close Fullscreen
                    </>
                  ) : (
                    <>
                      <BsArrowsFullscreen style={{ marginRight: "8px" }} />
                      Fullscreen
                    </>
                  )}
                </Typography>

                {!isFullscreen && (
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </div>
            </Toolbar>
          </AppBar>
          <div style={{ position: "relative" }}>
            {isWarningModal && (
              <WarningModal
                onClose={() => {
                  setIsWarningModal(false);
                }}
                open={isWarningModal}
              />
            )}
            {isMobile ? (
              <iframe
                title="Mobile View"
                width="100%"
                src={getMobileUrl(
                  endPoints.apiBaseUrl,
                  gameId,
                  IsLoginData.sessionId
                )}
                // height="400px"
                height={isFullscreen ? `${window.innerHeight}px` : "500px"}
                frameBorder="0"
              ></iframe>
            ) : (
              <iframe
                title="Desktop View"
                src={`https://api-stage.spinsagacasino.com/game/new/?token=${IsLoginData.sessionId}&gameid=slotgame1&channel=web`}
                width="100%"
                height={isFullscreen ? "800px" : "600px"}
                frameBorder="0"
                onLoad={handleIframeLoad} // Call this function when iframe finishes loading
                style={{ display: loading ? "none" : "block", zIndex: 1 }} // Hide iframe when loading
              ></iframe>
            )}
          </div>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default TestGameIframe;
