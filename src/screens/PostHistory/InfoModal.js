import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function InfoModal(props) {
  const { open, setCancelModal } = props;
  const theme = useTheme();

  const handleClose = () => {
    setCancelModal();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
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
            Cancelled Request
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
              <Typography style={{ paddingLeft: "8px" }}>
                <li>
                  Your post requires revision. Please update and submit again.
                </li>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default InfoModal;
