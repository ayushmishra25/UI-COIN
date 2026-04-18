import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Container, Button } from "@mui/material";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import { darkTheme, lightTheme } from "./Theme";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedLayout from "./ProtectedLayout";
import Profile from "./screens/Profile";
import { useSelector } from "react-redux";
import Register from "./screens/Register";
import Congratulations from "./screens/Congratulations";
import Forget from "./screens/Forget";

import BuyCoins from "./screens/BuyCoins";
import BuyCoinsNew from "./screens/BuyCoins/BuyCoinsNew";
import Redeem from "./screens/Redeem";
import OTP from "./screens/OTP";
import NewPassword from "./screens/NewPassword";
import PublicRoute from "./PublicRoute";
import SuccessPassword from "./screens/SuccessPassword";
import NestedGame from "./screens/NestedGame";
import MyRedeemptions from "./screens/MyRedeemptions";
import ReferFriend from "./screens/ReferFriend";
import Faq from "./screens/Faq";
import VIP from "./screens/VIP";
import Support from "./screens/Support";
import Sweepstakes from "./screens/Sweepstakes";
import GameIframe from "./screens/GameIframe";
import GameHistory from "./screens/GameHistory";
import EmailVerification from "./screens/EmailVerification";
import TermCondition from "./screens/TermCondition";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import ContactUs from "./screens/ContactUs";
import ResponsibleGaming from "./screens/ResponsibleGaming";
import About from "./screens/AboutUs";
import { createBrowserHistory } from "history";
import ScrollToTop from "./component/ScrollToTop";
import GenerateCode from "./screens/GenerateCode";
import NextStep from "./screens/NextStep";
import Mobilesearch from "./screens/MobileSearch";
import PurchaseHistory from "./screens/PurchaseHistory";
import GiftCard from "./screens/GiftCard";
import Loyalty from "./screens/Loyalty";
import KycCheck from "./screens/KycCheck";
import Kycverification from "./screens/KycVerification";
import { InstallProvider } from "./component/InstallAppButton";
import KycApproved from "./screens/KycApproved";
import ResponsibleGamingsettings from "./screens/Responsible-gaming-settings";
import Footer from "./screens/Footer";
import NavBar from "./component/NavBar";
import SuccessStripePage from "./screens/SuccessStripePage";
import FailedStripePage from "./screens/FailedStripePage";
import UserTransaction from "./screens/UserTransaction";
import PostHistory from "./screens/PostHistory";
import RecentlyPlayed from "./screens/RecentlyPlayed";
import TestGameIframe from "./screens/TestGameIframe";
import AddCard from "./screens/AddCard";
import AddCrypto from "./screens/AddCrypto";
import AllPromotions from "./screens/AllPromotions";
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated } = authState;
  const history = createBrowserHistory();
  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/home" replace />
  );
};

function RouteList() {
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated } = authState;
  const footerRoutes = [
    "/contact-us",
    "/about-us",
    "/responsible-gaming",
    "/faq",
    "/terms-conditions",
    "/privacy-policy",
    "/sweepstakes",
    "/kyc",
    "signUp",
    "/login",
    "/register",
    "/congratulations",
    "/forgot-password",
    "/otp",
    "/new-password",
    "/success",
    "/home",
    "/buy-coins",
  ];
  return (
    <BrowserRouter>
      <InstallProvider>
        <ScrollToTop />
        <NavBar />

        <Routes>
          <Route
            exact
            path="/activations/:userName/:token"
            element={<EmailVerification />}
          />
          <Route exact path="/kyc" element={<Kycverification />} />
          <Route exact path="/contact-us" element={<ContactUs />} />
          <Route exact path="/about-us" element={<About />} />
          <Route
            exact
            path="/responsible-gaming"
            element={<ResponsibleGaming />}
          />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/terms-conditions" element={<TermCondition />} />
          <Route exact path="/sweepstakes" element={<Sweepstakes />} />
          <Route exact path="/faq" element={<Faq />} />
          {!isAuthenticated && (
            <Route element={<PublicRoute />}>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/congratulations" element={<Congratulations />} />
              <Route path="/forgot-password" element={<Forget />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/new-password" element={<NewPassword />} />
              <Route path="/success" element={<SuccessPassword />} />
              <Route path="/home" element={<Home />} />
              <Route path="/buy-coins" element={<BuyCoinsNew />} />
              <Route path="/all-promotions" element={<AllPromotions />} />
            </Route>
          )}

          <Route
            path="/"
            element={<ProtectedRoute element={ProtectedLayout} />}
          >
            <Route path="/" element={<Home />} />
            <Route path="/buy-coins" element={<BuyCoinsNew />} />
            <Route path="/redeem" element={<Redeem />} />
            <Route path="/profile" element={<Profile />} />
             <Route path="/add-card" element={<AddCard />} />
            <Route exact path="/:category" element={<NestedGame />} />
            <Route exact path="/my-redeemption" element={<MyRedeemptions />} />
            <Route exact path="/vip" element={<VIP />} />
            <Route exact path="/refer-friend" element={<ReferFriend />} />
            <Route exact path="/support" element={<Support />} />
            <Route exact path="/game" element={<GameIframe />} />
            <Route exact path="/test-game" element={<TestGameIframe />} />
            <Route exact path="/game-history" element={<GameHistory />} />
            <Route exact path="/transaction" element={<UserTransaction />} />
            <Route exact path="/post-history" element={<PostHistory />} />
            <Route exact path="/generate-code" element={<GenerateCode />} />
            <Route exact path="/next-step" element={<NextStep />} />
            <Route exact path="/search" element={<Mobilesearch />} />
            <Route path="/all-promotions" element={<AllPromotions />} />
            <Route
              exact
              path="/purchase-history"
              element={<PurchaseHistory />}
            />
            <Route exact path="/gift-card" element={<GiftCard />} />
            <Route exact path="/loyalty" element={<Loyalty />} />
            <Route exact path="/kyc-check" element={<KycCheck />} />
            <Route exact path="/kyc-approved" element={<KycApproved />} />
            <Route path="/order-complete" element={<SuccessStripePage />} />
            <Route path="/order-failure" element={<FailedStripePage />} />
            <Route path="/recently-played" element={<RecentlyPlayed />} />
            <Route path="/add-crypto" element={<AddCrypto />} />
            <Route
              exact
              path="/responsible-gaming-settings"
              element={<ResponsibleGamingsettings />}
            />
          </Route>
        </Routes>
        {/* <Footer/> */}

        {footerRoutes.includes(window.location.pathname) && (
          <div
            style={{
              marginTop: "20px",
            }}
          >
         { window.location.pathname == '/buy-coins' && isAuthenticated ? null :  <Footer position="fixed"></Footer>}
          </div>
        )}
      </InstallProvider>
    </BrowserRouter>
  );
}

export default RouteList;
