// import React, { useState, useEffect } from "react";
// import { FaMobileAlt } from "react-icons/fa";
// import { MdDownloadForOffline } from "react-icons/md";

// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   CssBaseline,
//   Button,
//   ListItemAvatar,
//   Avatar,
//   MenuList,
// } from "@mui/material";
// import { useTheme } from "@emotion/react";

// const InstallAppButton = (props) => {
//   const { isDrawerOpen } = props;
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [isInstallable, setIsInstallable] = useState(false);
//   const [isIOS, setIsIOS] = useState(false);
//   const [alreadyInstall, setAlreadyInstall] = useState(true);
//   const theme = useTheme();

//   useEffect(() => {
//     const isIosDevice = /iPhone|iPad|iPod/.test(navigator.userAgent);
//     setIsIOS(isIosDevice);

//     const handleBeforeInstallPrompt = (e) => {

//       // Prevent the mini-infobar from appearing on mobile
//       e.preventDefault();
//       // Save the event so it can be triggered later
//       setDeferredPrompt(e);
//       setIsInstallable(true); // Set a flag to show the install button
//       console.log('handleBeforeInstallPrompt called after update')
//     };

//     // Listen for the beforeinstallprompt event
//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

//     // Clean up the event listener when the component is unmounted
//     return () => {
//       window.removeEventListener(
//         "beforeinstallprompt",
//         handleBeforeInstallPrompt
//       );
//     };
//   }, []);

//   const handleInstallClick = () => {
//     console.log("deferredPrompt", deferredPrompt);
//     if (deferredPrompt) {
//       // Show the install prompt
//       deferredPrompt.prompt();

//       // Wait for the user to respond to the prompt
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === "accepted") {
//           console.log("User accepted the A2HS prompt");
//         } else {
//           console.log("User dismissed the A2HS prompt");
//         }
//         // Clear the deferred prompt
//         // setDeferredPrompt(null);
//         setIsInstallable(false);
//       });
//     }
//   };

//   // useEffect(() => {
//   //   const checkIfInstalled = () => {
//   //     if (window.matchMedia("(display-mode: standalone)").matches) {
//   //       console.log("The app is installed as a PWA.");
//   //       setAlreadyInstall(false)
//   //     } else {
//   //       console.log("The app is not installed.");
//   //       setAlreadyInstall(true)
//   //     }
//   //   };

//   //   checkIfInstalled();
//   // }, []);

//   // iOS specific instructions (since iOS does not support A2HS natively)
//   if (isIOS) {
//     return (
//       <div
//         style={{
//           marginLeft: "5px",
//           cursor: "pointer",
//         }}
//         onClick={() =>
//           alert(
//             "To install this app, tap the 'Share' button and then 'Add to Home Screen'."
//           )
//         }
//       >
//         <MdDownloadForOffline />
//       </div>
//     );
//   }
//   console.log('isInstallable',isInstallable)

//   return (
//     <>
//       {isInstallable ? (
//         <ListItem onClick={handleInstallClick}>
//           <ListItemAvatar
//             // className="border-1"
//             sx={{
//               background: theme.palette.custom.gray_light,
//               color: theme.palette.custom.white,
//               border: theme.palette.custom.gray_border,
//             }}
//           >
//             <MdDownloadForOffline />
//           </ListItemAvatar>
//           {isDrawerOpen && (
//             <ListItemText
//               sx={{
//                 color: theme.palette.custom.white_gray,
//                 opacity: theme.palette.custom.half,
//               }}
//               primary="Install App"
//             />
//           )}
//         </ListItem>
//       ) : null}
//     </>
//   );
// };

// export default InstallAppButton;

import { FaMobileAlt } from "react-icons/fa";
import { MdDownloadForOffline } from "react-icons/md";
import { MdInstallMobile } from "react-icons/md";
import { useTranslation } from "react-i18next";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Button,
  ListItemAvatar,
  Avatar,
  MenuList,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import React, { useState, useEffect, createContext, useContext } from "react";
import { GoHomeFill } from "react-icons/go";
// Create a context with default values
const InstallContext = createContext({
  deferredPrompt: null,
  setDeferredPrompt: () => {},
  isInstallable: false,
  setIsInstallable: () => {},
});

export const InstallProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  return (
    <InstallContext.Provider
      value={{
        deferredPrompt,
        setDeferredPrompt,
        isInstallable,
        setIsInstallable,
      }}
    >
      {children}
    </InstallContext.Provider>
  );
};

const InstallAppButton = (props) => {
  const [isIOS, setIsIOS] = useState(false);
  const { isDrawerOpen } = props;
  const { deferredPrompt, setDeferredPrompt, isInstallable, setIsInstallable } =
    useContext(InstallContext);
  const theme = useTheme();
  const { t } = useTranslation();
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Detect if the user is on iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setIsIOS(true);
    } else {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    // Cleanup the event listener
    return () => {
      if (!isIOS) {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
      }
    };
  }, [isIOS, setDeferredPrompt, setIsInstallable]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA installation");
        } else {
          console.log("User dismissed the PWA installation");
        }
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    }
  };

  if (isIOS) {
    return (
      // <button
      //   onClick={() =>
      //     alert(
      //       `To install this app, tap the 'Share' button and then 'Add to Home Screen'`
      //     )
      //   }
      //   style={{
      //     marginLeft: "5px",
      //     cursor: "pointer",
      //     background: "#179624",
      //     border: "none",
      //     padding: "0px 20px",
      //     borderRadius: "10px",
      //   }}
      // >
      //   <span className="footertag">Install App</span>
      // </button>

      <>
        {props.sidebar ? (
          <ListItem
            onClick={() =>
              alert(t("common.iosInstallInstructions"))
            }
          >
            <ListItemAvatar
              className="border-1"
              sx={{
                background: theme.palette.custom.gray_light,
                color: theme.palette.custom.white,
                border: theme.palette.custom.gray_border,
                // color: theme.palette.custom.white_gray,
              }}
            >
              <MdInstallMobile />
            </ListItemAvatar>
            {isDrawerOpen && <ListItemText primary={t("common.installApp")} />}
          </ListItem>
        ) : (
          <Button
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.custom.green_green,
              color: theme.palette.custom.white_white,
            }}
            onClick={() =>
              alert(t("common.iosInstallInstructions"))
            }
          >
            {t("common.installApp")}
          </Button>
        )}
      </>
    );
  }
  // console.log("isInstallable", isInstallable, "isIOS", isIOS);
  return (
    <div>
      {isInstallable ? (
        <>
          {props?.footerOnly ? (
            <>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.custom.green_green,
                  color: theme.palette.custom.white_white,
                }}
                onClick={handleInstallClick}
                // style={{ width: "50%",marginTop:'15px' }}
              >
                {t("common.installApp")}
              </Button>
            </>
          ) : (
            <ListItem onClick={handleInstallClick}>
              <ListItemAvatar
                sx={{
                  background: theme.palette.custom.gray_light,
                  color: theme.palette.custom.white,
                  border: theme.palette.custom.gray_border,
                }}
              >
               <MdInstallMobile />
              </ListItemAvatar>
              {isDrawerOpen && (
                <ListItemText
                  sx={{
                    color: theme.palette.custom.white_gray,
                    // opacity: theme.palette.custom.half,
                  }}
                  primary={t("common.installApp")}
                />
              )}
            </ListItem>
          )}
        </>
      ) : null}
    </div>
  );
};

export default InstallAppButton;
