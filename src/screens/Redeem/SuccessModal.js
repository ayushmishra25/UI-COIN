import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Button,
  useTheme,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Loader from "../../component/Loader";

const SuccessModal = (props) => {
  const { open, onClose } = props;
  const theme = useTheme();

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        id="infoModal"
        className="info-modal Purchase_modal"
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
            Cash Withdrawal Request
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
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.custom.l_gray,
                }}
              >
                Your withdrawal request has been submitted. Processing time is
                1-3 business days, depending on your VIP Status.
              </Typography>

              
              <Button
                size="medium"
                sx={{
                  background: theme.palette.custom.red,
                  color: theme.palette.custom.white,
                  marginTop: 2,
                }}
                onClick={() => {
                  onClose();
                }}
              >
                Ok
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SuccessModal;
