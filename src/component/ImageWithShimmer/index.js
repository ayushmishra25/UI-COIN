import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ImageWithShimmer = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const theme = useTheme();

  return (
    <>
      {loading && !error && <Skeleton height={200} />}
      {error ? (
        <Box
          sx={{
            height: 200,
            backgroundColor: theme.palette.custom.black_light,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.custom.white_gray,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)", // Add shadow to the box
            borderRadius: "4px", // Match the border radius of a typical card
          }}
        >
          {alt}
        </Box>
      ) : (
        <CardMedia
          component="img"
          height="100%"
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          style={{ 
            //display: loading ? "none" : "block",

            display: "block"
           }}
        />
      )}
    </>
  );
};

export default ImageWithShimmer;
