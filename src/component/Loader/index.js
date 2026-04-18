// // Loader.js
// import React from 'react';
// import { CircularProgress, Box } from '@mui/material';

// const Loader = ({ size = 40, color = 'primary', ...props }) => {
//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height="100vh"
//       {...props}
//     >
//       <CircularProgress size={size} color={color} />
//     </Box>
//   );
// };

// export default Loader;

// Loader.js
import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1200, // Ensures it appears on top of other elements
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
};

export default Loader;
