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
import { IoInformationCircle } from "react-icons/io5";
import { BiHelpCircle } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import logo from "../../images/logo.png";
import img2 from "../../images/gold-coin.svg";
import img3 from "../../images/sega-coin.svg";
import "./infoStyle.css";

function GcInfoModal() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleClickOpen} style={{ marginTop: "5px" }} className="gc-info">
        {/* <IoInformationCircle size={20} /> */}
        <BiHelpCircle  />
      </div>

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
          <img src={img2} alt="Sweepstakes Coins" style={{ height: 20 }} />
          <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
            {t('gcInfoModal.whatAreGoldCoins')}
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
            {/* Bonus Cash Section */}
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <img
                  src={img2}
                  alt="Bonus Cash"
                  style={{ height: 20, marginRight: 10 }}
                />
                <Typography variant="h6">{t('gcInfoModal.goldCoins')}</Typography>
              </div>
              <Typography style={{ paddingLeft: "8px" }}>
                {/* component="ul" */}
                <li>{t('gcInfoModal.playForFree')}</li>
                <li>{t('gcInfoModal.grabDailyRewards')}</li>
                <li>
                 {t('gcInfoModal.gcConversion')}
                  {/* Bonus Cash are for entertainment only and cannot be converted
                  into real money or prizes. */}
                </li>
              </Typography>
            </Grid>

       
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GcInfoModal;
