import React, { useState, useEffect } from "react";
import { Button, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { endPoints } from "../../constant/Environment";
import { IoMdCheckmark } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
import TooltipComponent from "../../component/TooltipComponent";
import { useNavigate } from "react-router-dom";
const CopiedButton = () => {
  const theme = useTheme();
    const authState = useSelector((state) => state.auth);
    const { isAuthenticated, IsLoginData } = authState;

  const userId = IsLoginData?.idUser;
  const navigate = useNavigate();
  const stageUrl = "https://casino-acount-api.spinsagacasino.org/";
  const prodUrl = "https://coin-account-api.spinsagacasino.org/";

  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState(
    `https://coin.spinsagacasino.com/?ref=${userId}&campaign=referFriend`
  );
  useEffect(() => {
    let selectedEnv = checkEnv(endPoints.apiBaseUrl);
    setReferralLink(`${selectedEnv}?ref=${userId}&campaign=referFriend`);
  }, []);

  const checkEnv = (env) => {
    let naviagteUrl = "";
    switch (env) {
      // currenly there is no stage env incase of crypto
      case stageUrl:
        naviagteUrl = "https://stage.spinsagacasino.com/";
        break;
      case prodUrl:
        naviagteUrl = "https://coin.spinsagacasino.com/";
        break;
      default:
        naviagteUrl = "https://stage.spinsagacasino.com/";
    }
    return naviagteUrl;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    // setTimeout(() => setCopied(false), 5000); // Reset after 5 seconds
  };
  return (
    <>
      <Button
        className="best_btn"
        size="small"
        sx={{
          background: theme.palette.custom.red,
          color: theme.palette.custom.white,
        }}
        onClick={() => {
          isAuthenticated ? handleCopyLink() : navigate("/login");
        }}
      >
        <div style={{ display: "flex" }}>
          {copied ? (
            <FaCheck size={15} style={{ marginRight: "5px" }} />
          ) : (
            <FaCopy size={15} style={{ marginRight: "5px" }} />
          )}{" "}
          <span> {copied ? "Copied" : "Copy Link"}</span>
        </div>
      </Button>
      {/* hide tooltip */}
      {/* <TooltipComponent
        title={
          <Stack spacing={0.5}>
            <Typography variant="body2">
              • Get 2 Real Cash when your friend joins successfully
            </Typography>
            <Typography variant="body2">
              • Earn 1% of your friend's deposit in Real Cash for 1 year
            </Typography>
          </Stack>
        }
        placement="top"
      >
        <Button
          className="best_btn"
          size="small"
          sx={{
            background: theme.palette.custom.red,
            color: theme.palette.custom.white,
          }}
          onClick={() => {
            handleCopyLink();
          }}
        >
          <div style={{ display: "flex" }}>
            {copied ? (
              <FaCheck size={15} style={{ marginRight: "5px" }} />
            ) : (
              <FaCopy size={15} style={{ marginRight: "5px" }} />
            )}{" "}
            <span> {copied ? "Copied" : "Copy Link"}</span>
          </div>
        </Button>
      </TooltipComponent> */}
    </>
  );
};

export default CopiedButton;
