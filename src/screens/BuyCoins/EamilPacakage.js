import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PaymentModal from "./PaymentModal";
import goldcoinImg from "../../images/gold-coin.svg";
import sagacoinImg from "../../images/sega-coin.svg";
import logo from "../../images/logo.png";
import { endPoints } from "../../constant/Environment";
import { getAllData } from "../../Utility/API";
import { CoPresentOutlined } from "@mui/icons-material";

const EmailPackage = ({ open, onClose }) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData,isAuthenticated } = authState;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [payModal, setPayModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [packageData, setPackageData] = useState(null);

  // Mock package data - will be replaced with actual API call
  const mockPackages = {
    1: {
      id: 1,
      package_name: "Special Email Package",
      bonus_amount: 10000,
      package_amount: 5,
      purchase_price: 9.99,
      description: "This exclusive package is specially crafted just for you!",
    },
    2: {
      id: 2,
      package_name: "Premium Email Offer",
      bonus_amount: 25000,
      package_amount: 15,
      purchase_price: 24.99,
      description: "An amazing deal you won't want to miss!",
    },
  };

      const getEmailPackage = async (packageId) => {
          let url = `${endPoints.api.GET_EMAIL_PACKAGE}/${packageId}`;
          try {
            const response = await getAllData(url);
            if (response?.status === "success" && response?.data) {
              // API returns a single object, not an array
              return response.data;
            }
            return null;
          } catch (error) {
            console.error(error);
            return null;
          }
        };

        console.log("packageData",packageData);


  useEffect(() => {
    const fetchPackage = async () => {
      if (open) {
        // Get packageId from URL parameters
        const packageId = searchParams.get("packageId");
        
        if (packageId && isAuthenticated) {
          // TODO: Replace this with actual API call when endpoint is ready
          // const fetchedPackage = await getEmailPackage(packageId);
           const fetchedPackage = await getEmailPackage(packageId);   
          //  debugger;
           
          setPackageData(fetchedPackage);
          setShowCongratsModal(true);
        } else if (packageId && !isAuthenticated) {
          // Save the current URL to redirect back after login
          const currentUrl = window.location.pathname + window.location.search;
          sessionStorage.setItem("redirectAfterLogin", currentUrl);
          
          // Redirect to login
          navigate("/login");
          onClose();
        } else {
          // No packageId found
          onClose();
        }
      }
    };

    fetchPackage();
  }, [open, isAuthenticated]);

  const handleBuyNow = async () => {
    if (packageData) {
      setSelectedPackage(packageData);
      setShowCongratsModal(false);
      setPayModal(true);
    } else {
      showErrorSnackbar("Package data not available");
    }
  };

  const handleNoThanks = () => {
    setShowCongratsModal(false);
    onClose();
    navigate("/buy-coins");
  };

  const getCoinPackageList = async () => {
    // This will be called by SkrillOnlyModal if needed
    return [];
  };

  const GetUserById = async () => {
    // This will be called by parent via onSuccess callback
    return;
  };

  return (
    <>
      {/* Congratulations Modal */}
      <Dialog
        open={showCongratsModal}
        onClose={handleNoThanks}
        fullWidth
        maxWidth="sm"
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleNoThanks}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <DialogContent
          sx={{
            background: theme.palette.custom.black2_light2,
            color: theme.palette.custom.white_gray,
            textAlign: "center",
            py: 4,
            px: isXs ? 2 : 4,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <img 
              src={logo} 
              alt="logo" 
              style={{ 
                maxWidth: isXs ? "150px" : "200px",
                height: "auto" 
              }} 
            />
          </Box>

          <Typography 
            variant={{ md:"h4", xs:"h5" }} 
            component="h2"
            sx={{
              color: theme.palette.custom.red_light,
              fontWeight: "bold",
              mb: 2,
            }}
          >
            🎉 CONGRATULATIONS! 🎉
          </Typography>

          <Typography 
            variant="h6" 
            component="p"
            sx={{
            //   mb: 3,
              color: theme.palette.custom.white_gray,
            }}
          >
            This is a Special Package Just for You at
          </Typography>
            <Typography 
                  variant="h4"
                  sx={{
                    color: theme.palette.custom.green_green,
                    fontWeight: "bold",
                    mt: 1,
                  }}
                >
                  ${packageData?.purchase_price}
                </Typography>

          {packageData && (
            <>
              <Box
                sx={{
                  background: theme.palette.custom.black,
                  borderRadius: "12px",
                  p: 3,
                //   mb: 3,
                }}
              >
                {/* <Typography 
                  variant="h5" 
                  sx={{
                    color: theme.palette.custom.white,
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  {packageData.package_name}
                </Typography> */}

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={12}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                      {/* <img 
                        src={goldcoinImg} 
                        alt="bonus cash" 
                        style={{ width: "30px", height: "30px" }}
                      /> */}
                      <Typography 
                        variant="h5"
                        sx={{
                          color: theme.palette.custom.red_light,
                          fontWeight: "bold",
                        }}
                      >
                        {packageData?.bonus_amount?.toLocaleString()} Bonus Cash  
                        + {packageData?.package_amount}{" "} Free Bonus
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleBuyNow}
                    sx={{
                      backgroundColor: theme.palette.custom.green_green,
                      color: theme.palette.custom.white,
                      fontWeight: "bold",
                      py: 1.5,
                      fontSize: isXs ? "0.9rem" : "1rem",
                      "&:hover": {
                        backgroundColor: theme.palette.custom.green_green,
                        opacity: 0.9,
                      },
                    }}
                  >
                    Claim Now
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleNoThanks}
                    sx={{
                      borderColor: theme.palette.custom.white_gray,
                      color: theme.palette.custom.white_gray,
                      fontWeight: "bold",
                      py: 1.5,
                      fontSize: isXs ? "0.9rem" : "1rem",
                      "&:hover": {
                        borderColor: theme.palette.custom.white,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    No Thanks
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      {selectedPackage && (
        <PaymentModal
          open={payModal}
          onClose={() => {
            setPayModal(false);
            setSelectedPackage(null);
            onClose();
          }}
          selecteNewPackage={selectedPackage}
          getCoinPackageList={getCoinPackageList}
          GetUserById={GetUserById}
          paymentMode={[]}
        />
      )}
    </>
  );
};

export default EmailPackage;
