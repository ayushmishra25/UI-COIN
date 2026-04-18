import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./Theme";
import { AuthProvider } from "./AuthContext";
import RouteList from "./RouteList";
import { useSelector } from "react-redux";
import Loader from "./component/Loader";
import { axiosInstance } from "./Utility/axiosInstances";
import { createBrowserHistory } from "history";
import { useDispatch } from "react-redux";
import { setThemeMode } from "./redux/Reducers/GlobalReducer/globalSlice";
import { setLoginData } from "./redux/Reducers/AuthReducer/authSplice";
import { setIsDrawerOpen } from "./redux/Reducers/sidebarReducer/sidebarSlice";
import { BrowserRouter } from "react-router-dom";
import { getAddressFromCoords, setCookie } from "./Utility/functions/Helper";
import blurVertical from './images/blur-vertical.png'
import { setDispatch } from "./Utility/ConfigData";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StrikeEnvKey } from "./constant/StripeEnv";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllData } from "./Utility/API";
import { endPoints } from "./constant/Environment";
const stripePromise = loadStripe(StrikeEnvKey.Publisher);
//   "pk_test_51QhIUkH5trRXtyLUlRcOjMw5h1VYtm0s7DwsAL03JabRvAgQsQjlQ76LKzE3aynXOOSd4vbQ28EdjWuIVJNq9U6W00axjA21kS"
// );

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

function App() {
  const globalState = useSelector((state) => state.global);
  const { themeMode, loading } = globalState;
  const theme = themeMode === "light" ? lightTheme : darkTheme;
  const history = createBrowserHistory();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const dispatch = useDispatch();
  const [myip, setMyip] = useState("");

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let ref = params.get("ref") || "";
    let campaign = params.get("campaign") || "";
    if (ref) {
      setCookie("ref", ref, 7);
    }
    if (campaign) {
      setCookie("campaign", campaign, 7);
    }
  }, []);

useEffect(() => {
  if (!navigator.geolocation) {
    runIpGeo();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const { country } = await getAddressFromCoords(latitude, longitude);
        console.log("Browser country:", country);
        handleRedirect(country);
      } catch {
        runIpGeo();
      }
    },
    () => {
      console.log("Geolocation denied → IP fallback");
      runIpGeo();
    },
    {
      timeout: 5000,
      maximumAge: 60000,
    }
  );
}, []);


   const getCustomerIp = async () => {
    try {
      const url = `${endPoints.api.GET_CUSTOMER_IP}`;
      const response = await getAllData(url);
      if (response?.status === "success") {
        const ip = response?.data?.clientIp;
        return ip;
      }
    } catch (error) {
      console.error("Error fetching customer IP:", error);
    }
  };

  const handleRedirect = (country) => {
    const host = window.location.hostname;

    if (country && country === "US" && host.includes("coin.spinsagacasino.com")) {
      window.location.replace("https://play.spinsagacasino.com");
    }
  };

 const runIpGeo = async () => {
  try {
    const ip = await getCustomerIp();
    if (!ip) return;

    const res = await fetch(`https://geoip.vuiz.net/geoip?ip=${ip}`);
     if (!res.ok) {
      console.warn("IP geo API failed with status:", res.status);
      return;
    }
    
    const data = await res.json();

   if (data?.country_code) {
      console.log("ip country:", data?.country_code);
      handleRedirect(data?.country_code);
    }
   
  } catch (e) {
    console.log("IP geo failed (geoip.vuiz)", e);
  }
};


  axiosInstance.interceptors.request.use((config) => {
    // config.headers["SessonId"] = IsLoginData.sessionId;
    config.headers["SessonId"] = localStorage.getItem("session");
    return config;
  });

  

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log("error", error);
      if (error?.response?.status == "401") {
        localStorage.clear();
        window.alert(
          "You are currently logged in on another device. Please login again to continue.  You will be logged out of your other device."
        );
        dispatch(setThemeMode("dark"));
        dispatch(setLoginData({ user: {}, isAuthenticated: false }));
        history.replace("/login");
        sessionStorage.clear();
        window.location.reload();
       
      // window.location.reload();
      }
      return error;
    }
  );

  useEffect(() => {

    setDispatch(dispatch);

  }, []);


  return (
    <Elements stripe={stripePromise} options={options}>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AuthProvider>
        <Loader loading={loading} />
        <RouteList />
      </AuthProvider>
    </ThemeProvider>
    </Elements>
  );
}

export default App;
