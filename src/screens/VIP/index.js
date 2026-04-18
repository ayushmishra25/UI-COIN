import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Helmet } from "react-helmet";

const Vip = () => {
  return (
    <Grid container spacing={3} style={{ padding: 24 }}>
      <Helmet>
        <title>VIP Program - SpinSaga Casino</title>
        <meta name="description" content="Join the SpinSaga VIP program for exclusive rewards, bonuses, and premium casino gaming perks." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Typography variant="h4" component="h2" gutterBottom>
      Vip Page
      </Typography>
    </Grid>
  );
};

export default Vip;
