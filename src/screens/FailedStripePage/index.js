import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import FailedImage from "../../images/failed.png";
const FailedStripePage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Payment Failed!</h1>
      <p>Please try again.</p>

      <Box
        component="img"
        src={FailedImage}
        alt="Success"
        sx={{
          maxWidth: "100%",
          height: "auto",
          width: "300px", // You can adjust this value to control the image size
        }}
      />
      {/* <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "2rem" }}
        onClick={() => {
          // navigate("/purchase-history");
        }}
      >
        Go to Purchase History
      </Button> */}
    </Container>
  );
};

export default FailedStripePage;
