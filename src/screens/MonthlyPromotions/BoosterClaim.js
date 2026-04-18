import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import PaymentModal from "../BuyCoins/PaymentModal";

const BoosterClaim = ({ open, rewardData, onCloseMain, onCloseBooster }) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;

  const [payModal, setPayModal] = useState(false);
  const [selectedBooster, setSelectedBooster] = useState(null);
  const [coinPackages, setCoinPackages] = useState([]);
  const [paymentMode] = useState([]);

  const handleStartBoosterClaim = async () => {
    const packages = await getCoinPackageList();   
    const boostPackage = packages?.[0];
    
    if (boostPackage) {
      setSelectedBooster(boostPackage);
      setPayModal(true);
    } else {
      showErrorSnackbar("No booster package available.");
    }
    onCloseMain();
    onCloseBooster();
  };


  const getCoinPackageList = async () => {
    let url = `${endPoints.api.GET_BOOSTER_PACKAGES}`;
    try {
      const response = await getAllData(url);
      if (response?.status === "success" && response?.data?.length > 0) {
        const excludePackageIds = response?.data[0]?.exclude_package || [];

        const filteredPackages = response?.data?.filter(
          (item) => !excludePackageIds.includes(item?.id)
        );

        setCoinPackages(filteredPackages);
        return filteredPackages;
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const GetUserById = async () => {
    // This will be called by parent via onSuccess callback
    return;
  };

  // When open becomes true, fetch packages and open buy modal
  useEffect(() => {
    if (open && rewardData) {
      handleStartBoosterClaim();
    }
  }, [open]);

  return (
    <>
      {selectedBooster && (
        <PaymentModal
          open={payModal}
          onClose={() => {
            setPayModal(false);
            setSelectedBooster(null);
          }}
          selecteNewPackage={selectedBooster}
          getCoinPackageList={getCoinPackageList}
          GetUserById={GetUserById}
          paymentMode={paymentMode}
        />
      )}
    </>
  );
};

export default BoosterClaim;
