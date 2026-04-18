import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Sweepstakes = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Sweepstakes - Play & Win Real Prizes | SpinSaga Casino</title>
        <meta name="description" content="Join exciting sweepstakes and win big prizes only at SpinSaga Casino. Free entry, real rewards." />
        <link rel="canonical" href="https://coin.spinsagacasino.com/sweepstakes/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/sweepstakes/" />
        <meta property="og:title" content="Sweepstakes - Play & Win Real Prizes | SpinSaga Casino" />
        <meta property="og:description" content="Join exciting sweepstakes and win big prizes only at SpinSaga Casino. Free entry, real rewards." />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sweepstakes - Play & Win Real Prizes | SpinSaga Casino" />
        <meta name="twitter:description" content="Join exciting sweepstakes and win big prizes only at SpinSaga Casino. Free entry, real rewards." />
        <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
      </Helmet>
      <div
        className="container bg-color-rg space-bottom content-only"
        style={{ marginTop: 60, padding: 20, paddingLeft: 35 }}
      >
        <div className="inner-smallspace-rg">
          <div className="row">
            <div className="col-md-12">
              <div className="content-page-design">
                <h2>{t("sweepstakesRulesPage.title")}</h2>

                <p>{t("sweepstakesRulesPage.noPurchaseRequired")}</p>

                <p>{t("sweepstakesRulesPage.sponsorIntro")}</p>

                <p>{t("sweepstakesRulesPage.readInConjunction")}</p>

                <h3>{t("sweepstakesRulesPage.eligibility")}</h3>
                <p>{t("sweepstakesRulesPage.followingDefinitions")}</p>
                <ul>
                  <li>{t("sweepstakesRulesPage.eligibleParticipants")}</li>
                  <li>{t("sweepstakesRulesPage.permittedJurisdictions")}</li>
                  <li>{t("sweepstakesRulesPage.participant")}</li>
                  <li>{t("sweepstakesRulesPage.postalRequestCode")}</li>
                </ul>
                <p>{t("sweepstakesRulesPage.promotionalPlay")}</p>
                <p>{t("sweepstakesRulesPage.voidWhereLaw")}</p>
                <p>{t("sweepstakesRulesPage.subjectToLaws")}</p>
                <p>{t("sweepstakesRulesPage.participationAgreement")}</p>
                <p>{t("sweepstakesRulesPage.winningContingent")}</p>
                <p>{t("sweepstakesRulesPage.employeesNotEligible")}</p>

                <h3>{t("sweepstakesRulesPage.sponsorPromoter")}</h3>
                <p>{t("sweepstakesRulesPage.sponsorInfo")}</p>

                <h3>{t("sweepstakesRulesPage.howToCollect")}</h3>
                <p>{t("sweepstakesRulesPage.activeAccount")}</p>
                <p>{t("sweepstakesRulesPage.potentialWays")}</p>
                <ul>
                  <li>
                    <p>
                      <strong>{t("sweepstakesRulesPage.freeBonus")}</strong>{" "}
                      {t("sweepstakesRulesPage.freeBonusDesc")}
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>
                        {t("sweepstakesRulesPage.giveawayContests")}
                      </strong>{" "}
                      {t("sweepstakesRulesPage.giveawayContestsDesc")}
                    </p>
                  </li>

                  <li>
                    <p>
                      <strong>
                        {t("sweepstakesRulesPage.earnAgainstGold")}
                      </strong>
                      <p>{t("sweepstakesRulesPage.earnRate")}</p>
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>{t("sweepstakesRulesPage.dailyBonus")}</strong>
                      <p>{t("sweepstakesRulesPage.dailyBonusDesc")}</p>
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>{t("sweepstakesRulesPage.mailRequest")}</strong>
                      <ol>
                        <li>{t("sweepstakesRulesPage.mailRequestStep1")}</li>
                        <li>{t("sweepstakesRulesPage.mailRequestStep2")}</li>
                        <li>{t("sweepstakesRulesPage.mailRequestStep3")}</li>
                        <li>{t("sweepstakesRulesPage.mailRequestStep4")}</li>
                      </ol>
                      {t("sweepstakesRulesPage.mailRequestFrequency")}
                    </p>
                  </li>
                </ul>

                <p>{t("sweepstakesRulesPage.amountDisplayed")}</p>

                <p>{t("sweepstakesRulesPage.notResponsible")}</p>

                <p>{t("sweepstakesRulesPage.authorizedAccountHolder")}</p>

                <p>{t("sweepstakesRulesPage.automatedSystemProhibited")}</p>

                <p>{t("sweepstakesRulesPage.validityPeriod")}</p>

                <p>{t("sweepstakesRulesPage.forfeiture")}</p>

                <h3>{t("sweepstakesRulesPage.usingSagaCoins")}</h3>
                <p>{t("sweepstakesRulesPage.playGames")}</p>

                <p>{t("sweepstakesRulesPage.noMonetaryValue")}</p>

                <p>{t("sweepstakesRulesPage.differentGames")}</p>

                <p>{t("sweepstakesRulesPage.onlyWonCoins")}</p>

                <p>{t("sweepstakesRulesPage.redeemValue")}</p>

                <p>{t("sweepstakesRulesPage.sponsorDecisions")}</p>

                <p>{t("sweepstakesRulesPage.playRequirement")}</p>

                <p>{t("sweepstakesRulesPage.changeRates")}</p>

                <h3>{t("sweepstakesRulesPage.verification")}</h3>

                <p>{t("sweepstakesRulesPage.potentialWinnersVerification")}</p>

                <p>{t("sweepstakesRulesPage.prizeRequirements")}</p>

                <h3>{t("sweepstakesRulesPage.prizes")}</h3>
                <p>{t("sweepstakesRulesPage.prizeBalance")}</p>
                <p>{t("sweepstakesRulesPage.requestIdentification")}</p>
                <p>{t("sweepstakesRulesPage.minimumRedemption")}</p>
                <p>{t("sweepstakesRulesPage.wonCoinsOnly")}</p>
                <p>{t("sweepstakesRulesPage.eligibilityPrize")}</p>
                <p>{t("sweepstakesRulesPage.maxRedemption")}</p>
                <p>
                  {t("sweepstakesRulesPage.dailyLimit")}
                </p>
                <p>{t("sweepstakesRulesPage.prizeAwarded")}</p>

                <h3>{t("sweepstakesRulesPage.entryConditions")}</h3>

                <p>{t("sweepstakesRulesPage.participatingAgreement")}</p>

                <p>{t("sweepstakesRulesPage.complyWith")}</p>

                <ul>
                  <li>The T&Cs</li>
                  <li>These Sweepstakes Rules</li>
                  <li>
                    Any decisions of the Sponsor/Promoter which are binding and
                    final
                  </li>
                </ul>
                <p>{t("sweepstakesRulesPage.releaseClaims")}</p>
                <p>{t("sweepstakesRulesPage.indemnify")}</p>

                <h3>{t("sweepstakesRulesPage.publicity")}</h3>
                <p>{t("sweepstakesRulesPage.publicityConsent")}</p>

                <h3>{t("sweepstakesRulesPage.generalConditions")}</h3>
                <p>{t("sweepstakesRulesPage.cancelModify")}</p>
                <p>{t("sweepstakesRulesPage.disqualify")}</p>

                <p>{t("sweepstakesRulesPage.criminalViolation")}</p>

                <p>{t("sweepstakesRulesPage.cancelNotice")}</p>

                <h3>{t("sweepstakesRulesPage.limitations")}</h3>
                <p>{t("sweepstakesRulesPage.notResponsibleFor")}</p>
                <ul>
                  <li>
                    {t("sweepstakesRulesPage.liabilityItem1")}
                  </li>
                  <li>
                    {t("sweepstakesRulesPage.liabilityItem2")}
                  </li>
                  <li>
                    {t("sweepstakesRulesPage.liabilityItem3")}
                  </li>
                  <li>
                    {t("sweepstakesRulesPage.liabilityItem4")}
                  </li>
                  <li>
                    {t("sweepstakesRulesPage.liabilityItem5")}
                  </li>
                  <li>
                    {t("sweepstakesRulesPage.liabilityItem6")}
                  </li>
                </ul>

                <h2>{t("sweepstakesRulesPage.disputes")}</h2>
                <p>{t("sweepstakesRulesPage.disputesAgreed")}</p>

                <h2>{t("sweepstakesRulesPage.other")}</h2>
                <p>{t("sweepstakesRulesPage.punitiveDamages")}</p>
                <p>{t("sweepstakesRulesPage.jurisdictionLimitation")}</p>

                <p>{t("sweepstakesRulesPage.delaware")}</p>

                <p>{t("sweepstakesRulesPage.fairness")}</p>

                <p>{t("sweepstakesRulesPage.bullying")}</p>

                <h3>{t("sweepstakesRulesPage.personalInfo")}</h3>
                <p>
                  {t("sweepstakesRulesPage.privacyPolicy")}{" "}
                  <a
                    href="https://play.spinsagacasino.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://play.spinsagacasino.com/privacy-policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sweepstakes;
