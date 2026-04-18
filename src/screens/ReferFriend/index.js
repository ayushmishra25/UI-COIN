import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useDispatch } from "react-redux";

import ReferImage8 from "./../../images/refer8.jpg";
import twitter from "./../../images/X-logo.png";
import { endPoints } from "../../constant/Environment";
import { ContentCopy } from "@mui/icons-material";
import "./refer.css";
import { getAllBetData, getAllData } from "../../Utility/API";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const ReferFriend = () => {
  const { t } = useTranslation();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const userId = loginData?.idUser;
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();
  const [referAndReward, setReferAndReward] = useState("");

  const shareUrl = "https://yourwebsite.com";
  const title = "Refer a Friend and Get a Real Cash!";

  const stageUrl = "https://api-stage.spinsagacasino.com:5000/";
  const prodUrl = "https://coin-account-api.spinsagacasino.org/";

  const [referralLink, setReferralLink] = useState(
    `https://play.spinsagacasino.com/?ref=${userId}&campaign=referFriend`
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let selectedEnv = checkEnv(endPoints.apiBaseUrl);
    setReferralLink(`${selectedEnv}?ref=${userId}&campaign=referFriend`);
  }, []);

  const checkEnv = (env) => {
    let naviagteUrl = "";
    switch (env) {
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

  // console.log('referralLink refer page',referralLink)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000); // Reset after 5 seconds
  };

  const ReferalTable = async () => {
    const url = `${endPoints.apiBaseUrl}${endPoints.api.REFERAL_TABLE}/${userId}`;
    try {
      const response = await getAllBetData(url);
      if (response?.status == "success") {
        setList(response?.data);
      } else {
        showErrorSnackbar(response?.message);
      }
    } catch (error) {
      console.log(error);
      showErrorSnackbar(
        "Issue connecting to server (error code 15). Please contact support for further assistance."
      );
    }
  };

  useEffect(() => {
    getConfigurationList();
    ReferalTable();
  }, []);


  const getConfigurationList = async (list) => {
    let url = `${endPoints.api.GET_CONFIGURATION}`;
    dispatch(setLoading(true));
    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.status === "success" && response?.data?.length > 0) {
          const filteredData = response?.data?.filter((item) => item.isActive &&  item.conf_name == "refer_friend");
        // console.log('filteredData',filteredData)
          if(filteredData){
          setReferAndReward(filteredData[0].sc_coin);
         }

        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  const transactions = [
    { name: "Bob Brown", status: "2", amount: 0.0 }, // No steps completed yet
  ];

  const renderStatus = (data) => {
    const steps = ["Signup", "Email verify", "KYC", "Coin purchase"];
    const validStatus = [
      data.isSingup == 1, // Tick if isSignup is 1
      data.verification == 1, // Tick if verification is 1
      data.validation == 1, // Tick if validation is 1
      data.packageCount > 0, // Tick if packageCount is greater than 0
    ];

    return (
      <div className="status-stepper">
        {steps.map((step, index) => (
          <div key={index} className="step">
            {/* Circle for each step */}
            <div className={`circle ${validStatus[index] ? "completed" : ""}`}>
              {validStatus[index] && "✔"}
            </div>
            {/* Conditional connector line: only if the current and next steps are both ticked */}
            {index < steps.length - 1 &&
              validStatus[index] &&
              validStatus[index + 1] && <div className="step-connector"></div>}
            {/* step labels */}
            <span className="step-label">{step}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
    <Helmet>
        <title>{t('refer.pageTitle')}</title>
        <meta name="description" content={t('refer.metaDescription')} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/refer-friend/" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/refer-friend/" />
        <meta property="og:title" content={t('refer.pageTitle')} />
        <meta property="og:description" content={t('refer.metaDescription')} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('refer.pageTitle')} />
        <meta name="twitter:description" content={t('refer.metaDescription')} />
        <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
      </Helmet>
    <Grid container spacing={3} sx={{ p: 1 }} className="main_referal_grid">
      {/* Image Section */}
      <Grid item xs={12}>
        <Card>
          <CardMedia
            component="img"
            image={ReferImage8}
            alt="Refer a Friend"
            sx={{
              width: "100%",
              height: { xs: "200px", md: "350px" },
              objectFit: "cover",
            }}
          />
        </Card>
      </Grid>

      {/* Text Section */}
      <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Refer a Friend and Earn {referAndReward ?? "2"} Real Cash
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", wordBreak: "break-word" }}
          >
            {referralLink}
          </Typography>
          <Tooltip title={copied ? "Copied!" : "Copy Referral Link"}>
            <IconButton onClick={handleCopyLink} color="primary">
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>

      {/* Share & Copy Section */}
      <Grid item xs={12} md={6}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          sx={{ mt: { xs: 2, md: 0 } }}
        >
          <Box display="flex" gap={2}>
            <FacebookShareButton url={referralLink} quote={title}>
              <FacebookIcon size={36} round />
            </FacebookShareButton>
            <TwitterShareButton url={referralLink} title={title}>
              <img
                src={twitter}
                alt="twitter_icon"
                style={{ height: 36, width: 36 }}
              />
            </TwitterShareButton>
            <WhatsappShareButton url={referralLink} title={title}>
              <WhatsappIcon size={36} round />
            </WhatsappShareButton>
          </Box>

          <Box display="flex" gap={1} flexDirection="column" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCopyLink}
              sx={{ textTransform: "none" }}
            >
              Copy Referral Link
            </Button>
            {copied && (
              <Typography variant="caption" color="success.main">
                Link copied to clipboard!
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <div className="main-referral-box">
          <Typography variant="h6">Referral Transaction History</Typography>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 500 }}
            className="table_custom refreal_table"
          >
            <Table
              sx={{
                tableLayout: "fixed",
                width: { xs: "220%", md: "100%" },
              }}
              stickyHeader
              aria-label="referral table"
              className="referral-casino-table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell sx={{ width: { xs: "45%", sm: "40%" } }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ width: { xs: "20%", sm: "auto" } }}>
                    Bonus Status
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {list?.length > 0 ? (
                  list.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{transaction?.name}</TableCell>
                      <TableCell className="status-column">
                        {renderStatus(transaction)}
                      </TableCell>
                      <TableCell>{transaction?.referStatus}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No referral transactions
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
    </>
  );
};

export default ReferFriend;
