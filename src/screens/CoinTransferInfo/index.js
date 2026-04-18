import React, { useEffect, useState } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  IconButton,
  Button,
  TextField,
  DialogContent,
  Grid,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../../constant/Environment";
import { addData, getAllData } from "../../Utility/API";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { CircularProgress, Box } from "@mui/material";

const CoinTransferInfo = (props) => {
  const [infoModal, setInfoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enterAmount, setEnterAmount] = useState("");
  const { buttonSidebarClass } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const theme = useTheme();
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();

  useEffect(()=>{
    if(infoModal){
      setEnterAmount("");
    }

  },[infoModal])

  const InfoModalClose = () => {
    setInfoModal(false);
  };

  const CoinTransfer = async () => {
    // setLoading(true)
    const scbalanceNumber = Number(IsLoginData?.account?.balance);
    // Convert strings to numbers
    const amountNumber = Number(enterAmount);
    if (amountNumber > scbalanceNumber) {
      showErrorSnackbar(
        "Invalid entry: Value exceeds available Redeemable Real Cash."
      );
    } else {
      setLoading(true);
      try {
        const data = {
          userId: IsLoginData?.idUser || null,
          amount: amountNumber,
          coinType: "sc_credit",
          transferType: "Deposit",
        };
        const url = `${endPoints.api.COIN_TRNASFER}`;
        const response = await addData(url, data);
        setLoading(false);
        if (response?.data?.status == "success") {
          //   console.log("RESPOSNE", response);
          showSuccessSnackbar(response?.data?.message);
          props.mobileSideBar();
          GetUserById();
          setInfoModal(false);
        } else {
          showErrorSnackbar(response?.data?.message);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        showErrorSnackbar(
          "An error occurred while processing your request. Please try again later."
        );
      }
    }
  };

  const GetUserById = async () => {
    try {
      if (IsLoginData?.idUser) {
        const url = `${endPoints.api.GET_BY_USERID}/${IsLoginData?.idUser}`;
        const response = await getAllData(url);
        dispatch(setLoginData({ user: response?.data, isAuthenticated: true }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const gotoBuycoin = () => {
    props.mobileSideBar();
    setInfoModal(false);
    navigate("/buy-coins");
  };

  return (
    <>
      <div className="flex_between">
        <Button
          className={buttonSidebarClass}
          size="small"
          onClick={() => {
            // props.mobileSideBar();
            setInfoModal(true);
          }}
          sx={{
            background: theme.palette.custom.pink_bg,
            color: theme.palette.custom.white_gray,
          }}
        >
          Transfer Coins
        </Button>
      </div>
      <Dialog
        open={infoModal}
        onClose={InfoModalClose}
        fullWidth
        maxWidth="xs"
        id="locationRestrictedModal"
        className="location-modal"
        // BackdropProps={{
        //   style: {
        //     backdropFilter: "blur(5px)",
        //     backgroundColor: "rgba(0, 0, 0, 0.4)",
        //   },
        // }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.custom.white,
            color: theme.palette.custom.black_black,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bolder"
            textAlign="center"
            sx={{ flex: 1 }}
          >
            Transfer Coins
          </Typography>
          <IconButton
            onClick={InfoModalClose}
            sx={{ color: theme.palette.custom.black_black }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: theme.palette.custom.white,
            color: theme.palette.custom.black_black,
          }}
        >
          {/* {IsLoginData?.packagecount > 0  && ( */}
            
            <>
              <Grid item xs={12} md={5}>
                <Typography
                  variant="body1"
                  fontWeight="bolder"
                  align="left"
                  sx={{ color: theme.palette.custom.black_black }}
                >
                  Transfer Amount
                </Typography>
                <TextField
                  fullWidth
                  id="enterAmount"
                  name="amount"
                  placeholder="Enter Transfer Amount"
                  value={enterAmount}
                  onChange={(e) => {
                    setEnterAmount(e.target.value);
                  }}
                  type="text"
                  sx={{
                    color: "black",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#000", // Black border
                      },
                      "&:hover fieldset": {
                        borderColor: "#000", // Black border on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000", // Black border when focused
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#000", // Black text
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "black", // White placeholder text
                      fontWeight: "600",
                    },
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={5}>
                {/* {loading && <CircularProgress size={40} />} */}
                <Button
                  size="small"
                  onClick={() => {
                    CoinTransfer();
                  }}
                  sx={{
                    background: theme.palette.custom.pink_bg,
                    color: theme.palette.custom.white_gray,
                    marginTop: "20px",
                    width: "100%",
                  }}
                  disabled={enterAmount == "" || loading ? true : false}
                >
                  Submit
                </Button>
              </Grid>
            </>
         
          {/* )} */}

          {/* {IsLoginData?.packagecount < 1  && (
            <Typography
              variant="h6"
              textAlign="center"
              sx={{
                color: theme.palette.custom.black_black,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              To unlock coin transfer, purchase a coin pack of $3.99 or more.
              <Button
                size="small"
                onClick={() => {
                  gotoBuycoin();
                }}
                sx={{
                  background: theme.palette.custom.pink_bg,
                  color: theme.palette.custom.white_gray,
                  marginTop: "20px",
                  height: "40px",
                  borderRadius: "30px",
                  width: "140px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Buy Coins
              </Button>
            </Typography>
          )} */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CoinTransferInfo;
