import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Button,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

function GeoModal(props) {
  const { open, onClose } = props;
  const authState = useSelector((state) => state.auth);
  const { isVpn } = authState;
  const theme = useTheme();

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        id="locationRestrictedModal"
        className="location-modal"
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h6" textAlign="center" sx={{ flex: 1 }}>
            {isVpn ? "Location Warning" : " Access Restricted"}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: theme.palette.grey[500] }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="body1">
            {isVpn
              ? "To proceed, disable the proxy service on your device. Once you have resolved this error, please try login again"
              : `  It appears that you are currently located outside of our permitted
            gaming area. Unfortunately, this means you are unable to access our
            games at this time.`}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GeoModal;
