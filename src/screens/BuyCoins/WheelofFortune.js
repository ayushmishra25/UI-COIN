import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { endPoints } from "../../constant/Environment";
import { addBetData, addData, getAllData } from "../../Utility/API";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";

const WheelOfFortune = ({ open, handleClose, wofdata }) => {
  const theme = useTheme();
  const IsLoginData = useSelector((state) => state.auth.IsLoginData);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(null);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const [spinResult, setSpinResult] = useState(null);
  const [showTripleOffer, setShowTripleOffer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [packageData, setPackageData] = useState({
    multiplier: null,
    package: null,
  });

  const {
    segments = [],
    probabilities = [],
    colors = [],
    multipliers = [],
    packages = [],
    enables = [],
  } = wofdata || {};

  // const segments = ["0.1 SC", "0.2 SC", "100 GC", "500 GC", "5 SC", "10 SC"];
  // const probabilities = [95, 1, 1, 1, 1, 1];

  const dispatch = useDispatch();

  const colors2 = [
    "#22C55E", // Green - 0.1 SC
    "#3B82F6", // Blue - 0.2 SC
    "#FACC15", // Yellow - 1 SC
    "#A855F7", // Purple - 2 SC
    "#F97316", // Orange - 10 SC
    "#10B981", // Teal - 100 GC
    "#7C3AED", // Violet - 500 GC
    "#FFD700", // Gold with Sparkles - 2500 GC
    "#EF4444", // Very Light Red - Better Luck Next Time
  ];

  const data = segments.map((segment, index) => ({
    option: segment,
    style: { backgroundColor: colors[index], textColor: "#000" },
  }));

  const handleSpin = () => {
    // Convert probabilities into cumulative distribution
    const cumulative = probabilities?.reduce((acc, prob, i) => {
      acc.push((acc[i - 1] || 0) + prob);
      return acc;
    }, []);

    // Generate a random number between 0 and 100
    const rand = Math.random() * 100;

    // Find the corresponding index
    const randomIndex = cumulative.findIndex((value) => rand < value);

    setPrizeIndex(randomIndex);
    setMustSpin(true);
  };

  const getMultiplierAndPackage = (segmentValue) => {
    const index = wofdata?.segments?.findIndex(
      (s) => s.trim() === segmentValue.trim()
    );

    if (index !== -1) {
      return {
        multiplier: multipliers[index],
        package: packages[index],
      };
    }

    return { multiplier: null, package: null };
  };

  const ClaimDailyBonus = async (value) => {
    const data = {
      userId: IsLoginData?.idUser || null,
      coinResult: value == "Try Tomorrow" ? "0 GC" : value,
    };
    setLoading(true);
    const url = `${endPoints.api.GET_SPIN_PRIZE}`;
    try {
      const response = await addData(url, data);
      if (response?.data?.status == "success") {
        GetUserById();
        showSuccessSnackbar(
          response?.data?.message ||
            "Rewarded coins have been credited to your account. Enjoy!"
        );
      } else {
        showErrorSnackbar(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      showErrorSnackbar("Failed to claim daily bonus. Please try again.");
      console.error("ClaimDailyBonus Error:", error);
    } finally {
      setLoading(false); // Ensures loading state is cleared no matter what
    }
  };

  const GetUserById = async () => {
    try {
      const url = `${endPoints.api.GET_BY_USERID}/${IsLoginData?.idUser}`;
      const response = await getAllData(url);
      dispatch(setLoginData({ user: response?.data, isAuthenticated: true }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSpinStop = () => {
    setMustSpin(false);

    const amount = segments[prizeIndex];
    setSpinResult(amount);

    const result = getMultiplierAndPackage(amount);
    setPackageData(result);

    const shouldOfferMultiplier = enables[prizeIndex];

    if (shouldOfferMultiplier) {
      setShowTripleOffer(true);
      setShowModal(true);
      handleClose();
    } else {
      ClaimDailyBonus(amount);
      handleClose();
    }
  };

  const handleTripleClaim = async (value) => {
    const data = {
      userId: IsLoginData?.idUser || null,
      coinResult: value,
    };
    setLoading(true);
    const url = `${endPoints.api.MULTIPLIER_CLAIM}`;
    try {
      const response = await addData(url, data);
      if (response?.data?.status == "success") {
        GetUserById();
        showSuccessSnackbar(
          response?.data?.message ||
            "Multiplier offer accepted. Complete your purchase to claim the upgraded reward!"
        );
      } else {
        showErrorSnackbar(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      showErrorSnackbar("Failed to claim daily bonus. Please try again.");
      console.error("ClaimDailyBonus Error:", error);
    } finally {
      setLoading(false); // Ensures loading state is cleared no matter what
    }
  };

  return (
    <>
      <Dialog
        open={showTripleOffer && spinResult != null}
        // onClose={() => setShowTripleOffer(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "black", // translucent dark card
            color: "#fff",
            // borderRadius: 3,
            p: 2,
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)",
          },
        }}
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Congratulations You Just Won <strong>{spinResult}</strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Want to multiply and double your win?
            <br />
            Buy Package <strong>{packageData?.package}</strong> or up → Get{" "}
            <span style={{ color: "#FFD700", fontWeight: "bold" }}>
              {packageData?.multiplier}
            </span>{" "}
            reward
          </Typography>

          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleTripleClaim(spinResult);
                setShowTripleOffer(false);
                setPrizeIndex(null);
              }}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                ClaimDailyBonus(spinResult);
                setShowTripleOffer(false);
                setPrizeIndex(null);
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Dialog
        open={open}
        onClose={() => {
          setPrizeIndex(null);
          handleClose();
        }}
        maxWidth="sm"
        fullWidth
      >
        <Box
          sx={{
            background: "radial-gradient(circle at center, #0a0a23 40%, #000)",
            color: "#fff",
            textAlign: "center",
            padding: 2,
            position: "relative",
            overflowX: "hidden",
            overflowY: "hidden",
            paddingBottom: "50px",
            height: "120%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onClick={() => {
              setPrizeIndex(null);
              handleClose();
              setShowTripleOffer(false);
            }}
            sx={{ position: "absolute", right: 10, top: 10, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            Spin & Win!
          </Typography>

          {/* Wheel and Centered Spin Button */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
            mt={2}
          >
            <Box
              sx={{
                border: "8px solid #FFD700",
                borderRadius: "50%",
                padding: 1,
                backgroundColor: "#111",
              }}
            >
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeIndex}
                data={data}
                onStopSpinning={() => {
                  // setMustSpin(false);
                  // ClaimDailyBonus(segments[prizeIndex]);
                  handleSpinStop();
                }}
                outerBorderColor="#FFD700"
                radiusLineColor="#fff"
                radiusLineWidth={1}
                outerBorderWidth={4}
                pointerProps={{
                  style: {
                    // top: -10,
                    // width: "0",
                    // height: "0",
                    // borderLeft: "10px solid transparent",
                    // borderRight: "10px solid transparent",
                    // borderBottom: "20px solid white",
                    // position: "absolute",
                    // left: "50%",
                    // transform: "translateX(-50%)",
                  },
                }}
              />
            </Box>
            {/* {!mustSpin && ( */}
            {prizeIndex == null && (
              <Button
                onClick={handleSpin}
                variant="contained"
                sx={{
                  position: "absolute",
                  backgroundColor: "#ff004c",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "4px solid #fff",
                  borderRadius: "50%",
                  width: 90,
                  height: 90,
                  zIndex: 10,
                  textTransform: "uppercase",
                  boxShadow: "0 0 15px #ff004c",
                }}
              >
                Spin
              </Button>
            )}
          </Box>

          {/* {prizeIndex !== null && !mustSpin && (
          <h3>
            {segments[prizeIndex] == "Try Tomorrow"
           ? "Better Luck Next Time!"
         : `Congratulations! You won ${segments[prizeIndex]}.`}
          </h3>
        )} */}
        </Box>
      </Dialog>
    </>
  );
};

export default WheelOfFortune;
