import { useEffect, useState, useMemo } from "react";
import { isMobile } from "react-device-detect";
import Joyride from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getAllBetData } from "../../Utility/API";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { endPoints } from "../../constant/Environment";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { setIsDrawerOpen } from "../../redux/Reducers/sidebarReducer/sidebarSlice";

const ProtectedLayoutTour = () => {
  const { t } = useTranslation();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const [run, setRun] = useState(false); // Start as false
  const dispatch = useDispatch();
  const { showErrorSnackbar } = useSnackbarContext();
  
  const steps = useMemo(() => [
    {
      target: ".gc-info",
      content: t('tourGuide.gcCoins'),
      placement: "right",
    },
    {
      target: ".sc-info",
      content: t('tourGuide.sagaCoins'),
      placement: "right",
    },
    {
      target: ".btn-buy-coins",
      content: t('tourGuide.buyCoins'),
      placement: "right",
    },
    {
      target: ".btn-redeem",
      content: t('tourGuide.redeem'),
      placement: "right",
    },
    // {
    //   target: ".btn-transfer-coins",
    //   content: t('tourGuide.coinTransfer'),
    //   placement: "right",
    // },
    {
      target: ".btn-vvip-status",
      content: t('tourGuide.vvipStatus'),
      placement: "right",
    },
    {
      target: ".btn-profile",
      content: t('tourGuide.profile'),
      placement: "left",
    },
  ], [t]);

  const mobileSteps = useMemo(() => [
    {
      target: ".gc-info",
      content: t('tourGuide.gcCoins'),
      placement: "right",
    },
    {
      target: ".sc-info",
      content: t('tourGuide.sagaCoins'),
      placement: "right",
    },
    {
      target: ".btn-buy-coins",
      content: t('tourGuide.buyCoins'),
      placement: "right",
    },
    {
      target: ".btn-redeem",
      content: t('tourGuide.redeem'),
      placement: "right",
    },
    // {
    //   target: ".btn-transfer-coins",
    //   content: t('tourGuide.coinTransfer'),
    //   placement: "right",
    // },
    {
      target: ".btn-vvip-status",
      content: t('tourGuide.vvipStatus'),
      placement: "right",
    },
  ], [t]);

  // Start the tour after DOM is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      if (IsLoginData?.skip_popup) {
        setRun(false);
      } else {
        setRun(true);
      }
    }, 500); // Small delay to ensure elements exist
    return () => clearTimeout(timer);
  }, [IsLoginData]);

  // Called when the tour is finished or skipped
  const handleTourFinish = async () => {
    console.log("Tour finished! You can trigger your custom logic here.");
    // closeModal();
    const url = `${endPoints.apiBaseUrl}${endPoints.api.SKIP_POPUP}/${IsLoginData?.idUser}/true`;
    const response = await getAllBetData(url);
    if (response?.status == "success") {
      dispatch(setLoginData({ user: response.data, isAuthenticated: true }));
      if (isMobile) {
        dispatch(setIsDrawerOpen(false));
      }
    } else {
      // showErrorSnackbar(response?.message);
    }
  };

  // Joyride callback handler
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ["finished"]; //"skipped"
    const finishedStatuses1 = ["skipped"]; //"skipped"
    if (finishedStatuses.includes(status)) {
      handleTourFinish();
    } else if (finishedStatuses1.includes(status)) {
      if (isMobile) {
        dispatch(setIsDrawerOpen(false));
      }
    }
  };

  return (
    <>
      {run && (
        <Joyride
          steps={isMobile ? mobileSteps : steps}
          continuous
          run={run}
          scrollOffset={300}
          scrollToFirstStep
          showProgress
          showSkipButton
          disableOverlayClose
          spotlightClicks={false}
          callback={handleJoyrideCallback}
          floaterProps={{
            autoOpen: true,
            offset: 15,
            placement: "bottom-start",
            hideArrow: false,
            styles: {
              arrow: {
                color: "#fff",
              },
              floater: {
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
              },
            },
          }}
          styles={{
            options: {
              zIndex: 10000,
            },
            spotlight: {
              borderRadius: "8px",
              boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.8)",
              padding: 4,
            },
          }}
        />
      )}
    </>
  );
};

export default ProtectedLayoutTour;
