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

const Support = () => {
  return (
    <Grid container spacing={3} style={{ padding: 24 }}>
      <Helmet>
        <title>Support - SpinSaga Casino</title>
        <meta name="description" content="Get help and support for your SpinSaga Casino account, games, and transactions." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Typography variant="h4" component="h2" gutterBottom>
      Support Page
      </Typography>
    </Grid>
  );
};

export default Support;
