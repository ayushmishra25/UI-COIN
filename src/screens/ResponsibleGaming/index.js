import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const ResponsibleGaming = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{t('responsibleGamingPage.pageTitle')}</title>
        <meta name="description" content={t('responsibleGamingPage.metaDescription')} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/responsible-gaming/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/responsible-gaming/" />
        <meta property="og:title" content={t('responsibleGamingPage.pageTitle')} />
        <meta property="og:description" content={t('responsibleGamingPage.metaDescription')} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('responsibleGamingPage.pageTitle')} />
        <meta name="twitter:description" content={t('responsibleGamingPage.metaDescription')} />
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
                <h2>{t('responsibleGaming.title')}</h2>
                <p>
                  {t('responsibleGaming.intro')}
                </p>
                <h3>{t('responsibleGaming.commitmentTitle')}</h3>
                <p>
                  {t('responsibleGaming.commitmentText')}
                </p>

                <h3>{t('responsibleGaming.resourcesTitle')}</h3>
                <p>
                  {t('responsibleGaming.resourcesText')}
                </p>
                <ul>
                  <li>
                    <p>
                      <strong>{t('responsibleGaming.ncpg')}</strong>
                      <br />
                      {t('responsibleGaming.call')}: <strong>1-800-522-4700</strong>
                      <br />
                      {t('responsibleGaming.visit')}:{" "}
                      <a href="https://www.ncpgambling.org/" target="a_blank">www.ncpgambling.org</a>
                    </p>
                  </li>

                  <li>
                    <p>
                      <strong>{t('responsibleGaming.gambler')}</strong>
                      <br />
                      {t('responsibleGaming.call')}: <strong>1-800-GAMBLER</strong>
                      <br />
                      {t('responsibleGaming.gamblerAvailable')}
                    </p>
                  </li>

                  <li>
                    <p>
                      <strong>{t('responsibleGaming.gamblersAnonymous')}</strong>
                      <br />
                      {t('responsibleGaming.visit')}:{" "}
                      <a href="https://www.gamblersanonymous.org/ga/" target="a_blank">
                        www.gamblersanonymous.org/ga
                      </a>
                    </p>
                  </li>

                  <li>
                    <p>
                      <strong>
                        {t('responsibleGaming.gamAnon')}
                      </strong>
                      <br />
                      {t('responsibleGaming.visit')}:{" "}
                      <a href="https://www.gam-anon.org/" target="a_blank">
                        www.gam-anon.org
                      </a>
                    </p>
                  </li>

                  <li>
                    <p>
                      <strong>{t('responsibleGaming.suicidePrevention')}</strong>
                      <br />
                      {t('responsibleGaming.call')}: 1-800-273-8255 / 988 
                      <br />
                      {t('responsibleGaming.visit')}:{" "}
                      <a href="http://www.suicidepreventionlifeline.org/" target="a_blank">
                        www.suicidepreventionlifeline.org
                      </a>
                    </p>
                  </li>
                </ul>

                 <h3>{t('responsibleGaming.toolsTitle')}</h3>
                <p>
                  {t('responsibleGaming.toolsText')}
                </p>
                <ol>
                  <li>
                    <p>
                      <strong>{t('responsibleGaming.settingLimits')}</strong>
                      <br />
                      {t('responsibleGaming.settingLimitsText')}
                    </p>
                  </li>

                  <li>
                    <p>
                      <strong>{t('responsibleGaming.coolOff')}</strong>
                      <br />
                      {t('responsibleGaming.coolOffText')}
                    </p>
                  </li>

                  <li>
                    <p>
                      <strong>{t('responsibleGaming.selfExclusion')}</strong>
                      <br />
                      <p>
                        {t('responsibleGaming.selfExclusionText')}
                      </p>
                      <ul>
                        <li>
                          {t('responsibleGaming.selfExclusionItem1')}
                        </li>
                        <li>{t('responsibleGaming.selfExclusionItem2')}</li>
                        <li>
                          {t('responsibleGaming.selfExclusionItem3')}
                        </li>
                      </ul>
                      {t('responsibleGaming.settingLimitsText')}
                    </p>
                  </li>

                  <li>
                    <p>
                      {t('responsibleGaming.selfExclusionNote')}
                    </p>
                  </li>
                </ol>

                <h3>{t('responsibleGaming.assistanceTitle')}</h3>
                <p>
                  {t('responsibleGaming.assistanceText')}
                </p>
                <ul>
                  <li>
                    <strong>{t('responsibleGaming.contactUs')}:</strong><br/>
                    Email:{" "}
                    <a href="mailto:support@spinsagacasino.com">
                      support@spinsagacasino.com
                    </a>
                  </li>
                </ul>

                <p>
                  {t('responsibleGaming.agentAssist')}
                </p>

                <p>
                  {t('responsibleGaming.closingText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsibleGaming;
