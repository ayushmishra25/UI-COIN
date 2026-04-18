import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { BiHelpCircle } from "react-icons/bi";
import img2 from "../../images/gold-coin.svg";

function ReferFriendInfoModal() {
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
      <div
        onClick={handleClickOpen}
        style={{ marginTop: "5px" }}
        className="gc-info"
      >
        {/* <IoInformationCircle size={20} /> */}
        {"   "} <BiHelpCircle />
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
       
          <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
            {t("referFriendModal.title")}
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
              <Typography style={{ paddingLeft: "8px" }}>
                {/* component="ul" */}
                <li>{t("referFriendModal.benefit1")}</li>
                <li>
                  {" "}
                  {t("referFriendModal.benefit2")}
                </li>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReferFriendInfoModal;
