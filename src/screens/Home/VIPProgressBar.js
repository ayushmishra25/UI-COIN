import Check from "@mui/icons-material/Check";


import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { endPoints } from "../../constant/Environment";
import { getAllData } from "../../Utility/API";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";

const StepIconComponent = ({ active, completed, icon }) => {
  let bgColor = "#e0e0e0"; // default gray

  if (completed) {
    bgColor = "#03B349"; // light green
  } else if (active) {
    bgColor = "#03B349"; // green for active step
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 25,
        height: 25,
        borderRadius: "50%",
        backgroundColor: bgColor,
        color: completed || active ? "#fff" : "#000",
        fontWeight: "bold",
      }}
    >
      {completed ? <Check /> : icon}
    </Box>
  );
};

const VIPProgressBar = ({ activeStep = 2 }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [tiers, setTiers] = useState([]);
  const [vipdata, setVipData] = useState("");

  const fetchVipPackage = async () => {
    let url = `${endPoints.api.GET_VIP_PACKAGES}`;
    dispatch(setLoading(true));
    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.status === "success") {
          setTiers(response?.data);
        } else {
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  useEffect(() => {
    fetchVipPackage();
    VipData();
  }, []);

  const VipData = async () => {
    let url = `${endPoints.api.USER_VIP_LEVEL}/${loginData?.idUser}`;
    dispatch(setLoading(true));
    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.status == "success") {
          setVipData(response?.data);
        } else {
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  // console.log("tiers", tiers, "vio", vipdata);

  return (
    <Box
      sx={{
        maxWidth: "100%",
        padding: "8px 12px",
        overflowX: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontSize: "14px" }}>
       {t('vip.myVipLevel')}
      </Typography>
      <Stepper
        activeStep={vipdata?.level - 1  || 0}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-label": {
            fontSize: "12px",
            whiteSpace: "nowrap",
          },
        }}
      >
        {tiers.map((label) => (
          <Step key={label.level}>
          {/* <StepLabel>{label.packagename}</StepLabel> */}
            <StepLabel StepIconComponent={StepIconComponent}>{label.packagename}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default VIPProgressBar;
