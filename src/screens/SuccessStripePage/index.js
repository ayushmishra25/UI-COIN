import React, { useEffect, useState } from "react";
import { useFetcher, useSearchParams } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { addBetData, addData, getAllData } from "../../Utility/API";
import { endPoints, PaymentEndpoints } from "../../constant/Environment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SucccesImage from "../../images/success.png";
import { Box, Typography, Container, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import ErrorImage from "../../images/exclamation.svg";

const SuccessStripePage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const orderId = searchParams.get("order_id");
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();
  const paymentIntentId = searchParams.get("payment_intent_client_secret");
  const sessionId = searchParams.get("sessionId");
  const envName = searchParams.get("env");
  const paymentStatus = searchParams.get("redirect_status");
  // console.log("paymentStatus", paymentStatus);
  //succeeded
  //failed

  const loginData = useSelector((state) => state.auth.IsLoginData);
  useEffect(() => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements not initialized");
      return;
    }
    // If paymentIntentId exists, retrieve payment intent
    if (paymentIntentId) {
      retrievePaymentIntent(paymentIntentId);
    }
  }, [stripe, elements, paymentIntentId]);

  const RandomRefNum = (prefix) => {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return `${prefix}_${randomNum}`;
  };
  const retrievePaymentIntent = async (paymentIntentId) => {
    const merchantRefNum = RandomRefNum(`spinsaga_${loginData?.idUser}`);
    try {
      const paymentIntent = await stripe.retrievePaymentIntent(paymentIntentId);
      console.log("Payment Intent Details:", paymentIntent);

      let payload = {
        // merchantRefNum: merchantRefNum,
        id_user: 0,
        id_payment: paymentIntent.paymentIntent.client_secret,
        paymentHandleToken: paymentIntent.paymentIntent.client_secret,
        txnTime: "",
        status: paymentIntent.paymentIntent.status,
        transaction_id: paymentIntent.paymentIntent.id,
        pay_from_email: loginData?.email || "", //paymentIntent.paymentIntent.receipt_email, // "test@gmail.com",
        pay_to_email: "",
        merchant_id: paymentIntent.paymentIntent.id,
        sid: "",
        usersession: sessionId,
      };
      let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.CONFIRM_PAYMENT_METHOD}`;
      const result = await addBetData(url, payload);
      // console.log("final payment", result);
      GetUserById();
    } catch (error) {
      console.error("Error retrieving payment intent:", error);
    }
  };

  const GetUserById = async () => {
    try {
      const url = `${endPoints.api.GET_BY_USERID}/${loginData?.idUser}`;
      const response = await getAllData(url);
      dispatch(setLoginData({ user: response?.data, isAuthenticated: true }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>
        Payment {paymentStatus == "succeeded" ? "Successful!" : "Failed !"}
      </h1>
      <p>
        {paymentStatus == "succeeded"
          ? "Thank you for your payment."
          : "Please try again."}
      </p>

      <Box
        component="img"
        src={paymentStatus == "succeeded" ? SucccesImage : ErrorImage}
        alt="Success"
        sx={{
          maxWidth: "100%",
          height: "auto",
          width: "300px", // You can adjust this value to control the image size
        }}
      />
      {paymentStatus == "succeeded" ? (
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "2rem" }}
          onClick={() => {
            navigate("/purchase-history");
          }}
        >
          Go to Purchase History
        </Button>
      ) : null}
    </Container>
  );
};

export default SuccessStripePage;
