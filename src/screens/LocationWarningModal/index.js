import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";

const LocationWarningModal = (props) => {
  const { open, onClose } = props;
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
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
        <Typography
          variant="h6"
          component="h3"
          sx={{ flexGrow: 1, color: "#ED1D51" }}
        >
          Restricted Territories
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
          <Box borderRadius={2} p={{ xs: 1, sm: 1 }} gap={2} sx={{ mb: 3 }}>
            <Typography
              fontWeight={400}
              fontSize={{ xs: "0.875rem", sm: "1rem" }}
            >
              Access to Social Gaming on play.spinsagacasino.com is restricted
              in the following jurisdictions:
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {/* <li>Canada: Ontario, Quebec</li> */}
                <li>
                  United States of America: Connecticut, Delaware, Idaho,
                  Kentucky, Louisiana, Maryland, Michigan, Mississippi, Nevada,
                  New York, Pennsylvania, Washington
                </li>
              </ul>
            </Typography>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default LocationWarningModal;
