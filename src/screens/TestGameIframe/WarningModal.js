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
import { useNavigate } from "react-router-dom";

import Loader from "../../component/Loader";

const WarningModal = (props) => {
  const { open, onClose } = props;
  const navigate = useNavigate();
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
            Responsible Gaming Alert:
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
            <Grid item xs={12}>
              <Typography
                sx={{
                  color: theme.palette.custom.l_gray,
                }}
              >
                You've reached a high gaming activity level. Would you like to:
              </Typography>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  size="medium"
                  sx={{
                    background: theme.palette.custom.red,
                    color: theme.palette.custom.white,
                    marginTop: 2,
                    width: "48%",
                  }}
                  onClick={() => {
                    onClose();
                    navigate("/");
                  }}
                >
                  Exit
                </Button>
                <Button
                  size="medium"
                  sx={{
                    background: theme.palette.custom.red,
                    color: theme.palette.custom.white,
                    marginTop: 2,
                    width: "48%",
                  }}
                  onClick={() => {
                    onClose();
                  }}
                >
                  Play
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WarningModal;
