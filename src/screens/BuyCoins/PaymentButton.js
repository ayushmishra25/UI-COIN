import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Button,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import skrill from "../../images/SkrillLogo.png";
import "./infoStyle.css";
import { Link } from "react-router-dom";
import { endPoints, PaymentEndpoints } from "../../constant/Environment";
import { useSelector, useDispatch } from "react-redux";
import { setFreeSpinGames, setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { getAllData, addData, addBetData } from "../../Utility/API";
import { SkrillEnv } from "../../constant/SkrillEnv";
import Loader from "../../component/Loader";
import { useNavigate } from "react-router-dom";
import LocationWarningModal from "../LocationWarningModal";
const PaymentButton = (props) => {
  const {
    // open,
    // onClose,
    // selecteNewPackage,
    item,
    getCoinPackageList,
    GetUserById,
    className,
    allowOnPress = false,
    handleOnPress,
    showPayNow = false,
    closeModal,
    style,
  } = props;
  const [stripeOpen, setStripeOpen] = useState(false);
  const [locationModal, setLocationModal] = useState(false); // location modal
  const theme = useTheme();
  // console.log("selecteNewPackage", selecteNewPackage);
  //   const { goldcoins, purchase_price } = selecteNewPackage;
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const authState = useSelector((state) => state.auth);

  const { isAuthenticated, isUserInAllowedRegion } = authState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const selecteNewPackage = {};
  const payBySkrill = (item) => {
    if (item) {
      const merchantRefNum = RandomRefNum(`spinsaga_${loginData?.idUser}`);
      SavePackageInfo(item.purchase_price, merchantRefNum, item);
    }
  };

  const RandomRefNum = (prefix) => {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return `${prefix}_${randomNum}`;
  };

  const applePay = {
    accountId: SkrillEnv.accountId,
    // "1002783170",
    label: "Pay With Apple",
    requestShippingAddress: true,
    requestBillingAddress: false,
    type: "buy",
    color: "white-outline",
  };

  const notApplePay = {};
  const resultApplePay = applePay;

  const SavePackageInfo = async (
    depositamount,
    referenceNo,
    selectedPackage
  ) => {
    let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.SKRILL_ADD}`;
    setLoading(true);
    let data = {
      id_skrill_wallet_transaction: 0,
      merchantRefNum: referenceNo,
      id_user: loginData?.idUser,
      amount: Number((depositamount * 100).toFixed(2)),
      currencyCode: "USD",
      paymentHandleToken: "",
      pay_from_email: "",
      bonus_amount: selectedPackage.bonus_amount,
      package_amount: selectedPackage.package_amount,
      packagename: selectedPackage.package_name,
      packageId: selectedPackage.id,
    };
    try {
      let response = await addBetData(url, data);
      if (response?.data?.status == "success") {
        // onClose();
        // `${SkrillEnv.keys}`;
        // skrill modal script
        window.paysafe.checkout.setup(
          SkrillEnv.keys,
          {
            currency: "USD", // 4 currencies currently supported by Paysafe Checkout - "USD", "CAD", "EUR", "GBP"
            // amount: depositamount * 100, // This qualifies as USD $ 100.00. Multiply Payment Amount by 100 and supply here.
            amount: Number((depositamount * 100).toFixed(2)), // This qualifies as USD $ 100.00. Multiply Payment Amount by 100 and supply here.
            payout: false, // payout: true --> for Withdrawal (standalone credits); payout: false --> for Payments/Deposit
            payoutConfig: {
              // payoutConfig section required only when payout: true [for Withdrawal cases].
              maximumAmount: 100000000,
            },
            locale: "en_US",
            simulator: "EXTERNAL",
            imageUrl:
              "https://hosted.paysafe.com/checkout/resource/demo-store/images/logo.png", // Supply Your Logo URL here.
            environment: SkrillEnv.Env, // environment: "LIVE" --> Production, "TEST" --> test environment for customers to try out Checkout & its features
            buttonColor: "#66cc99", // feel free to change the color of buttons (RGB value)
            companyName: "Bettdraft", // Supply Your Company Name here
            holderName: "John Smith", // Supply Customer's Name here
            customer: {
              firstName: loginData?.name,
              lastName: loginData?.surname,
              email: loginData?.email,
              phone: loginData?.mobile,
              dateofBirth: loginData?.birthDate,
            },
            billingAddress: {
              // Supply customer's billing Address here.
              nickName: loginData?.name,
              street: loginData?.address,
              city: loginData?.town,
              zip: loginData?.zipCode,
              country: loginData?.country,
              state: loginData?.stateCode,
            },
            merchantRefNum: referenceNo, // Will be unique and must keep changing every transaction
            canEditAmount: false, // Makes the payment amount editable on Checkout screen. Make it false to open Checkout with a fixed non-editable amount.
            merchantDescriptor: {
              dynamicDescriptor: "SpinSageCasino",
              phone: "1234567890",
            },
            displayPaymentMethods: [
              "neteller",
              "skrill",
              "paysafecard",
              "paysafecash",
              "instantach",
              "paypal",
              "card",
              "vippreferred",
              "sightline",
              "ach",
              "eft",
              "applePay",
            ],
            // displayPaymentMethods : Array serves two purposes. You can use it to restrict the payment methods that a customer can see.
            // You can also use it to order the payment methods based on your preference.
            // If this field is present, the customer will only see those payment methods in the order specified, hence,
            // Ensure that you provide all payment methods if you are using it only for the purpose of payment method ordering.
            paymentMethodDetails: {
              // Please read the Checkout Objects Documentation on developer.paysafe.com .....
              paysafecard: {
                // .... for details on paymentMethodDetails (including all supported mandatory and optional fields)
                consumerId: "123456",
              },
              //apple pay code start
              applePay: {
                accountId: SkrillEnv.accountId,
                // "1002783170",
                label: "Pay With Apple",
                requestShippingAddress: true,
                requestBillingAddress: false,
                type: "buy",
                color: "white-outline",
              },
              // resultApplePay,
              //apple pay code end
              paysafecash: {
                consumerId: "123456",
              },
              sightline: {
                consumerId: "12341231256",
                SSN: "123456789",
                last4ssn: "6789",
                //accountId: "1009688222"  // Supply Account ID only if multiple accounts are configured with same payment method
              },
              vippreferred: {
                consumerId: "120288765",
                //accountId: "1679688456"  // Supply Account ID only if multiple accounts are configured with same payment method
              },
              card: {
                accountId: SkrillEnv.accountId,
                //"284006353"
                //  SkrillEnv.accountId //use this account id to enabled the card optin onn prod
                // "284006353",
                // Supply Account ID only if multiple accounts are configured with same payment method
              },
              skrill: {
                consumerId: loginData?.email,
                emailSubject: "Payout for Greg Neteller",
                emailMessage: "You Have Received Payout of $100.",
              },
              instantach: {
                consumerId: "john.doe@email.com",
                paymentId: "3aeb9c63-6386-46a3-9f8e-f452e722228a",
                emailSubject: "Instant ACH Payout",
                emailMessage:
                  "Your Instant ACH Payout request has been processed",
              },
              neteller: {
                consumerId: "netellertest_EUR@neteller.com",
                recipientDescription: "logo_url_alt_text",
                logoUrl: "http://www.paysafe.com/icon.jpg",
              },
            },
            skip3ds: true,
            threeDs: {
              //Required for 3DS2
              authenticationPurpose: "PAYMENT_TRANSACTION",
              deviceChannel: "BROWSER",
              merchantUrl: "https://play.spinsagacasino.com/",
              // "https://api.qa.paysafe.com/checkout/v2/index.html#/desktop",
              messageCategory: "PAYMENT",
            },
          },
          function (instance, error, result) {
            console.log("result", result, "error", error);
            if (result && result.paymentHandleToken) {
              setLoading(false);
              instance.close();
              SkrillPay(
                result?.amount,
                referenceNo,
                result?.paymentHandleToken,
                selectedPackage
              );
            } else if (result.paymentHandleToken == null) {
              SkrillFailed(depositamount, referenceNo);
              setLoading(false);
              instance.close();
            } else {
              // alert(error);
              console.log("error");
              showErrorSnackbar(error);
              setLoading(false);
            }
            if (result.token) {
              //alert(""Payment Token (Returned By Paysafe GW): "" + result.token);
              console.log(result.token);
              // pass this token to server to make the payment or payout using Paysafe Payments API.
            }
          },
          function (stage, expired) {
            setLoading(false);
            switch (stage) {
              case "PAYMENT_HANDLE_NOT_CREATED": // Handle the scenario
              case "PAYMENT_HANDLE_CREATED": // Handle the scenario
              case "PAYMENT_HANDLE_REDIRECT": // Handle the scenario
              case "PAYMENT_HANDLE_PAYABLE": // Handle the scenario
              default: // Handle the scenario
            }
          },
          function (instance, amount, paymentMethod) {
            setLoading(false);
            // use parameters amount and payment method to do riskCheck
            // Applicable to only Cards, PaySafe Cash, VIPP and Sightline
            if (amount == 2000) {
              instance.decline("Please use amount less than 100");
              // showErrorSnackbar("Please use amount less than 100");
            } else {
              instance.accept();
            }
          }
        );
      } else {
        showErrorSnackbar(response.data.message);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      showErrorSnackbar(
        "Issue connecting to server (error code 15). Please contact support for further assistance."
      );
    }
  };

      const fetchFreeSpinGames = async () => {
              try {
                const url = `${endPoints.api.RECENT_FREE_SPIN_GAMES}/${loginData.idUser}`;
                const response = await getAllData(url);
                
                if (response?.status === "success" && response?.data) {
                  dispatch(setFreeSpinGames(response.data));
                }
              } catch (error) {
                console.error("Error fetching free spin games:", error);
                dispatch(setFreeSpinGames([]));
              }
      };

  const SkrillPay = async (
    depositamount,
    referenceNo,
    tokenId,
    selectedPackage
  ) => {
    let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.DEPOSIT_PAYMENT}`;

    let data = {
      merchantRefNum: referenceNo,
      amount: depositamount,
      id_user: loginData?.idUser,
      accountId: "284006353",
      paymentHandleToken: tokenId,
      currencyCode: "USD",
      settleWithAuth: true,
      bonus_amount: selectedPackage?.bonus_amount,
      package_amount: selectedPackage?.package_amount,
      packagename: selectedPackage?.package_name,
      pakageId: selectedPackage?.id,
    };
    try {
      setLoading(true);
      let response = await addBetData(url, data);
      if (response?.data?.status == "success") {
        showSuccessSnackbar(response?.data?.message);
        GetUserById();
        getCoinPackageList();
        fetchFreeSpinGames();
        if (typeof closeModal === "function" || showPayNow) {
          closeModal();
        }
        navigate("/buy-coins?payment=success", { replace: true });
      } else {
        showErrorSnackbar(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      showErrorSnackbar(
        "Issue connecting to server (error code 15). Please contact support for further assistance."
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const SkrillFailed = async (depositamount, referenceNo) => {
    let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.FAILED_DEPOSIT}`;

    let data = {
      merchantRefNum: referenceNo,
      amount: depositamount,
      id_user: loginData?.idUser,
      accountid: "string",
      paymentHandleToken: "string",
      currencyCode: "string",
      settleWithAuth: "string",
      status: "string",
      description: "string",
      tstatus: 0,
    };
    try {
      setLoading(true);
      let response = await addBetData(url, data);
      setLoading(false);
      if (response?.data?.status == "success") {
        showSuccessSnackbar(response?.data?.message);
        GetUserById();
        getCoinPackageList();

        if (typeof closeModal === "function" || showPayNow) {
          closeModal();
        }
      } else if (response?.data?.status == "failure") {
        showErrorSnackbar(response?.data?.message);
      } else {
        showErrorSnackbar(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      showErrorSnackbar(
        "Issue connecting to server (error code 15). Please contact support for further assistance."
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // stripe package submit code
  const submitPackageData = async (item) => {
    const merchantRefNum = RandomRefNum(`spinsaga_${loginData?.idUser}`);
    let payload = {
      merchantRefNum: merchantRefNum,
      packageId: item.id,
      usersession: loginData?.sessionId,
    };

    try {
      setLoading(true);
      let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.ADD_PAYMENT_METHOD}`;
      const packageResult = await addBetData(url, payload);
      // console.log("packageResult", packageResult?.data?.status);
      setLoading(false);
      if (packageResult?.data?.status) {
        // onClose();
        setStripeOpen(true);
      } else {
        // onClose();
        setStripeOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {locationModal && (
        <LocationWarningModal
          open={locationModal}
          onClose={() => {
            setLocationModal(false);
          }}
        />
      )}
      {loading && <Loader loading={loading} />}
      <Button
        size="small"
        style={style}
        sx={{
          background: theme.palette.custom.red,
          color: theme.palette.custom.white,
        }}
        className={className}
        disabled={item?.isDisabled}
        onClick={() => {
          //   handleOpen(item);
          if (isAuthenticated) {
            if (isUserInAllowedRegion) {
              setLocationModal(true);
              return;
            }
            if (allowOnPress) {
              handleOnPress(item);
            } else {
              payBySkrill(item);
            }
          } else {
            navigate("/login");
          }
          // allowOnPress ? handleOnPress(item) :
        }}
      >
        {showPayNow ? "Skrill Pay" : `$${item.purchase_price}`}
        {/* {item.purchase_price} */}
      </Button>
    </>
  );
};

export default PaymentButton;
