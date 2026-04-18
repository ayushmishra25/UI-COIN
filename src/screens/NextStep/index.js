import React from "react";
import { useTranslation } from "react-i18next";

const NextStep = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="container  space-bottom">
        <div className="inner-smallspace-ganerate-code">
          <div className="row">
            <div className="col-md-12">
              <div className="content-page-design">
                <h2>{t("nextStep.title")}</h2>

                <p>
                  {t("nextStep.section1Intro")}
                  <ul>
                    <li>{t("nextStep.section1Step1")}</li>
                    <li>{t("nextStep.section1Step2")}</li>
                  </ul>
                </p>
                <p>{t("nextStep.companyName")}</p>
                <p>{t("nextStep.companyNameLong")}</p>
                <p>{t("nextStep.addressLine1")}</p>
                <p>{t("nextStep.addressLine2")}</p>
                <br />
                <p>
                  {t("nextStep.section2Intro")}
                  <ul>
                    <li>{t("nextStep.section2Step1")}</li>
                    <li>{t("nextStep.section2Step2")}</li>
                  </ul>
                </p>
                <p>{t("nextStep.section3Title")}:</p>
                <p>
                  <ol>
                    <li>{t("nextStep.section3Point1")}</li>
                    <li>{t("nextStep.section3Point2")}</li>
                    <li>{t("nextStep.section3Point3")}</li>
                    <li>{t("nextStep.section3Point4")}</li>
                    <li>{t("nextStep.section3Point5")}</li>
                  </ol>
                </p>
                <p>
                  "{t("nextStep.section3Statement")}"
                </p>
                <p>
                  {t("nextStep.section4")}
                </p>
                <p>
                  {t("nextStep.section5")}
                </p>
                <p>
                  {t("nextStep.section6")}
                </p>
                <p>
                  {t("nextStep.section7")}
                </p>
                <p>
                  {t("nextStep.section8")}
                </p>
                <p>
                  {t("nextStep.section9")}
                </p>
                <p>
                  {t("nextStep.section10")}
                </p>
                <p>
                  {t("nextStep.section10b")}
                </p>
                <p>
                  <ol>
                    <li>
                      {t("nextStep.section10Point1")}
                    </li>
                    <li>
                      {t("nextStep.section10Point2")}
                    </li>
                    <li>
                      {t("nextStep.section10Point3")}
                      <ul>
                        <li>
                          Sign in to your SpinSaga Casino customer account
                        </li>
                        <li>
                          Click the option for “INSTRUCTIONS ON ALTERNATIVE
                          METHOD OF ENTRY”
                        </li>
                        <li>
                          follow the process to generate your Unique One-Time
                          Request Code and save it for use on your Real Cash
                          Request Card.
                        </li>
                      </ul>
                    </li>
                    <li>
                      {t("nextStep.section10Point4")}
                    </li>
                  </ol>
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextStep;
