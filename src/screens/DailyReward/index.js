import React, { useState } from "react";
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
import img3 from "../../images/sega-coin.svg";
import { addData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { useSnackbarContext } from "../../component/SnackbarContext";
import TodayClaimImg from "../../images/TodayClaim.png";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DailyReward = (props) => {
  const { openDailyRewards, closeRewardModal, selectedRefer } = props;
  const IsLoginData = useSelector((state) => state.auth.IsLoginData);
  const [loading, setLoading] = useState(false);
  const theme = useTheme(); // Ensure useTheme is properly used here
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  // console.log('selectedRefer',selectedRefer)
  // console.log('IsLoginData',IsLoginData)
  const ClaimDailyBouns = async () => {
    const data = {
      userId: IsLoginData?.idUser || null,
    };
    setLoading(true);
    const url = `${endPoints.api.GET_DAILY_CLAIM}`;
    const response = await addData(url, data);
    // console.log("response", response);
    setLoading(false);
    if (response.data.status == "success") {
      closeRewardModal(true);
    } else {
      showErrorSnackbar(response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={closeRewardModal}
        aria-labelledby="customized-dialog-title"
        open={openDailyRewards}
        className="first_modal"
      >
        <IconButton
          aria-label="close"
          onClick={closeRewardModal}
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
            Log in every day and get great rewards!
            {/* to keep your streak  */}
          </Typography>

          <Grid
            container
            spacing={{ xs: 4, sm: 3, md: 4 }}
            style={{ justifyContent: "center" }}
          >
            {loading && <Loader loading={loading} />}
            <Grid item xs={7}>
              <div className="modal_img_info">
                <img src={TodayClaimImg} />
                <div className="flex_div">
                  <Typography variant="p" component="h3">
                    <img src={img2} alt="logo" className="sidebar-coin" />
                    BC {selectedRefer?.gc_coin}
                  </Typography>
                  <Typography variant="p" component="h3">
                    <img src={img3} alt="logo" className="sidebar-coin" /> RC{" "}
                   {IsLoginData?.currentPackage?.daily_bouns_amount  || selectedRefer?.sc_coin}
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
            {/* <Grid item xs={5}>
              <div className="modal_img_info opacity_half">
                <img src={img02} />
                <div className="flex_div">
                  <Typography variant="p" component="h3">
                    <img src={img2} alt="logo" className="sidebar-coin" />
                    GC 1,500
                  </Typography>
                  <Typography variant="p" component="h3">
                    <img src={img3} alt="logo" className="sidebar-coin" /> SC
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
                    GC 1,500
                  </Typography>
                  <Typography variant="p" component="h3">
                    <img src={img3} alt="logo" className="sidebar-coin" /> SC
                    1,500
                  </Typography>
                </div>
              </div>
            </Grid> */}

            <Grid item xs={12}>
              <Button
                className="full_btn"
                size="medium"
                sx={{
                  background: theme.palette.custom.pink_bg,
                  color: theme.palette.custom.white_gray,
                  marginTop: 3,
                }}
                onClick={() => {
                  ClaimDailyBouns();
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
