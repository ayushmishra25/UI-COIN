import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  IconButton,
  useTheme,
  CircularProgress,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { endPoints } from "../../constant/Environment";
import { getAllData } from "../../Utility/API";

const FreeSpinModal = ({ open, onClose, packages = [],freeSpinGames, loading = false }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;


  const handleBuy = () => {
    if (onClose) onClose();
    navigate("/buy-coins");
  };

  return (
    <Dialog
      open={!!open}
      onClose={onClose}
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
         Your Free Spins games
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
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                <CircularProgress size={25} sx={{ color: theme.palette.custom?.green01 }} />
              </Box>
            ) : (
              <Typography style={{ paddingLeft: "8px" }}>
                {freeSpinGames?.length === 0 ? (
                  <Typography>
                    You don't have any Free Spin games. Buy packages or claim rewards from Daily Streak to get free spins and enhance your gaming experience!
                  </Typography>
                ) : (
                  <>
                    {freeSpinGames?.map((game) => (
                      <li key={game?.game_id}>
                        <Typography variant="body1">
                          {game?.game_name} - Congratulations! You have <strong>UNLOCKED</strong> {game?.freeSpinCount} Free Spins
                        </Typography>
                      </li>
                    ))}
                  </>
                )}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          justifyContent: "center",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {!loading && freeSpinGames?.length === 0 && (
        <Button
          variant="contained"
          onClick={handleBuy}
          sx={{
            background: theme.palette.custom?.red,
            color: "#fff",
            textTransform: "none",
            px: 4,
          }}
        >
          Deposit
        </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default FreeSpinModal;