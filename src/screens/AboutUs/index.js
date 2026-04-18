import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{t('aboutUs.pageTitle')}</title>
        <meta name="description" content={t('aboutUs.metaDescription')} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/about-us/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/about-us/" />
        <meta property="og:title" content={t('aboutUs.pageTitle')} />
        <meta property="og:description" content={t('aboutUs.metaDescription')} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('aboutUs.pageTitle')} />
        <meta name="twitter:description" content={t('aboutUs.metaDescription')} />
        <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
      </Helmet>
      <div
        className="container bg-color-about space-bottom content-only"
        style={{
          bgcolor: "background.black1",
          marginTop: 85,
          padding: 20,
          paddingLeft: 35,
        }}
      >
        <div className="inner-smallspace-rg">
          <div className="row">
            <div className="col-md-12">
              <div className="content-page-design">
                <h2>{t('aboutUs.title')}</h2>
                <h3>
                  {t('aboutUs.tagline')}
                </h3>
                <p>
                  {t('aboutUs.intro1')}
                </p>
                <p>
                  {t('aboutUs.intro2')}
                </p>

                <h3>{t('aboutUs.ourMission')}</h3>
                <p>
                  {t('aboutUs.missionText')}
                </p>

                <h3>{t('aboutUs.weBelieveIn')}</h3>
                <ul>
                  <li>
                    <p>
                      <strong>{t('aboutUs.engagement')}:</strong> {t('aboutUs.engagementText')}
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>{t('aboutUs.integrity')}:</strong> {t('aboutUs.integrityText')}
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>{t('aboutUs.trust')}:</strong> {t('aboutUs.trustText')}
                    </p>
                  </li>
                </ul>

                <p>
                  {t('aboutUs.valuedText')}
                </p>

                <h3>{t('aboutUs.whyChoose')}</h3>
                <p>
                  <strong>{t('aboutUs.rewardingExperiences')}</strong>
                </p>
                <p>
                  {t('aboutUs.rewardingText')}
                </p>
                <p>
                  <strong>{t('aboutUs.secureGameplay')}</strong>
                </p>
                <p>
                  {t('aboutUs.secureText')}
                </p>

                <p>
                  <strong>{t('aboutUs.customerSupport')}</strong>
                </p>
                <p>
                  {t('aboutUs.supportText')}
                </p>

                <p>
                  <strong>{t('aboutUs.socialCommunity')}</strong>
                </p>
                <p>
                  {t('aboutUs.communityText')}
                </p>

                <h3>{t('aboutUs.ourVision')}</h3>
                <p>
                  {t('aboutUs.visionText')}
                </p>

                <p>
                  <strong>{t('aboutUs.ourGoal')}: </strong> {t('aboutUs.goalText')}
                </p>

                <h3>{t('aboutUs.joinToday')}</h3>

                <p>
                  {t('aboutUs.joinText1')}
                </p>

                <p>
                  {t('aboutUs.joinText2')}
                </p>

                <p>
                  <strong>
                    {t('aboutUs.thankYou')}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
