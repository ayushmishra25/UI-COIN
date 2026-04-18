import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"; // Import Outlet for nested routing

import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { isMobile } from "react-device-detect";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../AuthContext";
import { endPoints } from "../../constant/Environment";
import {
  setGeoError,
  setThemeMode,
  setUserGeoLocation,
} from "../../redux/Reducers/GlobalReducer/globalSlice";
import {
  setIsDrawerOpen,
  setShowSearchList,
} from "../../redux/Reducers/sidebarReducer/sidebarSlice";

import { FaSignOutAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { getAllData } from "../../Utility/API";
import SearchableCardList from "../../screens/SearchableCardList";
import AppLogo from "../AppLogo";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

const NavBar = () => {
    const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const location = useLocation();
  const globalState = useSelector((state) => state.global);
  const authState = useSelector((state) => state.auth);
  const { IsLoginData, isAuthenticated } = authState;
  const [search, setSearch] = useState("");
  const [displaySearchUI, setDisplaySearchUI] = useState(false);
  const [searchGameList, setSearchGameList] = useState(null);
  const sideBarState = useSelector((state) => state.sidebar);
  const { menuList, isDrawerOpen, showSearchList } = sideBarState;
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const footerRoutes = [
    "/contact-us",
    "/about-us",
    "/responsible-gaming",
    "/faq",
    "/terms-conditions",
    "/privacy-policy",
    "/sweepstakes",
  ];

  const isFooterRoute = footerRoutes.includes(location.pathname);

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
    if (isMobile) {
      dispatch(setIsDrawerOpen(false));
    } else {
      dispatch(setIsDrawerOpen(true));
    }
  }, []);

  const handleDrawerToggle = () => {
    dispatch(setIsDrawerOpen(!isDrawerOpen));
  };

  const logoutClick = () => {
    logout();
    dispatch(setUserGeoLocation(false));
    dispatch(setThemeMode("dark"));
    dispatch(setGeoError({}));
    navigate("/login");
  };

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const theme = useTheme();

  const searchGame = (e) => {
    setSearch(e.target.value);
    getGameByName(e.target.value);
  };

  const getGameByName = (name) => {
    if (name) {
      let url = `${endPoints.api.SERACH_GAME}/${name}`;
      getAllData(url).then((response) => {
        if (response?.status === "success" && response?.data) {
          dispatch(setShowSearchList(true));
          setDisplaySearchUI(true);
          setSearchGameList(response.data);
        } else {
          dispatch(setShowSearchList(false));
          setDisplaySearchUI(false);
          setSearchGameList(null);
        }
      });
    } else {
      dispatch(setShowSearchList(false));
      setDisplaySearchUI(false);
      setSearchGameList(null);
    }
  };

  return (
    <AppBar position="fixed" style={{ zIndex: 1300 }}>
      <header>
        <Toolbar
          className="web-header"
          sx={{
            // backgroundColor: theme.palette.custom.header_bg,
            backgroundColor: theme.palette.custom.black_white,
          }}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {isAuthenticated && !isFooterRoute ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              className="header_bar"
              sx={{
                color: theme.palette.custom.white_red,
              }}
            >
              {/* <MenuIcon /> */}
              <HiOutlineMenuAlt1 />
            </IconButton>
          ) : (
            ""
          )}
          <Typography
            variant="h6"
            noWrap
            style={{ cursor: "pointer" }}
            sx={{ marginLeft: { xs: -8, sm: 0 } }}
          >
            <AppLogo style={{ width: "100px" }} />
          </Typography>

          {isAuthenticated && isMobile ? (
            <span
              onClick={() => {
                navigate("/search");
              }}
              style={{ marginLeft: "25px" }}
            >
              <IoSearch />
            </span>
          ) : (
            ""
          )}

          {isAuthenticated ? (
            <>
              <TextField
                className="header_search"
                sx={{
                  backgroundColor: theme.palette.custom.search_bg,
                  color: theme.palette.custom.search_color,
                  border: theme.palette.custom.search_border,
                }}
                variant="outlined"
                placeholder={t('common.search')}
                type="search"
                value={search}
                onChange={(e) => {
                  searchGame(e);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setDisplaySearchUI(false);
                    dispatch(setShowSearchList(false));
                  }, 1000);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: theme.palette.custom.blue,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <SearchableCardList
                searchGameList={searchGameList}
                visibleSection={displaySearchUI}
              />
              {/* <FormControl
                className="header_dropdown"
                variant="outlined"
                sx={{
                  background: theme.palette.custom.green_gradient,
                }}
              >
                <Select
                  value={value}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    backgroundColor: theme.palette.custom.green_gradient,
                    color: theme.palette.custom.white_gray,
                    border: theme.palette.custom.white_black,
                    ".MuiSelect-icon": {
                      display: "none",
                    },
                  }}
                  disabled
                >
                  <MenuItem value="">
                    {IsLoginData?.currency || "USD"}{" "}
                    {IsLoginData &&
                    IsLoginData?.account?.balance !== undefined
                      ? parseFloat(IsLoginData?.account?.balance || 0).toFixed(2)
                      : 0.0}
                  </MenuItem>
                </Select>
                <img className="coin_select" src={coin} alt="logo" />
                <Button
                  className="add_header"
                  size="small"
                  onClick={() => {
                    navigate("/buy-coins");
                  }}
                  sx={{
                    background: theme.palette.custom.green_dark_gradient,
                    color: theme.palette.custom.white_white,
                  }}
                >
                  <FaPlus />
                </Button>
              </FormControl> */}
              <div className="m-auto header_group_icon">
                <Grid
                  style={{ display: isMobile ? "none" : "" }}
                  container
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: theme.palette.custom.red_light,
                        color: theme.palette.custom.white_red,
                        borderRadius: 4,
                        p: 1,
                        width: "130px",
                        cursor: "pointer",
                      }}
                      onClick={handleProfileClick}
                      className="btn-profile"
                    >
                      <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                        <FaUser
                          fontSize="small"
                          style={{ color: theme.palette.custom.white_red }}
                        />
                      </Avatar>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          marginTop: "-4px",
                          textTransform: "capitalize",
                        }}
                      >
                        {IsLoginData?.name}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item>
                    <Menu
                      anchorEl={profileMenuAnchor}
                      open={Boolean(profileMenuAnchor)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      PaperProps={{
                        sx: {
                          width: "180px",
                          overflowY: "auto",
                          marginTop: "5px",
                        },
                      }}
                    >
                      <MenuItem onClick={() => handleNavigation("/profile")}>
                        <Typography textAlign="center">{t('navigation.myProfile')}</Typography>
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={() => handleNavigation("/buy-coins")}>
                        <Typography textAlign="center">{t('navigation.buyCoin')}</Typography>
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={() => handleNavigation("/contact-us")}>
                        <Typography textAlign="center">
                          {t('navigation.contactSupport')}
                        </Typography>
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={() =>
                          handleNavigation("/responsible-gaming-settings")
                        }
                      >
                        <Typography textAlign="center">
                          {t('navigation.responsibleGaming')}
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>

                <Button
                  className="msg_header"
                  size="medium"
                  sx={{
                    background: theme.palette.custom.gray_red,
                    border: theme.palette.custom.header_border,
                    color: theme.palette.custom.red_white,
                  }}
                  onClick={logoutClick}
                >
                  <FaSignOutAlt />
                </Button>
                {/* Language Switcher - Always visible */}
                <LanguageSwitcher />
              </div>{" "}
            </>
          ) : (
            <div
              className="top_buttons"
              style={{
                marginRight: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {window.location.pathname === "/buy-coins" ? null : (
                <Button
                  color="primary"
                  variant="contained"
                  // style={{ marginRight: 20 }}
                  onClick={() => {
                    navigate("/buy-coins");
                  }}
                  sx={{
                    background: theme.palette.custom.pink_bg,
                    color: theme.palette.custom.white_gray,
                    mr: { xs: 0.5, sm: 2 }, // margin-right for spacing
                    px: { xs: 0.5, sm: 3 }, // padding horizontal
                    py: { xs: 0.5, sm: 1 }, // padding vertical
                    fontSize: { xs: "0.62rem", sm: "1rem" },
                  }}
                >
                  <Typography
                    fontWeight={600}
                    sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
                  >
                    {t('navigation.buyCoin')}
                  </Typography>
                </Button>
              )}

              {window.location.pathname === "/all-promotions" ? null : (
                <Button
                  color="primary"
                  variant="contained"
                  // style={{ marginRight: 20 }}
                  onClick={() => {
                    navigate("/all-promotions");
                  }}
                  sx={{
                    background: theme.palette.custom.pink_bg,
                    color: theme.palette.custom.white_gray,
                    mr: { xs: 0.5, sm: 2 }, // margin-right for spacing
                    px: { xs: 0.5, sm: 3 }, // padding horizontal
                    py: { xs: 0.5, sm: 1 }, // padding vertical
                    fontSize: { xs: "0.62rem", sm: "1rem" },
                  }}
                >
                  <Typography
                    fontWeight={600}
                    sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
                  >
                    {t('navigation.promotions')}
                  </Typography>
                </Button>
              )}

              {window.location.pathname === "/login" ? null : (
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    background: theme.palette.custom.pink_bg,
                    color: theme.palette.custom.white_gray,
                    mr: { xs: 0.5, sm: 2 }, // margin-right for spacing
                    px: { xs: 0.5, sm: 3 }, // padding horizontal
                    py: { xs: 0.5, sm: 1 }, // padding vertical
                    fontSize: { xs: "0.62rem", sm: "1rem" },
                  }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <Typography
                    sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
                    fontWeight={600}
                  >
                    {t('auth.login')}
                  </Typography>
                </Button>
              )}

              {window.location.pathname === "/signup" ? null : (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    navigate("/signup");
                  }}
                  sx={{
                    background: theme.palette.custom.pink_bg,
                    color: theme.palette.custom.white_gray,
                    mr: { xs: 0.5, sm: 2 }, // margin-right for spacing
                    px: { xs: 0.5, sm: 3 }, // padding horizontal
                    py: { xs: 0.5, sm: 1 }, // padding vertical
                  }}
                >
                  <Typography
                    sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
                    fontWeight={600}
                  >
                    {t('common.signUp')}
                  </Typography>
                </Button>
              )}
              {/* Language Switcher - Always visible */}
              <LanguageSwitcher />
            </div>
          )}
        </Toolbar>
      </header>
    </AppBar>
  );
};

export default NavBar;
