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

function InfoModal() {
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
      <div onClick={handleClickOpen} style={{ marginTop: "5px" }} className="sc-info">
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
          <img src={img3} alt="Sweepstakes Coins" style={{ height: 20 }} />
          <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
            {t('infoModal.whatAreSweepstakesCoins')}
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
            {/* <Grid item xs={12}>
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
                <Typography variant="h6">Bonus Cash</Typography>
              </div>
              <Typography style={{ paddingLeft: "8px" }}>
           
                <li>Play for Free – No Cost, No Real Money Involved.</li>
                <li>Grab Daily Rewards – Earn Bonus Cash Every Day!</li>
                <li>
                 Bonus Cash are for entertainment and Win Bonus Cash (GC) get converted to Real Cash (SC) at a rate of 10,000 GC = 0.10 SC
  
                </li>
              </Typography>
            </Grid> */}

            {/* Sweepstakes Coins Section */}
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <img
                  src={img3}
                  alt="Sweepstakes Coins"
                  style={{ height: 20, marginRight: 10 }}
                />
                <Typography variant="h6">{t('infoModal.sweepstakesCoins')}</Typography>
              </div>
              <Typography style={{ paddingLeft: "8px" }}>
                <li>{t('infoModal.completelyFree')}</li>
                <li>{t('infoModal.canBeExchanged')}</li>
                <li>{t('infoModal.scRedemption')}</li>
              </Typography>
            </Grid>

            {/* How to Get Free Sweepstakes Coins Section */}
            <Grid item xs={12}>
              <Typography
                variant="h1"
                component="div"
                className="box_gray"
                sx={{
                  backgroundColor: theme.palette.custom.lgray,
                }}
              >
                <Typography variant="h6">
                  {t('infoModal.howDoIGetFree')}&nbsp;
                  <Typography
                    sx={{
                      color: theme.palette.custom.green_green,
                    }}
                    variant="p"
                    component="span"
                  >
                    {t('infoModal.sweepstakesCoins')}
                  </Typography>
                  ?
                </Typography>
                <Typography style={{ paddingLeft: "8px" }}>
                  <li>{t('infoModal.loginDaily')}</li>

                  <li>{t('infoModal.referAFriend')}</li>
                  {/* <li>Social Competitions</li>
                <li>Mail-in Request</li> */}

                  <li>{t('infoModal.buyGoldCoins')}</li>
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 1,
                    color: theme.palette.text.secondary,
                  }}
                  className="privacy_text"
                >
                  {t('infoModal.promotionalNote')}{" "}
                  <a
                    href="/sweepstakes"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    {t('infoModal.sweepstakesRulesLink')}
                  </a>
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default InfoModal;
