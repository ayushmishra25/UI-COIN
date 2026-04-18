import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useTheme,
  Alert,
  InputAdornment,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";

const NowPaymentModal = (props) => {
  const { open, onClose, selecteNewPackage, paymentUrl, paymentInfo } = props;
  const theme = useTheme();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    const addr = paymentInfo?.data?.pay_address || "";
    if (!addr) return;
    try {
      await navigator.clipboard.writeText(addr);
      setCopied(true);
    } catch (e) {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = addr;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
    }
  };
  const fullName = `${loginData.name} ${loginData.surname}`;
  console.log("paymentStatus", paymentInfo);

  return (
    <>
      <Dialog
        open={open}
        // onClose={onClose}
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
            spacing={2}
            sx={{
              height: "70vh",
              overflow: "hidden",
              p: 2,
            }}
          >
            <Grid item xs={12}>
              <Alert severity="info" variant="outlined">
                {paymentInfo?.message
                  ? `${paymentInfo.message} Please do not close this modal or your browser until the payment is complete.`
                  : "Complete your payment using the address below. Please do not close this modal or your browser until the payment is complete."}

                {paymentInfo?.data?.estimatedAmount ? (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                     Amount:&nbsp;
                    <Typography component="span" variant="body2" sx={{ fontWeight: 700 }}>
                     ${paymentInfo.data.estimatedAmount.toFixed(2)}
                    </Typography>
                  </Typography>
                ) : null}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Payment Address"
                value={paymentInfo?.data?.pay_address || ""}
                fullWidth
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Copy address">
                        <IconButton
                          aria-label="copy address"
                          onClick={handleCopyAddress}
                          edge="end"
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  },
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, display: "block" }}
              >
                Click the copy icon to copy the payment address.
              </Typography>
            </Grid>
          </Grid>

          <Snackbar
            open={copied}
            autoHideDuration={2000}
            onClose={() => setCopied(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setCopied(false)}
              severity="success"
              variant="filled"
              sx={{ width: "100%", color: "white" }}
            >
              Payment address copied to clipboard!
            </Alert>
          </Snackbar>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NowPaymentModal;
