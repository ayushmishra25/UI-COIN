import * as React from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import img01 from "../../images/today-coins.webp";
import img02 from "../../images/tomorrow-coins.webp";
import img03 from "../../images/next-coins.webp";
import img2 from "../../images/gold-coin.svg";
import img3 from  "../../images/sega-coin.svg"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DailyReward = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme(); // Ensure useTheme is properly used here

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Demo 1
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="first_modal"
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            background: theme.palette.custom.black2_light2,
            color: theme.palette.custom.white_gray,
          }}
        >
          <DialogTitle id="customized-dialog-title">
            YOUR DAILY LOGIN REWARDS
          </DialogTitle>
          <Typography variant="h1" component="h5">
            Log in every day to keep your streak and get great rewards!
          </Typography>

          <Grid
            container
            spacing={{ xs: 4, sm: 3, md: 4 }}
            style={{ justifyContent: "center" }}
          >
            <Grid item xs={7}>
              <div className="modal_img_info">
                <img src={img01} />
                <div className="flex_div">
                  <Typography variant="p" component="h3">
                    <img src={img2} alt="logo" className="sidebar-coin" />
                    BC 1,500
                  </Typography>
                  <Typography variant="p" component="h3">
                    <img src={img3} alt="logo" className="sidebar-coin" /> RC
                    1,500
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={{ xs: 4, sm: 3, md: 4 }}
            style={{ justifyContent: "center" }}
          >
            <Grid item xs={5}>
              <div className="modal_img_info opacity_half">
                <img src={img02} />
                <div className="flex_div">
                  <Typography variant="p" component="h3">
                    <img src={img2} alt="logo" className="sidebar-coin" />
                    BC 1,500
                  </Typography>
                  <Typography variant="p" component="h3">
                    <img src={img3} alt="logo" className="sidebar-coin" /> RC
                    1,500
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className="modal_img_info opacity_half">
                <img src={img03} />
                <div className="flex_div">
                  <Typography variant="p" component="h3">
                    <img src={img2} alt="logo" className="sidebar-coin" />
                    BC 1,500
                  </Typography>
                  <Typography variant="p" component="h3">
                    <img src={img3} alt="logo" className="sidebar-coin" /> RC
                    1,500
                  </Typography>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button
                className="full_btn"
                size="medium"
                sx={{
                  background: theme.palette.custom.pink_bg,
                  color: theme.palette.custom.white_gray,
                }}
              >
                Claim My Rewards
              </Button>
            </Grid>

            <Typography variant="h1" component="h6">
              18+. No purchase necessary. Void where prohibited by law. <br />
              Terms of Service and Sweepstakes Rules apply. <br />
              Rewards are available 24 hours after the last claimed reward.
            </Typography>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default DailyReward;
