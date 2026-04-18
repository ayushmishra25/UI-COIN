import React from "react";
import { Grid, Typography, Box, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import logo from "../../images/footer/WebsiteLogo.png";
import master from "../../images/footer/master.svg";
import skrill from "../../images/footer/Skrill_logo.svg";
import visa from "../../images/footer/Visa.svg";
import discovery from "../../images/footer/Discovery.svg";
import facebook from "../../images/footer/Facebook.svg";
import insta from "../../images/footer/Instagram.svg";
import x from "../../images/footer/X.svg";
import discord from "../../images/footer/Discord.svg";
import { useTheme } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import InstallAppButton from "../../component/InstallAppButton";
import StarRating from "../../images/footer/StarRating-white.png";

function Footer() {
  const theme = useTheme();
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated } = authState;
  const location = useLocation();
  const footerRoutes = [
    "/contact-us",
    "/about-us",
    "/responsible-gaming",
    "/faq",
    "/terms-conditions",
    "/privacy-policy",
    "/sweepstakes",
  ];

  return (
    <Box
      component="footer"
      py={4}
      sx={{
        backgroundColor: theme.palette.custom.black2_light2,
        color: theme.palette.custom.white_gray,
      }}
    >
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} sm={12} md={4} textAlign={"left"}>
          <Box>
            <MuiLink to="/">
              <img src={logo} alt="SpinSaga Logo" style={{ height: "60px" }} />
            </MuiLink>
          </Box>
          <InstallAppButton isDrawerOpen={false} footerOnly />

          {/* <Box
            display="flex"
            justifyContent={"center"}
            sx={{ mt: 8 }}
            gap={2}
            flexWrap="wrap"
          >
            <MuiLink to="/">
              <img src={skrill} alt="Skrill" style={{ height: "35px" }} />
            </MuiLink>
            <MuiLink to="/">
              <img src={visa} alt="Visa" />
            </MuiLink>
            <MuiLink to="/">
              <img
                src={master}
                alt="Mastercard"
                style={{ height: "45px", marginTop: "-5px" }}
              />
            </MuiLink>
            <MuiLink to="/">
              <img src={discovery} alt="Discover" />
            </MuiLink>
          </Box>  */}

          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              SpinSaga Casino is rated
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="success.main">
              Excellent
            </Typography>
            <Typography variant="body2">Based on 266 reviews</Typography>
            <MuiLink
              href="https://www.trustpilot.com/review/spinsagacasino.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                cursor: "pointer",
              }}
            >
              <img
                src={StarRating}
                alt="TrustPilot"
                style={{ height: "100px" }}
              />
            </MuiLink>
          </Box>
        </Grid>

        {/* <Grid>
       <Box
            display="flex"
            justifyContent={"center"}
            sx={{ mt: 8 }}
            gap={2}
            flexWrap="wrap"
          >
            <MuiLink to="/">
              <img src={skrill} alt="Skrill" style={{ height: "35px" }} />
            </MuiLink>
            <MuiLink to="/">
              <img src={visa} alt="Visa" />
            </MuiLink>
            <MuiLink to="/">
              <img
                src={master}
                alt="Mastercard"
                style={{ height: "45px", marginTop: "-5px" }}
              />
            </MuiLink>
            <MuiLink to="/">
              <img src={discovery} alt="Discover" />
            </MuiLink>
          </Box> 
       </Grid> */}

        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Typography variant="body1" sx={{ fontWeight: 700 }} gutterBottom>
            SUPPORT
          </Typography>
          <Box component="ul" p={0} m={0} style={{ listStyle: "none" }}>
            <Box component="li" mb={1}>
              <MuiLink
                component={Link}
                to="/contact-us"
                sx={{
                  color: theme.palette.custom.white_gray,
                  textDecoration: "none",
                }}
              >
                Contact Us
              </MuiLink>
            </Box>
            <Box component="li" mb={1}>
              <MuiLink
                component={Link}
                to="/responsible-gaming"
                sx={{
                  color: theme.palette.custom.white_gray,
                  textDecoration: "none",
                }}
              >
                Responsible Gaming
              </MuiLink>
            </Box>
            <Box component="li" mb={1}>
              <MuiLink
                component={Link}
                to="/faq"
                sx={{
                  color: theme.palette.custom.white_gray,
                  textDecoration: "none",
                }}
              >
                FAQs
              </MuiLink>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Typography variant="body1" sx={{ fontWeight: 700 }} gutterBottom>
            PLAYING AT SPINSAGA
          </Typography>
          <Box component="ul" p={0} m={0} style={{ listStyle: "none" }}>
            <Box component="li" mb={1}>
              <MuiLink
                component={Link}
                to="/about-us"
                sx={{
                  color: theme.palette.custom.white_gray,
                  textDecoration: "none",
                }}
              >
                About Us
              </MuiLink>
            </Box>
            <Box component="li" mb={1}>
              <MuiLink
                component={Link}
                to="/terms-conditions"
                sx={{
                  color: theme.palette.custom.white_gray,
                  textDecoration: "none",
                }}
              >
                Terms and Conditions
              </MuiLink>
            </Box>
            <Box component="li" mb={1}>
              <MuiLink
                component={Link}
                to="/privacy-policy"
                sx={{
                  color: theme.palette.custom.white_gray,
                  textDecoration: "none",
                }}
              >
                Privacy Policy
              </MuiLink>
            </Box>
            <Box component="li" mb={1}>
              <MuiLink
                component={Link}
                to="/sweepstakes"
                sx={{
                  color: theme.palette.custom.white_gray,
                  textDecoration: "none",
                }}
              >
                Sweepstakes Rules
              </MuiLink>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={2} textAlign={"right"}>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={4}>
              <IconButton
                component="a"
                href="https://x.com/SpinSagaCasino"
                target="_blank"
                color="inherit"
              >
                <img src={x} alt="X" style={{ height: "50px" }} />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                component="a"
                href="https://www.instagram.com/spinsagacasino/"
                target="_blank"
                color="inherit"
              >
                <img src={insta} alt="Instagram" style={{ height: "50px" }} />
              </IconButton>
            </Grid>

            <Grid item xs={4}>
              <IconButton
                component="a"
                href="https://www.facebook.com/profile.php?id=61563257325711"
                target="_blank"
                color="inherit"
              >
                <img src={facebook} alt="Facebook" style={{ height: "50px" }} />
              </IconButton>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Skrill & Visa */}
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginLeft: 5,
                }}
              >
                <MuiLink to="/">
                  <img src={skrill} alt="Skrill" style={{ height: "35px" }} />
                </MuiLink>
                <MuiLink to="/">
                  <img src={visa} alt="Visa" style={{ height: "35px" }} />
                </MuiLink>
              </Grid>

              {/* Mastercard & Discover */}
              <Grid item sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <MuiLink to="/">
                  <img
                    src={master}
                    alt="Mastercard"
                    style={{ height: "45px" }}
                  />
                </MuiLink>
                <MuiLink to="/">
                  <img
                    src={discovery}
                    alt="Discover"
                    style={{ height: "35px" }}
                  />
                </MuiLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        <Typography variant="body2">
          At SpinSaga it is ALWAYS FREE to enter or win our games. No Purchase
          Necessary. Void where prohibited by law. Terms apply. © SpinSaga All
          Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
