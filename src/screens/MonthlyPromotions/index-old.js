import { 
  Box, 
  Grid, 
  Typography, 
  Button, 
  Paper, 
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { addBetData, addData, getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useDispatch, useSelector } from "react-redux";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import TimerButton from "../BuyCoins/TimerButton";
import { setFreeSpinGames } from "../../redux/Reducers/GlobalReducer/globalSlice";

const MonthlyPromotions = ({ open, onClose, rewardsData = [], userProgress = 1, fromHome = false, promotionName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData, isUserInAllowedRegion, isAuthenticated } = authState;

  // Get current day from API data
  const currentDay = IsLoginData?.dailyReward?.currentDay || 1;
  const [monthlyData, setMonthlyData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMonthlyPromotions();
  }, []);

const handleClose = () => {
  if (fromHome && IsLoginData?.idUser) {
    const userId = IsLoginData.idUser;
    const now = Date.now();

    localStorage.setItem(`monthlyPromoafterLogin_${userId}`, "true");
    localStorage.setItem(`monthlyPromoTimestamp_${userId}`, now.toString());
  }

  onClose();
};

  //  console.log("IsLoginData", IsLoginData);

  const fetchMonthlyPromotions = async () => {
    // setIsLoading(true);
    try {
      const url = `${endPoints.api.MONTHLY_REWARDS}`
      const response = await getAllData(url);
      if(response.status == "success"){
        setMonthlyData(response.data);
      }
      else{
        if(!fromHome) console.log("Failed to fetch monthly promotions data");
      }
    } catch (error) {
      console.error(error);
      if(!fromHome) console.log("Failed to fetch monthly promotions data.");
    } finally {
      // setIsLoading(false);
    }
  };


  // Helper function to format reward display
  const formatReward = (rewardType, rewardValue,boosterValue) => {
    switch (rewardType) {
      case 'SAGA_COIN':
        return { text: `${rewardValue} SC`, icon: '🥇', color: '#ff6b35' };
      case 'GOLD_COIN':
        return { text: `${rewardValue} GC`, icon: '🥇', color: '#ffd700' };
      case 'GIFTCARD':
        return { text: `$${rewardValue} Gift`, icon: '🎁', color: '#4caf50' };
       case 'BOOSTER':
        return { text: `${boosterValue ? boosterValue : ""}% Boost on buy`, icon: '🚀', color: '#ff9800' };  
      case 'FREE_SPIN':
        return { text: `${rewardValue ? rewardValue : ""} Free Spins`, icon: '🎰', color: '#9c27b0' };  
      default:
        return { text: `+${rewardValue}`, icon: '💰', color: '#2196f3' };
    }
  };

  // Generate days based on API data and current progress
  const generateDays = (currentDay, apiData) => {
    return apiData.map((item) => {
      const dayNumber = item?.dayNumber;
      const reward = formatReward(item?.rewardType, item?.rewardValue,item?.booster);
      
      return {
        id: item.id,
        day: dayNumber,
        title: item?.title,
        status: dayNumber < currentDay ? "claimed" : 
                dayNumber === currentDay ? "available" : "locked",
        reward: reward,
        rewardType: item?.rewardType,
        rewardValue: item?.rewardValue,
        isSpecial: item?.isSpecial,
        occasion: item?.occasion,
        multiplier: item?.multiplier,
        apiData: item 
      };
    });
  };

  const days = generateDays(currentDay, monthlyData);

  // console.log("days", days);

  // API function to claim daily reward
  const claimDailyReward = async (rewardId) => {
    // if()
    const url = `${endPoints.api.CLAIM_MONTHLY_REWARD}`;
    const data = {
      rewardId: rewardId?.id,
      userId: IsLoginData?.idUser
    };
    try{
      const response = await addData(url, data);
      if(response?.data?.status == "success"){
        showSuccessSnackbar(response?.data?.message || "Reward claimed successfully!");
        GetUserById();
        onClose();
        fetchFreeSpinGames();
      }
      else{
        showErrorSnackbar("Failed to claim reward, try after some time");
        onClose();
      }
    }
    catch(error){
      console.error("Claim reward error:", error);
      showErrorSnackbar("Failed to claim reward");
    }finally{  
    }
  };

  const fetchFreeSpinGames = async () => {
          try {
            const url = `${endPoints.api.RECENT_FREE_SPIN_GAMES}/${IsLoginData.idUser}`;
            const response = await getAllData(url);
            
            if (response?.status === "success" && response?.data) {
              dispatch(setFreeSpinGames(response.data));
            }
          } catch (error) {
            console.error("Error fetching free spin games:", error);
            dispatch(setFreeSpinGames([]));
          }
        };

   const GetUserById = async () => {
      try {
        if (IsLoginData?.idUser) {
          const url = `${endPoints.api.GET_BY_USERID}/${IsLoginData?.idUser}`;
          const response = await getAllData(url);
          dispatch(setLoginData({ user: response.data, isAuthenticated: true }));
        }
      } catch (error) {
        console.error(error);
      }
    };

  const claimedDays = IsLoginData?.dailyReward?.claimed ? currentDay : currentDay - 1;
  const totalDays = monthlyData.length;

  return (
    // IsLoginData?.dailyReward?.claimed == false &&
     monthlyData?.length > 0 && (
    <Dialog
      open={open}
      // onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        zIndex: 10101
      }}
      PaperProps={{
        sx: {
          background: "linear-gradient(135deg, #1a237e, #3949ab, #5c6bc0)",
          borderRadius: 3,
          position: "relative",
          overflow: "visible",
        }
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "rgba(255, 255, 255, 0.2)",
          color: "#fff",
          zIndex: 10,
          "&:hover": {
            background: "rgba(255, 255, 255, 0.3)",
          }
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ 
        p: 0, 
        overflow: "auto",
        '&::-webkit-scrollbar': { width: '8px', background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px' }
      }}>
        <Box sx={{ 
          display: "flex", 
          minHeight: isMobile ? "600px" : "650px",
          flexDirection: isMobile ? "column" : "row"
        }}>
          {/* Left Section - Daily Login Calendar */}
          <Box sx={{ 
            flex: 1, 
            p: isMobile ? 2 : 3,
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
            overflowY: "auto",
            '&::-webkit-scrollbar': { width: '6px', background: 'transparent' },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(255, 255, 255, 0.15)', borderRadius: '3px' }
          }}>
            {/* Header */}
            <Typography 
              variant={isMobile ? "h5" : "h4"}
              sx={{ 
                color: "#fff", 
                fontWeight: "bold", 
                mb: 1,
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
              }}
            >
             {promotionName || "Daily Prize Run"} 
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: "#e3f2fd", 
                mb: 3,
                background: "rgba(255, 255, 255, 0.1)",
                px: 2,
                py: 0.5,
                borderRadius: 2,
                display: "inline-block"
              }}
            >
              {claimedDays}/{totalDays} Claimed
            </Typography>

              {IsLoginData?.dailyReward?.claimed &&    <Typography 
              variant="subtitle1" 
              sx={{ 
                color: "#e3f2fd", 
                mb: 3,
                background: "rgba(255, 255, 255, 0.1)",
                px: 2,
                py: 0.5,
                marginLeft:{xs:0,md:2},
                borderRadius: 2,
                display: "inline-block"
              }}
            >
              Next Reward {" "}  <TimerButton
                                            initialTime={IsLoginData?.dailyReward?.timer}
                                            isDailyLoginClaim={IsLoginData?.dailyReward?.claimed}
                                          />
            </Typography>
            }

            {/* Calendar Grid */}
            <Grid container spacing={1}>
              {days?.map((dayData) => {
                const { day, status, reward, isSpecial } = dayData;
                return (
                <Grid item xs={4} sm={3} md={2} key={day}>
                  <Paper
                    sx={{
                      p: 1,
                      textAlign: "center",
                      background: status === "claimed"
                        ? "linear-gradient(135deg, #4caf50, #66bb6a)"
                        : status === "available"
                        ? `linear-gradient(135deg, ${reward.color}, ${reward.color}90)`
                        : "rgba(0, 0, 0, 0.4)",
                      color: "#fff",
                      borderRadius: 2,
                      position: "relative",
                      border: isSpecial ? "2px solid #ffeb3b" : "1px solid rgba(255,255,255,0.2)",
                      minHeight: isMobile ? "90px" : "80px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: status === "available" ? "pointer" : "default",
                      transform: status === "available" ? "scale(1.05)" : "scale(1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: status === "available" ? "scale(1.08)" : "scale(1.02)",
                      }
                    }}
                  >
                    {/* Special Badge */}
                    {isSpecial && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: -8,
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "linear-gradient(45deg, #ffeb3b, #ffc107)",
                          color: "#000",
                          px: 1,
                          py: 0.2,
                          borderRadius: 1,
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {dayData?.occasion || "Special"}
                      </Box>
                    )}

                    <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                      Day {day}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                      <Typography variant="body1" sx={{ fontSize: isMobile ? '14px' : '16px' }}>
                        {reward.icon}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: "bold",
                          color: status === "available" ? "#fff" : 
                                 status === "claimed" ? "#fff" : "#888",
                          fontSize: isMobile ? '9px' : '10px'
                        }}
                      >
                        {reward.text} {" "}{dayData?.rewardType=="GIFTCARD" 
                        || dayData?.rewardType=="BOOSTER" || dayData?.rewardType=="FREE_SPIN" ? "" : (`(${dayData?.multiplier || 1}x)`)}
                      </Typography>
                    </Box>
                    
                    {status === "available" && (
                      <Button
                        size="small"
                        disabled={IsLoginData?.dailyReward?.claimed && day === currentDay}
                        sx={{ 
                          mt: 0.5,
                          background: "#4caf50",
                          color: "black",
                          fontSize: isMobile ? "9px" : "10px",
                          minHeight: isMobile ? "18px" : "20px",
                          px: isMobile ? 0.5 : 1,
                          "&:hover": {
                            background: "#4caf50",
                          }
                        }}
                        onClick={() => { claimDailyReward(dayData); }}
                      >
                        {IsLoginData?.dailyReward?.claimed && day == currentDay ? isMobile ? "Claimed" : "Already Claimed" : "Claim Now"}
                      </Button>
                    )}
                    
                    {status === "claimed" && (
                      <Typography variant="body1" sx={{ color: "#fff" }}>
                        ✓
                      </Typography>
                    )}
                    
                    {status === "locked" && (
                      <Typography variant="body1" sx={{ color: "#666" }}>
                        ✕
                      </Typography>
                    )}
                  </Paper>
                </Grid>
                );
              })}
            </Grid>

            <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={12} sx={{ mt: 2,mb:1 }}>
              <Typography variant="h6">
                   Terms & Conditions
              </Typography>
              <Typography variant={{ xs: "body2", md: "body1" }} sx={{ color: "#ccc", mt: 1,lineHeight: 2 }}>
                1. Eligibility: The promotion is open to all registered SpinSaga Casino users.<br/>
                2. Promotion Period: The promotion will run for 30 days, starting from the day user opts-in.<br/>
                3. Daily Reward: Users must log in to SpinSaga Casino every day and claim their reward.<br/>
                4. Level System: The promotion has 30 levels. Users will level up every day they claim their reward, starting from Level 1 and progressing up to Level 30.<br/>
                5. Missed Claim: If a user misses claiming their reward for a day, their progress will reset to Level 1.<br/>
                6. Reward Structure: Rewards will be given based on the level achieved by the user.<br/>
                7. Maximum Reward: The maximum reward will be given on Level 30.<br/>
                8. Reward Distribution: Rewards will be credited to the user's account within 24 hours of claiming.<br/>
                9. Abuse: Any abuse or manipulation of the promotion will result in disqualification and forfeiture of rewards.<br/>
                10. Changes to Terms: SpinSaga Casino reserves the right to modify or cancel the promotion at any time without prior notice.<br/>
                11. Boost Reward: Certain levels may grant a Boost, which gives users extra bonus coins on all coin purchases for 24 hours after claiming.<br/>
                12. Free Spins: Certain levels may grant Free Spins, which can be used on selected games within a specified time period of 24 hours.<br/>
                By participating in this promotion, users acknowledge that they have read, understood, and agreed to these terms and conditions.
              </Typography>
            </Grid>
          </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
    )
  );
}

export default MonthlyPromotions;
