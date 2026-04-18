import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('faq.pageTitle')}</title>
        <meta name="description" content={t('faq.metaDescription')} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/faq/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/faq/" />
        <meta property="og:title" content={t('faq.pageTitle')} />
        <meta property="og:description" content={t('faq.metaDescription')} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('faq.pageTitle')} />
        <meta name="twitter:description" content={t('faq.metaDescription')} />
        <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is SpinSaga Casino?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SpinSaga Casino is a social casino platform where you can play slots, poker, and other casino games using crypto coins. It is for entertainment only with no real-money gambling."
                }
              },
              {
                "@type": "Question",
                "name": "How do I buy coins at SpinSaga?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can purchase coin packs at SpinSaga using crypto. Visit the Buy Coins page to choose a package that suits you and unlock bonus coins and daily rewards."
                }
              },
              {
                "@type": "Question",
                "name": "How do I redeem my rewards?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can redeem your earned Real Cash for prizes and bonuses through the Redeem section of your account dashboard."
                }
              },
              {
                "@type": "Question",
                "name": "Is SpinSaga Casino safe to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, SpinSaga Casino uses industry-standard security including KYC verification and responsible gaming tools to ensure a safe gaming environment."
                }
              }
            ]
          }
        `}</script>
      </Helmet>
      <div
        className="container bg-color-rg space-bottom content-only"
        style={{ marginTop: 70, padding: 20 }}
      >
        <h2>{t('faq.title')}</h2>

        {/* <Accordion style={{ marginBottom: "30px" }} defaultExpanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="body1" fontWeight="bold">
            How does SpinSaga ensure a risk-free gaming experience?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
            At SpinSaga, we prioritize a risk-free gaming environment. Your winning Real Cash are always secure and reserved for redemption.
            </Typography>
          </AccordionDetails>
        </Accordion> */}

        <Accordion style={{ marginBottom: "30px" }} defaultExpanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.earnSagaCoins.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.earnSagaCoins.answer')}
              <ul>
                <li>{t('faq.earnSagaCoins.signup')}</li>
                <li>{t('faq.earnSagaCoins.daily')}</li>
                <li>{t('faq.earnSagaCoins.referral')}</li>
                <li>{t('faq.earnSagaCoins.purchase')}</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }} defaultExpanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel25-content"
            id="panel25-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.referralReward.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.referralReward.answer')}
              <ul>
                <li> {t('faq.referralReward.signup')}</li>
                <li> {t('faq.referralReward.email')}</li>
                <li>{t('faq.referralReward.kyc')}</li>
                <li>{t('faq.referralReward.coinPurchase')}</li>
              </ul>
            </Typography>

            <Typography variant="body1">
              {t('faq.referralReward.youGet')}
              <ul>
                <li> {t('faq.referralReward.instant')} </li>
                <li> {t('faq.referralReward.deposit')}</li>
              </ul>
              {/* <p>
                When your friend completes the signup process with your link,
                you'll receive 2 Real Cash. Additionally, for every deposit
                your friend makes, you'll earn 1 % of the deposit amount in Saga
                Coins for a period of 1 year.
              </p> */}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }} defaultExpanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel30-content"
            id="panel30-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.coinsExpire.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.coinsExpire.answer')}
              <ul>
                <li>
                  {t('faq.coinsExpire.inactivity')}
                </li>
                <li>
                  {t('faq.coinsExpire.promotional')}
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* start */}
        {/* <Accordion style={{ marginBottom: "30px" }} defaultExpanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel29-content"
            id="panel29-header"
          >
            <Typography variant="body1" fontWeight="bold">
              Why do I need to transfer my redeemable Real Cash to playable
              Real Cash?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              <p>
                At Spin Saga, your winnings are safe! When you win, the coins go
                to your redeemable Real Cash balance, which can be redeemed for
                cash prizes or gift cards. If you'd like to continue playing
                with your winnings, you can use the Transfer Coins option to
                move them to playable Real Cash. This way, you can choose to
                either redeem your winnings or play with them.
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion> */}
        {/* end */}

        {/* start */}
        <Accordion style={{ marginBottom: "30px" }} defaultExpanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel24-content"
            id="panel24-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.freeCoins.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.freeCoins.answer')}
              <p>{t('faq.freeCoins.referFriend')}</p>
              <p>
                {t('faq.freeCoins.referFriendDesc')}
              </p>
              <ul>
                <li>{t('faq.freeCoins.signupAccount')}</li>
                <li>{t('faq.freeCoins.verifyEmail')}</li>
                <li>{t('faq.freeCoins.completeKyc')}</li>
                <li>{t('faq.freeCoins.purchaseCoins')}</li>
              </ul>
              <p>
                {t('faq.freeCoins.referralBonus')}
              </p>
            </Typography>

            <Typography variant="body1">
              {t('faq.freeCoins.dailyBonus')}
              <p>{t('faq.freeCoins.claimDaily')}</p>
              <ul>
                <li>{t('faq.freeCoins.step1')}</li>
                <li>{t('faq.freeCoins.step2')}</li>
                <li>{t('faq.freeCoins.step3')}</li>
              </ul>
              <p>
                {t('faq.freeCoins.claim24')}
              </p>
            </Typography>
            {/* <Typography variant="body1">
              3. Social Media Share:
              <p>Share the love and get free coins!</p>
              <ul>
                <li>Post about SpinSaga Inc. on social media</li>
                <li>Share the post URL and image with us</li>
                <li>Once verified, we'll credit free coins to your account</li>
              </ul>
            </Typography> */}
          </AccordionDetails>
        </Accordion>
        {/* end */}

        {/* <Accordion style={{ marginBottom: "30px" }} defaultExpanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography variant="body1" fontWeight="bold">
              What happens to my winning Real Cash?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Your winning Real Cash are safely stored and can only be used for
              redemption, giving you peace of mind while gaming.
            </Typography>
          </AccordionDetails>
        </Accordion> */}

        <Accordion style={{ marginBottom: "30px" }} defaultExpanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.createAccount.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.createAccount.answer')}
              <br /> {t('faq.createAccount.steps')}{" "}
              <a href="https://play.spinsagacasino.com/signup">{t('faq.createAccount.here')}</a> {t('faq.createAccount.toSignUp')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.updateDetails.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.updateDetails.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6-content"
            id="panel6-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.contactSupport.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.contactSupport.answer')}
              <ul>
                <li>{t('faq.contactSupport.email')}</li>
                <li>
                  {t('faq.contactSupport.liveChat')}
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7-content"
            id="panel7-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.resetPassword.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.resetPassword.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8-content"
            id="panel8-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.closeAccount.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.closeAccount.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel9-content"
            id="panel9-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.safeToPlay.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.safeToPlay.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel10-content"
            id="panel10-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.whatAreGoldCoins.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.whatAreGoldCoins.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel11-content"
            id="panel11-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.getGoldCoins.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.getGoldCoins.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel12-content"
            id="panel12-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.useGoldCoins.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.useGoldCoins.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel13-content"
            id="panel13-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.winRealMoney.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.winRealMoney.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel14-content"
            id="panel14-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.playMobile.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.playMobile.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel15-content"
            id="panel15-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.ageRestrictions.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.ageRestrictions.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel16-content"
            id="panel16-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.paymentMethods.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.paymentMethods.answer')}
              <ul>
                <li>{t('faq.paymentMethods.cards')}</li>
                <li>{t('faq.paymentMethods.ewallets')}</li>
              </ul>
              {t('faq.paymentMethods.encrypted')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel17-content"
            id="panel17-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.depositProcess.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.depositProcess.answer')}
              <ul>
                <li>{t('faq.depositProcess.cards')}</li>
                <li>{t('faq.depositProcess.ewallets')}</li>
              </ul>
              {t('faq.depositProcess.checkBalance')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel18-content"
            id="panel18-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.redeemPrizes.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.redeemPrizes.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel19-content"
            id="panel19-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.gameTypes.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.gameTypes.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel20-content"
            id="panel20-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.playFree.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.playFree.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel21-content"
            id="panel21-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.compatibleDevices.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.compatibleDevices.answer')}
              <ul>
                <li>{t('faq.compatibleDevices.desktops')}</li>
                <li>{t('faq.compatibleDevices.smartphones')}</li>
              </ul>
              {t('faq.compatibleDevices.requirements')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel22-content"
            id="panel22-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.updateBrowser.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.updateBrowser.answer')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel23-content"
            id="panel23-header"
          >
            <Typography variant="body1" fontWeight="bold">
              {t('faq.technicalDifficulties.question')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {t('faq.technicalDifficulties.answer')}{" "}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default Faq;
