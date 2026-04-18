import React from "react";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t('privacyPolicy.pageTitle')}</title>
        <meta name="description" content={t('privacyPolicy.metaDescription')} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/privacy-policy/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/privacy-policy/" />
        <meta property="og:title" content={t('privacyPolicy.pageTitle')} />
        <meta property="og:description" content={t('privacyPolicy.metaDescription')} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('privacyPolicy.pageTitle')} />
        <meta name="twitter:description" content={t('privacyPolicy.metaDescription')} />
        <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
      </Helmet>
      <div
        className="container bg-color-pp space-bottom content-only"
        style={{ marginTop: 80 }}
      >
        <div className="inner-smallspace-rg">
          <div className="row">
            <div className="col-md-12">
              <div
                className="content-page-design"
                style={{
                  padding: "20px",
                  marginLeft: isMobile ? "0px" : "15px",
                }}
              >
                <h2>{t("privacyPageContent.title")}</h2>
                <h4>{t("privacyPageContent.effectiveDate")}</h4>

                <div>
                  <p>{t("privacyPageContent.introduction")}</p>

                  <p>{t("privacyPageContent.commitment")}</p>

                  <p>{t("privacyPageContent.agreement")}</p>

                  <h3>{t("privacyPageContent.policyOverview")}</h3>
                  <p>{t("privacyPageContent.overviewContent")}</p>

                  <p>{t("privacyPageContent.exceptionTitle")}</p>
                  <ul>
                    <p>
                      <li>
                        <strong>
                          {t("privacyPageContent.offlineInformation")}
                        </strong>
                      </li>
                    </p>
                    <p>
                      <li>
                        <strong>{t("privacyPageContent.thirdParties")}</strong>
                      </li>
                    </p>
                  </ul>

                  <p>{t("privacyPageContent.bindingContract")}</p>

                  <p>{t("privacyPageContent.amendmentRight")}</p>

                  <h3>{t("privacyPageContent.definitions")}</h3>
                  <p>
                    <ul>
                      <p>
                        <li>
                          <strong>Personal Data:</strong>{" "}
                          {t("privacyPageContent.personalData")}
                        </li>
                      </p>
                      <p>
                        <li>
                          <strong>Non-Personal Data:</strong>{" "}
                          {t("privacyPageContent.nonPersonalData")}
                        </li>
                      </p>
                      <p>
                        <li>
                          <strong>Special Categories of Data:</strong>{" "}
                          {t("privacyPageContent.specialCategories")}
                        </li>
                      </p>
                    </ul>
                  </p>

                  <h3>{t("privacyPageContent.informationWeCollect")}</h3>

                  <h4>{t("privacyPageContent.informationCollectedTitle")}</h4>
                  <ul>
                    <p>{t("privacyPageContent.varietyOfInfo")}</p>

                    <p>{t("privacyPageContent.personalDataInfo")}</p>
                    <p>{t("privacyPageContent.nonPersonalDataInfo")}</p>
                    <p>{t("privacyPageContent.usageDetails")}</p>
                    <p>{t("privacyPageContent.locationInfo")}</p>
                    <p>{t("privacyPageContent.dataCollection")}</p>
                  </ul>

                  <h4>{t("privacyPageContent.directlyProvidedTitle")}</h4>
                  <ul>
                    <p>{t("privacyPageContent.directlyProvided")}</p>

                    <p>{t("privacyPageContent.userContributions")}</p>

                    <p>{t("privacyPageContent.locationData")}</p>
                  </ul>

                  <h4>{t("privacyPageContent.geolocationTitle")}</h4>
                  <ul>
                    <p>{t("privacyPageContent.geolocationContent")}</p>
                  </ul>

                  <h3>{t("privacyPageContent.howWeUseTitle")}</h3>
                  <p>{t("privacyPageContent.howWeUseIntro")}</p>

                  <ul>
                    <li>
                      <p>
                        <strong>Service Delivery:</strong>{" "}
                        {t("privacyPageContent.serviceDelivery")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Personalization:</strong>{" "}
                        {t("privacyPageContent.personalization")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Security and Compliance:</strong>{" "}
                        {t("privacyPageContent.securityCompliance")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Customer Support:</strong>{" "}
                        {t("privacyPageContent.customerSupport")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Marketing:</strong> {t("privacyPageContent.marketing")}
                      </p>
                    </li>
                  </ul>

                  <h3>{t("privacyPageContent.sharingTitle")}</h3>
                  <p>{t("privacyPageContent.sharingAggregated")}</p>
                  <p>{t("privacyPageContent.sharingContent")}</p>

                  <ul>
                    <li>
                      <p>
                        <strong>With Service Providers:</strong>{" "}
                        {t("privacyPageContent.serviceProviders")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>For Legal Compliance:</strong>{" "}
                        {t("privacyPageContent.legalCompliance")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>With Your Consent:</strong>{" "}
                        {t("privacyPageContent.yourConsent")}
                      </p>
                    </li>
                  </ul>

                  <h4>{t("privacyPageContent.dataTransfersTitle")}</h4>
                  <ul>
                    <p>{t("privacyPageContent.dataTransfers")}</p>
                  </ul>

                  <h3>{t("privacyPageContent.privacyRightsTitle")}</h3>
                  <p>{t("privacyPageContent.privacyRightsIntro")}</p>
                  <ul>
                    <li>
                      <p>
                        <strong>Access and Correction:</strong>{" "}
                        {t("privacyPageContent.accessCorrection")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Data Deletion:</strong>{" "}
                        {t("privacyPageContent.dataDeletion")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Opt-Out of Sale or Sharing:</strong>{" "}
                        {t("privacyPageContent.optOut")}
                      </p>
                    </li>
                  </ul>

                  <p>
                    {t("privacyPageContent.exerciseRights")}{" "}
                    <a href="mailto:support@spinsagacasino.com">
                      {t("privacyPageContent.contactEmail")}
                    </a>
                  </p>

                  <h3>{t("privacyPageContent.dataSecurityTitle")}</h3>
                  <p>{t("privacyPageContent.dataSecurity")}</p>

                  <h3>{t("privacyPageContent.ageRestrictionsTitle")}</h3>

                  <p>{t("privacyPageContent.ageRestrictions")}</p>

                  <h3>{t("privacyPageContent.changesTitle")}</h3>

                  <p>{t("privacyPageContent.changesContent")}</p>

                  <p>{t("privacyPageContent.changesResponsibility")}</p>

                  <h3>{t("privacyPageContent.contactUsTitle")}</h3>
                  <p>{t("privacyPageContent.contactUsIntro")}</p>
                  <p>{t("privacyPageContent.contactEmail2")}</p>
                  <p>{t("privacyPageContent.mailingAddress")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
