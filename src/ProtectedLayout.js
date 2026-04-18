import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Button,
  ListItemAvatar,
  Avatar,
  MenuList,
  Box,
  Menu,
  Grid,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import axios from "axios";
import SportsEsports from "@mui/icons-material/SportsEsports";
import MenuIcon from "@mui/icons-material/Menu";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FormControl, Select, MenuItem } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // Import Outlet for nested routing
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "./redux/Reducers/GlobalReducer/globalSlice";
import { useAuth } from "./AuthContext";
import { LinearProgress } from "@mui/material";
import { styled } from "@mui/system";
import logo from "../src/images/logo.png";
import img1 from "../src/images/gold.svg";
import img2 from "../src/images/gold-coin.svg";
import img3 from "../src/images/sega-coin.svg";
import coin from "../src/images/gold-coin.png";
import vipDark from "../src/images/vipDark.svg";
import referDark from "../src/images/referDark.svg";
import redeemDark from "../src/images/redeemDark.svg";
import supportDark from "../src/images/supportDark.svg";
import FAQdark from "../src/images/FAQdark.svg";
import profileDark from "../src/images/profileDark.svg";
import { useTheme } from "@emotion/react";
import { FaCoins, FaPlus, FaRegUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoInformationCircle } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import {
  checkGeoAndVpn,
} from "./Utility/functions/Helper";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FaUser } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import GameHistory from "../src/images/GameHistory.svg";
import PurchaseHistory from "../src/images/PurchaseHistory.svg";

import { IoIosArrowDown } from "react-icons/io";
import { endPoints } from "./constant/Environment";
import Footer from "./screens/Footer";
import { addData, getAllData, updateUser } from "./Utility/API";
import SearchableCardList from "./screens/SearchableCardList";
import {
  setIsDrawerOpen,
  setShowSearchList,
} from "./redux/Reducers/sidebarReducer/sidebarSlice";
import { isMobile } from "react-device-detect";
import InstallAppButton from "./component/InstallAppButton";
import { FaSignOutAlt } from "react-icons/fa";
import { setLoading } from "./redux/Reducers/GlobalReducer/globalSlice";
import { useSnackbarContext } from "./component/SnackbarContext";
import {
  setLocationResponse,
  setLoginData,
} from "./redux/Reducers/AuthReducer/authSplice";
import {setFreeSpinGames} from "./redux/Reducers/GlobalReducer/globalSlice";

import InfoModal from "./screens/Home/InfoModal";
import redeemcoin from "../src/images/redeemcoin.png";
import CoinTransferInfo from "./screens/CoinTransferInfo";
import CongratsPage from "./screens/CongratsPage";
import RedeemSCCode from "./screens/RedeemSCCode";
import FailedGeocheck from "./screens/FailedGeocheck";
import Recentlyplayed from "../src/images/recently-played.png";
import ShowTransferPopup from "./screens/ShowTransferPopup";
import TourGuide from "./component/TourGuide";
import GcInfoModal from "./screens/Home/GcInfoModal";
import VIPProgressBar from "./screens/Home/VIPProgressBar";
import FreeSpinModal from "./screens/Home/FreeSpinModal";

const drawerWidthExpanded = 300; //270;
const drawerWidthCollapsed = 161;

const ProtectedLayout = () => {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const location = useLocation();
  const globalState = useSelector((state) => state.global);
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const [search, setSearch] = useState("");
  const [displaySearchUI, setDisplaySearchUI] = useState(false);
  const [searchGameList, setSearchGameList] = useState(null);
  const sideBarState = useSelector((state) => state.sidebar);
  const { menuList, isDrawerOpen, showSearchList, categoryList } = sideBarState;
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();

  const [codeModal, setCodeModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [freeSpinModalOpen, setFreeSpinModalOpen] = useState(false);
  const { userGeolocation, geoError } = globalState;
  const freeSpinGames = useSelector((state => state.global.freeSpinGames));
  // console.log("authState", authState);
  function getActiveClass(route) {
    return location.pathname === route ? "active" : "";
  }

  function getActiveTextColor(route) {
    return location.pathname === route
      ? theme.palette.custom.pink_bg
      : theme.palette.custom.white_gray;
  }
  function getActiveMenuClass(route) {
    // return location.pathname === route.toLowerCase() ? "active" : "";
  }

  const handleProfileClick = (event) => {
    if (profileMenuAnchor) {
      handleClose(); // Close if already open
    } else {
      setProfileMenuAnchor(event.currentTarget); // Open the menu
    }
  };

  const handleClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleNavigation = (url) => {
    navigate(url);
    handleClose();
  };

  useEffect(() => {
    if (isMobile && IsLoginData?.skip_popup) {
      dispatch(setIsDrawerOpen(false));
    } else {
      dispatch(setIsDrawerOpen(true));
    }
  }, []);

  const mobileSideBar = () => {
    if (isMobile) {
      dispatch(setIsDrawerOpen(false));
    }
  };

  // const toggleTheme = () => {
  //   const { themeMode } = globalState;
  //   let mode = themeMode === "light" ? "dark" : "light";
  //   dispatch(setThemeMode(mode));
  // };

  const handleDrawerToggle = () => {
    dispatch(setIsDrawerOpen(!isDrawerOpen));
  };

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const logoutClick = () => {
    logout();
    dispatch(setThemeMode("dark"));
    navigate("/login");
  };
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    backgroundColor: "#fff", // Background color of the progress bar
    position: "relative",
    "& .MuiLinearProgress-bar": {
      borderRadius: 5,
      background: "linear-gradient(to right, #FF416C, #FF4B2B)", // Gradient for the progress bar itself
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      borderRadius: 8,
      border: "2px solid",
      borderImage: "linear-gradient(to right, #FF416C, #FF4B2B) 1", // Gradient for the border
      pointerEvents: "none",
    },
  }));

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const theme = useTheme();

  const sidebarClass = isDrawerOpen
    ? "c_scroll hide_scroll1"
    : "c_scroll hide_scroll1 collapse_sidebar";
  const buttonSidebarClass = isDrawerOpen
    ? " side_box inner-main pink_bg"
    : "side_box inner-main green_gradient_close"; //green_gradient_close

  const showMenu = (item) => {
    navigate(createSlug(item?.category), {
      state: { categoryName: item.id, menuName: item.category },
    });
  };

  const showCategory = (item) => {
    navigate(createSlug(item?.category), {
      state: { categoryName: item.category },
    });
  };

  function createSlug(text) {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  }

  const searchGame = (e) => {
    setSearch(e.target.value);
    getGameByName(e.target.value);
  };

  const getGameByName = (name) => {
    if (name) {
      let url = `${endPoints.api.SERACH_GAME}/${name}`;
      getAllData(url).then((response) => {
        if (response?.status == "success" && response?.data) {
          dispatch(setShowSearchList(true));
          setDisplaySearchUI(true);
          setSearchGameList(response?.data);
        } else {
          dispatch(setShowSearchList(false));
          setDisplaySearchUI(false);
          setSearchGameList(null);
        }
      }).catch((error) => { 
        console.error(error);
      });
    } else {
      dispatch(setShowSearchList(false));
      setDisplaySearchUI(false);
      setSearchGameList(null);
    }
  };

  const UpdateEmailVerification = async () => {
    let data = {
      idUser: IsLoginData.idUser,
      login: IsLoginData.login,
    };
    dispatch(setLoading(true));
    // setOpenEmail(false);
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

  const UpdateUserDetail = async () => {
    let data = {
      idUser: IsLoginData?.idUser,
      login: IsLoginData?.login,
      name: IsLoginData?.name,
      surname: IsLoginData?.surname,
      email: IsLoginData?.email,
      birthDate: IsLoginData?.birthDate,
      nation: IsLoginData?.nation,
      country: IsLoginData?.country,
      town: IsLoginData?.town,
      address: IsLoginData?.address,
      mobile: IsLoginData?.mobile,
      zipCode: IsLoginData?.zipCode,
    };

    let url = `${endPoints.api.UPDATE_PERSONAL}`;
    dispatch(setLoading(true));

    try {
      const response = await updateUser(url, data);
      dispatch(setLoading(false));
      if (response?.status == "success") {
        showSuccessSnackbar(response?.message);
        GetUserById();
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
  const [geoResult, setGeoResult] = useState(false);

  useEffect(() => {
    checkGeoLocation();
  }, [userGeolocation]);

  const checkGeoLocation = async () => {
    const result = await checkGeoAndVpn(dispatch);
    console.log("location result", result);
    dispatch(setLocationResponse(result));
    if (result) {
      setGeoResult(true);
    } else {
      setGeoResult(false);
    }
  };

  // const checkGeoLocation = async()=>{
  //   const result = await  axios.get('https://ipapi.co/json/');
  //   console.log('userGeolocation',userGeolocation,'result?.data?.country_code',result?.data?.country_code)
  //   if (userGeolocation && result?.data?.country_code === 'US') {
  //       setGeoResult(true)
  //   } else {
  //     setGeoResult(false)
  //   }
  // }

  useEffect(() => {
    if (IsLoginData?.transfer_popup) {
      setShowPopup(true);
    }
  }, [IsLoginData]);
  
    useEffect(() => {
      if (IsLoginData?.idUser) {
        fetchFreeSpinGames();
      }
    }, []);    
  
    const fetchFreeSpinGames = async () => {
      try {
        setLoading(true);
        const url = `${endPoints.api.RECENT_FREE_SPIN_GAMES}/${IsLoginData.idUser}`;
        const response = await getAllData(url);
        
        if (response?.status === "success" && response?.data) {
          dispatch(setFreeSpinGames(response.data));
        }
      } catch (error) {
        console.error("Error fetching free spin games:", error);
        dispatch(setFreeSpinGames([]));
      } finally {
        setLoading(false);
      }
    };

  return (
    // <div style={{ display: "flex" }}>
    <div>
      <CssBaseline />

      {/* transfer coin alert  for new users */}
      {/* <ShowTransferPopup open={showPopup} onClose={() => setShowPopup(false)} /> */}
      {/* Sidebar Drawer */}

      <Drawer
        className={sidebarClass}
        variant="permanent"
        open={isDrawerOpen}
        PaperProps={{
          style: {
            width: isDrawerOpen ? drawerWidthExpanded : drawerWidthCollapsed,
            overflowX: "hidden",
            transition: "width 0.3s",
          },
        }}
      >
        <Toolbar />
        <main className="sidebar">
          {isDrawerOpen && (
            <>
              {/* { hide loyalty menu} */}
              {/* <div
                className="side_box red_gradient"
                onClick={() => {
                  navigate("/loyalty");
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="inner-main">
                  <div className="inner_left">
                    <img
                      src={IsLoginData?.casinobench?.levelimage ?? img1}
                      alt="logo"
                    />
                  </div>
                  <div className="inner_right">
                    <p style={{fontSize:"13px"}}>
                      {IsLoginData?.casinobench?.progress ?? 0}% progress to{" "}
                      {IsLoginData?.casinobench?.nextlevelpackage ?? "Gold"}
                    </p>
                    <BorderLinearProgress
                      variant="determinate"
                      value={IsLoginData?.casinobench?.progress ?? 0}
                    />
                  </div>
                </div>
              </div> */}

              <Typography
                variant="p"
                component="div"
                sx={{
                  background: theme.palette.custom.black_white,
                  color: theme.palette.custom.white_black,
                }}
                className="black_box top_box"
              >
                <div className="main_flex sidebar-balance">
                  <Typography variant="p" component="h2">
                    <img src={img2} alt="logo" className="sidebar-coin" />
                    {IsLoginData?.currency || "USD"}{" "}
                    {IsLoginData &&
                    IsLoginData?.account?.balance !== undefined
                      ? parseFloat(IsLoginData?.account?.balance || 0).toFixed(2)
                      : 0}
                    <GcInfoModal />
                  </Typography>
                </div>
                {/* enable coin tranfer */}
                {/* <div className="main_flex">
                  <Typography variant="p" component="h2">
                    <img
                      src={redeemcoin}
                      alt="logo"
                      className="sidebar-coin redeemsaga_coin"
                    />{" "}
                    Redeemable SC{" "}
                    {IsLoginData && IsLoginData?.account?.balance !== undefined
                      ? parseFloat(IsLoginData?.account?.balance || 0).toFixed(2)
                      : 0}
                  </Typography>
                </div> */}

                <div className="flex_between">
                  <Button
                    className={`${buttonSidebarClass} btn-buy-coins`}
                    size="small"
                    onClick={() => {
                      mobileSideBar();
                      navigate("/buy-coins");
                    }}
                    sx={{
                      background: theme.palette.custom.pink_bg,
                      color: theme.palette.custom.white_gray,
                    }}
                  >
                    {t('sidebar.buyCoin')}
                  </Button>
                  <Button
                    //border-1
                    className="side_box inner-main f-16-bold btn-redeem"
                    size="small"
                    sx={{
                      background: theme.palette.custom.pink_bg,
                      color: theme.palette.custom.white_gray,
                    }}
                    onClick={() => {
                      mobileSideBar();
                      navigate("/redeem");
                    }}
                  >
                    {t('sidebar.redeem')}
                  </Button>
                </div>

                {/* enable coin Transfer button */}

                {/* hide transfer coin section now 23 sept 
                 {IsLoginData?.account?.balance > 0 && (
                  <CoinTransferInfo
                    buttonSidebarClass={`${buttonSidebarClass} btn-transfer-coins`}
                    mobileSideBar={mobileSideBar}
                  />
                )} */}

              
              <Button
                  className={`${buttonSidebarClass} btn-my-promotions`}
                  size="small"
                  onClick={() => {
                    mobileSideBar();
                    navigate("/all-promotions");
                  }}
                  sx={{
                    background: theme.palette.custom.pink_bg,
                    color: theme.palette.custom.white_gray,
                  }}
                >
                  {t('sidebar.myPromotions')}
                </Button>

                <Button
                  className={`${buttonSidebarClass} btn-vvip-status`}
                  size="small"
                  onClick={() => {
                    mobileSideBar();
                    navigate("/loyalty");
                  }}
                  sx={{
                    background: theme.palette.custom.pink_bg,
                    color: theme.palette.custom.white_gray,
                  }}
                >
                  {t('sidebar.myVipStatus')}
                </Button>
                <VIPProgressBar />

                {/* <div className="flex_between">
                  <Button
                    className={buttonSidebarClass}
                    size="small"
                    onClick={() => {
                      mobileSideBar();
                      // navigate("/buy-coins");
                    }}
                    sx={{
                      background: theme.palette.custom.pink_bg,
                      color: theme.palette.custom.white_gray,
                    }}
                  >
                    Transfer Coins
                  </Button>
                  </div> */}
              </Typography>

              {/* <div className="side_box yellow_gradient">
                <div className="inner-main">
                  <div className="inner_left">
                    <img src={img2} alt="logo" className="sidebar-coin" />
                  </div>
                  <div className="inner_right">
                    <p>Bonus Cash</p>
                    <p>
                      {IsLoginData &&
                      IsLoginData?.account?.balance !== undefined
                        ? parseFloat(IsLoginData?.account?.balance || 0).toFixed(2)
                        : 0}
                    </p>
                  </div>
                </div>
              </div> */}
              {/* <div className="side_box blue_gradient">
                <div className="inner-main">
                  <div className="inner_left">
                    <img src={img3} alt="logo" className="sidebar-coin" />
                  </div>
                  <div className="inner_right">
                    <p>Real Cash</p>
                    <p>
                      {IsLoginData &&
                      IsLoginData?.account?.sc_credit !== undefined
                        ? sumSC_credit_SC_Main(
                            IsLoginData?.account?.sc_credit,
                            IsLoginData?.account?.balance
                          )
                        : 0}
                    </p>
                  </div>
                </div>
              </div>{" "} */}
            </>
          )}

          {/* <Button
            className={buttonSidebarClass}
            size="small"
            onClick={() => {
              mobileSideBar();
              navigate("/buy-coins");
            }}
          >
            <FaPlus />
            Buy Coins
          </Button>
          <Button
            className="side_box inner-main border-1 f-16-bold"
            size="small"
            sx={{
              background: theme.palette.custom.trans_lgray,
              color: theme.palette.custom.white_gray,
              border: theme.palette.custom.white_lgray,
            }}
            onClick={() => {
              mobileSideBar();
              navigate("/redeem");
            }}
          >
            Redeem
          </Button> */}

          <Demo
            className="side_list black_box "
            sx={{
              background: theme.palette.custom.black_white,
            }}
          >
            <List dense={dense}>
              <InstallAppButton
                isDrawerOpen={isDrawerOpen}
                footerOnly={false}
                sidebar={true}
              />

              <ListItem
                onClick={() => {
                  mobileSideBar();
                  window.open("https://dfs.bettdraft.com/", "_blank");
                }}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: "#ed1d51",
                    color: "white",
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <SportsEsports />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: "#ed1d51",
                      fontWeight: "bold !important",
                    }}
                    primary={t('sidebar.fantasySport')}
                  />
                )}
              </ListItem>
              <ListItem
                onClick={() => {
                  mobileSideBar();
                  navigate("/");
                }}
                className={getActiveClass("/")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <GoHomeFill />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: getActiveTextColor("/"),
                    }}
                    primary={t('sidebar.lobby')}
                  />
                )}
              </ListItem>

              {/* Recently played menu  */}
              <ListItem
                onClick={() => {
                  mobileSideBar();
                  navigate("/recently-played");
                }}
                className={getActiveClass("/recently-played")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img src={Recentlyplayed} height={20} width={20} />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: getActiveTextColor("/recently-played"),
                    }}
                    primary={t('sidebar.recentlyPlayed')}
                  />
                )}
              </ListItem>

              {/* free spin menu  */ }
              <FreeSpinModal
                open={freeSpinModalOpen}
                onClose={() => setFreeSpinModalOpen(false)}
                // packages={mainItems}
                freeSpinGames={freeSpinGames}
                loading={globalState.loading}
              />

              <ListItem
                onClick={() => {
                  setFreeSpinModalOpen(true);
                }}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img src={redeemDark} />
                </ListItemAvatar>
                {isDrawerOpen && <ListItemText primary={t('sidebar.freeSpin')} />}
              </ListItem>

              {/* cateogries menu  */}
              {categoryList &&
                categoryList.map((item, index) => {
                  return (
                    <ListItem
                      key={item.id || index}
                      onClick={() => {
                        mobileSideBar();
                        // showMenu(item);
                        showCategory(item);
                      }}
                    >
                      <ListItemAvatar
                        className="border-1"
                        sx={{
                          background: theme.palette.custom.gray_light,
                          color: theme.palette.custom.white,
                          border: theme.palette.custom.gray_border,
                        }}
                      >
                        {/* <img src={vipDark} /> */}

                        <img
                          src={`${endPoints.imageCDN}${item.categoryIcon}`}
                          alt={item.category}
                          style={{ width: 20, height: 20 }}
                        />
                      </ListItemAvatar>

                      {isDrawerOpen && (
                        <ListItemText
                          sx={{
                            color: getActiveTextColor(
                              `/${createSlug(item.category)}`
                            ),
                          }}
                          primary={item.category}
                        />
                      )}
                    </ListItem>
                  );
                })}
            </List>
          </Demo>

          <Demo
            className="side_list black_box "
            sx={{
              background: theme.palette.custom.black_white,
            }}
          >
            <List dense={dense}>
              <ListItem
                onClick={() => {
                  mobileSideBar();
                  navigate("/profile");
                }}
                className={getActiveClass("/profile")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img src={profileDark} />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: getActiveTextColor("/profile"),
                      // opacity: theme.palette.custom.half,
                    }}
                    primary={t('sidebar.myProfile')}
                  />
                )}
              </ListItem>
              {/* unhide  loyalty tab */}
              {/* <ListItem
                onClick={() => {
                  mobileSideBar();
                  navigate("/loyalty");
                }}
                className={getActiveClass("/loyalty")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img src={vipDark} />
                </ListItemAvatar>

                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: theme.palette.custom.white_gray,
                      // opacity: theme.palette.custom.half,
                    }}
                    primary="My VIP Status"
                  />
                )}
              </ListItem> */}
              {codeModal && (
                <RedeemSCCode
                  openCodeModal={codeModal}
                  closeCodeModal={() => {
                    setCodeModal(false);
                  }}
                />
              )}

              <ListItem
                onClick={() => {
                  setCodeModal(true);
                }}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img src={redeemDark} />
                </ListItemAvatar>
                {isDrawerOpen && <ListItemText primary={t('sidebar.claimSc')} />}
              </ListItem>

              <ListItem
                onClick={() => {
                  mobileSideBar();
                  navigate("/refer-friend");
                }}
                className={getActiveClass("/refer-friend")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img src={referDark} />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: getActiveTextColor("/refer-friend"),
                      // opacity: theme.palette.custom.half,
                    }}
                    primary={t('sidebar.referFriend')}
                  />
                )}
              </ListItem>

              <ListItem
                onClick={() => {
                  mobileSideBar();
                  navigate("/purchase-history");
                }}
                className={getActiveClass("/purchase-history")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img
                    src={PurchaseHistory}
                    style={{ height: "20px", width: "20px" }}
                  />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: getActiveTextColor("/purchase-history"),
                      // opacity: theme.palette.custom.half,
                    }}
                    primary={t('sidebar.purchaseHistory')}
                  />
                )}
              </ListItem>

              {/* hide game history */}
              <ListItem
                onClick={() => {
                  mobileSideBar();
                  navigate("/game-history");
                }}
                className={getActiveClass("/game-history")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img
                    src={GameHistory}
                    style={{ height: "20px", width: "20px" }}
                  />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: getActiveTextColor("/game-history"),
                    }}
                    primary={t('sidebar.gameHistory')}
                  />
                )}
              </ListItem>

              <ListItem
                onClick={() => {
                  mobileSideBar();
                  navigate("/transaction");
                }}
                className={getActiveClass("/transaction")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img
                    src={GameHistory}
                    style={{ height: "20px", width: "20px" }}
                  />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: getActiveTextColor("/transaction"),
                    }}
                    primary={t('sidebar.myTransaction')}
                  />
                )}
              </ListItem>

              <ListItem
                onClick={() => {
                  mobileSideBar();
                  navigate("/post-history");
                }}
                className={getActiveClass("/post-history")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img
                    src={GameHistory}
                    style={{ height: "20px", width: "20px" }}
                  />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: getActiveTextColor("/post-history"),
                    }}
                    primary={t('sidebar.postHistory')}
                  />
                )}
              </ListItem>

              <ListItem
                onClick={() => {
                  mobileSideBar();
                  navigate("/my-redeemption");
                }}
                className={getActiveClass("/my-redeemption")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img src={redeemDark} />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: getActiveTextColor("/my-redeemption"),
                      // opacity: theme.palette.custom.half,
                    }}
                    primary={t('sidebar.myRedemption')}
                  />
                )}
              </ListItem>

              <ListItem
                onClick={() => {
                  mobileSideBar();
                  navigate("/responsible-gaming-settings");
                }}
                className={getActiveClass("/responsible-gaming-settings")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img src={FAQdark} />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: getActiveTextColor("/responsible-gaming-settings"),
                      // opacity: theme.palette.custom.half,
                    }}
                    primary={t('sidebar.responsibleGaming')}
                  />
                )}
              </ListItem>
            </List>
          </Demo>
          <Demo
            className="side_list black_box "
            sx={{
              background: theme.palette.custom.black_white,
            }}
          >
            <List dense={dense}>
              {/* <ListItem
                onClick={() => {
                  navigate("/support");
                }}

              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.green_green,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img src={supportDark} />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: theme.palette.custom.green_green,
                    }}
                    primary="24x7 Customer Help"
                  />
                )}
              </ListItem> */}
              {/* <ListItem
                onClick={() => {
                  navigate("/faq");
                }}
                className={getActiveClass("/faq")}
              >
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  <img src={FAQdark} />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: theme.palette.custom.white_gray,
                      // opacity: theme.palette.custom.half,
                    }}
                    primary="FAQs"
                  />
                )}
              </ListItem> */}

              <ListItem onClick={logoutClick}>
                <ListItemAvatar
                  className="border-1"
                  sx={{
                    background: theme.palette.custom.gray_light,
                    color: theme.palette.custom.white,
                    border: theme.palette.custom.gray_border,
                  }}
                >
                  {/* <img src={FAQdark} /> */}
                  <FaSignOutAlt />
                </ListItemAvatar>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{
                      color: theme.palette.custom.white_gray,
                      // opacity: theme.palette.custom.half,
                    }}
                    primary={t('sidebar.logout')}
                  />
                )}
              </ListItem>
            </List>
          </Demo>
          {/* <ModalTest/>
          <ModalTest2/> */}
          {/* <Typography
            className="dark_light_btn"
            variant="h5"
            component="div"
            sx={{
              background: theme.palette.custom.dark_bg,
            }}
          >
            {/* <Button
              size="small"
              sx={{
                background: theme.palette.custom.dark_btn_gradient,
                color: theme.palette.custom.white_gray,
              }}
              onClick={toggleTheme}
            >
              <IoMdMoon
                sx={{
                  color: theme.palette.custom.white_gray,
                }}
              />
              Dark
            </Button>
            <Button
              onClick={toggleTheme}
              size="small"
              sx={{
                background: theme.palette.custom.light_btn,
                color: theme.palette.custom.white_gray,
              }}
            >
              <IoSunnyOutline
                sx={{
                  color: theme.palette.custom.white_gray,
                }}
              />
              Light
            </Button> */}
          {/* </Typography> */}
        </main>
        {/* <List>


        </List> */}
      </Drawer>

      {/* mobile fix bottom */}

      <main className="mobile_fix_bottom">
        <Demo
          className="bottom_bar"
          sx={{
            borderColor: theme.palette.custom.btn_border,
          }}
          style={{ paddingRight: "35px" }}
        >
          <List dense={dense}>
            <ListItem
              sx={{
                borderColor: theme.palette.custom.btn_border,
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemAvatar
                sx={{
                  color: theme.palette.custom.white_gray,
                }}
              >
                <GoHomeFill />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  color: theme.palette.custom.white_gray,
                }}
                primary={t('sidebar.lobby')}
              />
            </ListItem>
            {/* <ListItem
              onClick={() => {
                navigate("/profile");
              }}
            >
              <ListItemAvatar
                sx={{
                  color: theme.palette.custom.white_gray,
                }}
              >
                <FaRegUser />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  color: theme.palette.custom.white_gray,
                }}
                primary="Profile"
              />
            </ListItem> */}
            <ListItem
              onClick={() => {
                 window.open("https://dfs.bettdraft.com/", "_blank");
              }}
            >
              <ListItemAvatar
                sx={{
                  color: theme.palette.custom.white_gray,
                }}
              >
                <SportsEsports />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  color: "#ed1d51",
                }}
                primary={t('sidebar.fantasySport')}
              />
            </ListItem>
            <ListItem>
              <Button
                className={buttonSidebarClass}
                size="small"
                onClick={() => {
                  navigate("/buy-coins");
                }}
              >
                <FaPlus />
                <span>{t('sidebar.buyCoin')}</span>
              </Button>
            </ListItem>
            <ListItem
              onClick={() => {
                navigate("/redeem");
              }}
              style={{ marginRight: "10px" }}
            >
              <ListItemAvatar
                sx={{
                  color: theme.palette.custom.white_gray,
                }}
              >
                <FaCoins />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  color: theme.palette.custom.white_gray,
                }}
                primary={t('sidebar.redeem')}
              />
            </ListItem>
            {/* <ListItem
              onClick={() => {
                navigate("/search");
              }}
            >
              <ListItemAvatar
                sx={{
                  color: theme.palette.custom.white_gray,
                }}
              >
                <IoSearch />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  color: theme.palette.custom.white_gray,
                }}
                primary="Search"
              />
            </ListItem> */}
          </List>
        </Demo>
      </main>

      {/* mobile fix bottom */}

      {/* Content */}
      <main
        id="main_sidebar"
        style={{
          flexGrow: 1,
          padding: "24px",
          paddingBottom: "0px",
          //  marginLeft: isDrawerOpen ? drawerWidthExpanded : drawerWidthCollapsed,
          marginLeft: isDrawerOpen ? drawerWidthExpanded : drawerWidthCollapsed,
          transition: "margin-left 0.3s",
        }}
      >
        <Toolbar />
        {geoResult && <FailedGeocheck />}
        <TourGuide />

        {/* {IsLoginData?.validation != "1" && ( */}
        {IsLoginData?.verification == "0" && ( // only verify the email here
          <div className="highlighted-header">
            <strong>
              {t('protectedLayout.claimSignupBonus')}
              <strong
                style={{
                  textDecoration: "underline",
                  color: "#ED1D51",
                  cursor: "pointer",
                }}
                onClick={() => UpdateEmailVerification()}
                // onClick={() => UpdateUserDetail()}
              >
                {" "}
                {t('protectedLayout.verifyNow')}
              </strong>{" "}
              {t('protectedLayout.andGetBonus')}
            </strong>
          </div>
        )}
        {/* comment this code use oin future */}
        {/* {IsLoginData?.validation == "1" && IsLoginData?.packagecount < 0 && (
          <div className="highlighted-header">
            <strong>
              {`Unlock Daily Login Bonus!`}
              <strong
                style={{
                  textDecoration: "underline",
                  color: "#ED1D51",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/buy-coins")}
              >
                {" "}
                Buy a coin pack  
              </strong>{" "}
              of $34.99 or more and start receiving your FREE daily login bonus!
            </strong>
          </div>
        )} */}

        <div style={{ marginTop: "10px" }}> </div>

        <Outlet />
        <div style={{ marginTop: "20px" }}>
          <Footer position="fixed"></Footer>
        </div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
