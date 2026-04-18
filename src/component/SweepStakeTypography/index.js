import React from "react";
import { Typography, Link } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const SweepStakeTypography = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleNavigate =()=>{
    navigate('/generate-code')
  }
  return null
  
  //(
  //   <Typography
  //   className="f18_700"

  // >
  //   No purchase necessary. Sweepstakes rules apply.{" "}
  //   <Typography
  //     component="span"
  //     onClick={handleNavigate}
  //     sx={{
  //       cursor: "pointer",
  //       textDecoration: "underline",
  //      }}
  //   >
  //     Click here
  //   </Typography>{" "}
  //   for instructions on alternative method of entry.
  // </Typography>
  //);
};

export default SweepStakeTypography;
