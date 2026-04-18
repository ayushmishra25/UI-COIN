// // SnackbarContext.js
// import React, { createContext, useContext } from 'react';
// import { useSnackbar } from 'notistack';
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// const SnackbarContext = createContext(null);

// export const SnackbarProvider = ({ children }) => {
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const [currentVariant, setCurrentVariant] = React.useState(null);

//   const showSnackbar = (message, variant) => {
//     if (currentVariant === variant) return; // Don't show if same variant is already open

//     enqueueSnackbar(message, {
//       variant,
//       action: (key) => (
//         <IconButton onClick={() => {
//           closeSnackbar(key);
//           setCurrentVariant(null);
//         }}>
//           <CloseIcon />
//         </IconButton>
//       ),
//     });
//     setCurrentVariant(variant);
//   };

//   const showDefaultSnackbar = (message) => {
//     showSnackbar(message, "default");
//   };

//   const showSuccessSnackbar = (message) => {
//     showSnackbar(message, "success");
//   };

//   const showErrorSnackbar = (message) => {
//     showSnackbar(message, "error");
//   };

//   const showWarningSnackbar = (message) => {
//     showSnackbar(message, "warning");
//   };

//   const showInfoSnackbar = (message) => {
//     showSnackbar(message, "info");
//   };

//   return (
//     <SnackbarContext.Provider
//       value={{
//         showDefaultSnackbar,
//         showSuccessSnackbar,
//         showErrorSnackbar,
//         showWarningSnackbar,
//         showInfoSnackbar,
//       }}
//     >
//       {children}
//     </SnackbarContext.Provider>
//   );
// };

// export const useSnackbarContext = () => useContext(SnackbarContext);

// // SnackbarContext.js
// import React, { createContext, useContext } from 'react';
// import { useSnackbar } from 'notistack';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

// const SnackbarContext = createContext(null);

// export const SnackbarProvider = ({ children }) => {
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

//   const action = (key) => (
//     <IconButton onClick={() => closeSnackbar(key)}>
//       <CloseIcon />
//     </IconButton>
//   );

//   const showSnackbar = (message, variant) => {
//     enqueueSnackbar(message, {
//       variant,
//       action,
//     });
//   };

//   return (
//     <SnackbarContext.Provider
//       value={{
//         showDefaultSnackbar: (message) => showSnackbar(message, 'default'),
//         showSuccessSnackbar: (message) => showSnackbar(message, 'success'),
//         showErrorSnackbar: (message) => showSnackbar(message, 'error'),
//         showWarningSnackbar: (message) => showSnackbar(message, 'warning'),
//         showInfoSnackbar: (message) => showSnackbar(message, 'info'),
//       }}
//     >
//       {children}
//     </SnackbarContext.Provider>
//   );
// };

//export const useSnackbarContext = () => useContext(SnackbarContext);

// SnackbarContext.js
import React, { createContext, useContext, useState } from "react";
import { useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [activeSnackbars, setActiveSnackbars] = useState({});

  const showSnackbar = (message, variant) => {
    // Generate a unique key for each snackbar
    const key = new Date().getTime();

    // If the same variant is already active, return
    if (activeSnackbars[variant]) return;

    setActiveSnackbars((prev) => ({ ...prev, [variant]: key }));

    enqueueSnackbar(message, {
      variant,
      key,
      action: (key) => (
        <CloseIcon
          onClick={() => {
            closeSnackbar(key);
            setActiveSnackbars((prev) => {
              const updated = { ...prev };
              delete updated[variant];
              return updated;
            });
          }}
        />
      ),
      onClose: () => {
        setActiveSnackbars((prev) => {
          const updated = { ...prev };
          delete updated[variant];
          return updated;
        });
      },
    });
  };

  return (
    <SnackbarContext.Provider
      value={{
        showDefaultSnackbar: (message) => showSnackbar(message, "default"),
        showSuccessSnackbar: (message) => showSnackbar(message, "success"),
        showErrorSnackbar: (message) => showSnackbar(message, "error"),
        showWarningSnackbar: (message) => showSnackbar(message, "warning"),
        showInfoSnackbar: (message) => showSnackbar(message, "info"),
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => useContext(SnackbarContext);
