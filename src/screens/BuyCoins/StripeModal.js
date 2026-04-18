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
import {  getWebsiteInfo } from "../../Utility/ConfigData";
import { useSelector } from "react-redux";
import { CASINO_US_WEBSITE } from "../../constant/Environment";

const StripeModal = (props) => {
  const websiteEnv = getWebsiteInfo();
  const { open, onClose, selecteNewPackage } = props;
  const theme = useTheme();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const fullName = `${loginData?.name || ""} ${loginData?.surname || ""}`.trim();

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        // maxWidth="xs"
        id="infoModal"
        className="info-modal"
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
            alignItems: "center",
            gap: 1,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
            Payment
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <hr />
        <DialogContent
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            padding: 0, // Remove padding around the content
          }}
        >
          <Grid
            container
            sx={{
              height: "70vh", // Ensure full height of the screen
              overflow: "hidden", // Prevent scrollbars
            }}
          >
            <iframe
              src={`${CASINO_US_WEBSITE}checkout?sessionId=${loginData?.sessionId || ""}&price=${selecteNewPackage?.purchase_price || ""}&env=${websiteEnv}&name=${fullName}&email=${loginData?.email || ""}&phone=${loginData?.phone || ""}`}
              title="Iframe Content"
              width="100%" // Make the iframe width 100% of the parent
              height="100%" // Make the iframe height 100% of the screen size
              frameBorder="0"
              style={{
                border: "none", // Remove the border around the iframe
                display: "block", // Ensure the iframe is a block element
              }}
            />
          </Grid>
          <Typography
                  sx={{
                    fontWeight: "bold",
                    justifyContent:'center',
                    display:'flex'
                  }}
                >
                  This charge will appear on your card as SpinSaga Inc.
                </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StripeModal;
