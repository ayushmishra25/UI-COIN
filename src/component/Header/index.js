import { Avatar, Box, Button, Divider, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from "@emotion/react";
import logo from "../../images/logo.png";
import { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { setThemeMode } from '../../redux/Reducers/GlobalReducer/globalSlice';

const Header = () => {

    const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

    const dispatch = useDispatch();

    const theme = useTheme();

    const { logout } = useAuth();
    const authState = useSelector((state) => state.auth);
    const { IsLoginData } = authState;

    const navigate = useNavigate();

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

      const logoutClick = () => {
        logout();
        dispatch(setThemeMode("dark"));
        navigate("/login");
      };

  return (
    <>
{/* <AppBar position="fixed" style={{ zIndex: 1300 }}> */}
        <header>
          <Toolbar
            className="web-header"
            sx={{
              backgroundColor: theme.palette.custom.header_bg,
            }}
          >
            <Typography variant="h6" noWrap>
              <img
                className="header-logo"
                src={logo}
                alt="logo"
                onClick={() => {
                  navigate("/");
                }}
              />
            </Typography>
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
                      width: "150px",
                      cursor: "pointer",
                    }}
                    onClick={handleProfileClick}
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
                      {IsLoginData?.name} {""} {IsLoginData?.surname}
                    </Typography>
                  </Box>
                </Grid>
                {/* Dropdown Menu */}
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
                      <Typography textAlign="center">My Account</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleNavigation("/buy-coins")}>
                      <Typography textAlign="center">Buy Coins</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleNavigation("/contact-us")}>
                      <Typography textAlign="center">
                        Contact Support
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleNavigation("/responsible-gaming-settings")}>
                      <Typography textAlign="center">
                        Responsible gaming
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

              {/* <Button
                className="msg_header"
                size="small"
                sx={{
                  background: theme.palette.custom.gray_red,
                  border: theme.palette.custom.header_border,
                  color: theme.palette.custom.red_white,
                }}
              >
                <BiSolidMessageDetail />
              </Button> */}
            </div>
          </Toolbar>
        </header>
      {/* </AppBar> */}
    </>
  )
}

export default Header;