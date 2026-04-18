import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllData, getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { Helmet } from "react-helmet";

const Kycverification = () => {
  let params = new URLSearchParams(window.location.search);
  let userId = params.get("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    kycverification();
  }, []);

  const kycverification = async () => {
    let url = `${endPoints.apiBaseUrl}${endPoints.api.kyc_verify}${userId}`;
    try {
      const res = await fetchAllData(url);
      const response = await res.json();
      if (response?.status === "success") {
        await GetUserById(userId);
        if(response?.data?.validation == "1"){
          navigate("/kyc-approved");
        }
        else{
          navigate('/');
        }

      }
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  const GetUserById = async (userId) => {
    try {
      const url = `${endPoints.api.GET_BY_USERID}/${userId}`;
      const response = await getAllData(url);
      dispatch(setLoginData({ user: response.data, isAuthenticated: true }));
    } catch (error) {
      console.log(error);
    }
  };

  return <div style={{ marginTop: "300px" }}>
        <Helmet>
          <title>Complete KYC Verification - Spinsaga Casino</title>
          <meta name="description" content="Verify your identity to enjoy full access to Spinsaga Casino’s features and rewards." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
  </div>;
};

export default Kycverification;
