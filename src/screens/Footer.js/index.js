import React from "react";
import { Grid, Typography, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Link as MuiLink } from '@mui/material';
import logo from "../../images/footer/spinsaga.png";
import master from "../../images/footer/Mastercard.svg";
import skrill from "../../images/footer/Skrill_logo.svg";
import visa from "../../images/footer/Visa.svg";
import discovery from "../../images/footer/Discovery.svg";
import facebook from "../../images/footer/Facebook.svg";
import insta from "../../images/footer/Instagram.svg";
import x from "../../images/footer/X.svg";
import discord from "../../images/footer/Discord.svg";
import {useTheme} from "@mui/material";
import { isMobile } from "react-device-detect";

function Footer() {
   const theme = useTheme();
  return (
    <Box component="footer"  py={4}
    sx={{
      backgroundColor: theme.palette.custom.black2_light2,
      color: theme.palette.custom.white_gray,
    }}
    >
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} sm={12} md={4} textAlign={isMobile?"center":"left"}>
          <Box>
            <MuiLink to="/">
              <img
                src={logo} 
                alt="Spin Saga Logo"
                style={{height:"60px"}}
              />
            </MuiLink>
          </Box>

          <Box display="flex" justifyContent={isMobile?"center":"start"} sx={{mt:8}} gap={2} flexWrap="wrap">
            <MuiLink to="/">
            <img src={skrill} alt="Skrill" style={{height:"35px"}} />
            </MuiLink>
            <MuiLink to="/">
              <img src={visa} alt="Visa"  />
            </MuiLink>
            <MuiLink to="/">
              <img src={master} alt="Mastercard"  />
            </MuiLink>
            <MuiLink to="/">
              <img src={discovery} alt="Discover"  />
            </MuiLink>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={2} textAlign={isMobile?"center":"left"}>
          <Typography variant="body1" sx={{ fontWeight: 700 }} gutterBottom>
            SUPPORT
          </Typography>
          <Box component="ul" p={0} m={0} style={{ listStyle: "none" }}>
            <Box component="li" mb={1}>
              <MuiLink component={Link}
                to="/contact-us"
                sx={{ color: theme.palette.custom.white_gray , textDecoration: "none" }}
              >
                Contact Us
              </MuiLink>
            </Box>
            <Box component="li" mb={1}>
              <MuiLink component={Link}
                to="/responsible-gaming"
                sx={{ color: theme.palette.custom.white_gray, textDecoration: "none" }}
              >
                Responsible Play
              </MuiLink>
            </Box>
            <Box component="li" mb={1}>
              <MuiLink component={Link}
                to="/faq"
                sx={{ color: theme.palette.custom.white_gray, textDecoration: "none" }}
              >
                FAQs
              </MuiLink>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3} textAlign={isMobile?"center":"left"}>
          <Typography variant="body1" sx={{ fontWeight: 700 }} gutterBottom>
            PLAYING AT SPIN SAGA
          </Typography>
          <Box component="ul" p={0} m={0} style={{ listStyle: "none" }}>
            <Box component="li" mb={1}>
              <MuiLink component={Link}
                to="/about-us"
                sx={{ color: theme.palette.custom.white_gray, textDecoration: "none" }}
              >
                About Us
              </MuiLink>
            </Box>
            <Box component="li" mb={1}>
              <MuiLink component={Link}
                to="/terms-conditions"
                sx={{ color: theme.palette.custom.white_gray, textDecoration: "none" }}
              >
                Terms and Conditions
              </MuiLink>
            </Box>
            <Box component="li" mb={1}>
              <MuiLink component={Link}
                to="/privacy-policy"
                sx={{ color: theme.palette.custom.white_gray, textDecoration: "none" }}
              >
                Privacy Policy
              </MuiLink>
            </Box>
            <Box component="li" mb={1}>
              <MuiLink component={Link}
                to="/sweepstakes"
                sx={{ color: theme.palette.custom.white_gray, textDecoration: "none" }}
              >
                Sweepstakes Rules
              </MuiLink>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={2} textAlign={isMobile?"center":"right"}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <IconButton
                component="a"
                href="https://x.com/SpinSagaCasino"
                target="_blank"
                color="inherit"
              >
                <img src={x} alt="X" />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <IconButton
                component="a"
                href="https://www.instagram.com/spinsagacasino/"
                target="_blank"
                color="inherit"
              >
                <img
                  src={insta}
                  alt="Instagram"
                />
              </IconButton>
            </Grid>

            <Grid item xs={6}>
              <IconButton
                component="a"
                href="https://www.facebook.com/profile.php?id=61563257325711"
                target="_blank"
                color="inherit"
              >
                <img
                  src={facebook}
                  alt="Facebook"
                />
              </IconButton>
            </Grid>
            {/* <Grid item xs={6}>
              <IconButton
                component="a"
                href="https://discord.com"
                target="_blank"
                color="inherit"
              >
                <img
                  src={discord}
                  alt="Discord"
                />
              </IconButton>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        <Typography variant="body2">
          © Spin Saga Casino 2024. All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
