import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const GenerateCode = () => {
  const { t } = useTranslation();
  const [generateCode, setGenerateCode] = useState("");
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

  const generateRandom = () => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < 16; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      randomString += chars[randomIndex];
    }
    setIsActive(true);
    setGenerateCode(randomString);
  };
  return (
    <div>
      <div className="container  space-bottom">
        <div className="inner-smallspace-ganerate-code">
          <div className="row">
            <div className="col-md-12">
              <div className="content-page-design">
                <h2>{t("generateCode.alternativeMethod")}</h2>

                <p>
                  {t("generateCode.accessSweepstakes")}
                </p>
                <p>{t("generateCode.generateUniqueCode")}</p>
                <p>
                  {t("generateCode.clickButtonGenerate")}
                </p>
                <p>
                  {t("generateCode.codeGenerated")} {" "}
                </p>
                <p>
                  {t("generateCode.takeNote")}
                </p>
                <p>
                  {t("generateCode.noteCodeUsage")} {" "}
                </p>
              </div>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <div className="get_code">
                  {generateCode && (
                    <>
                      <Typography
                        variant="body1"
                        align="center"
                        sx={{ mt: 2, mb: 2 }}
                      >
                        {t("generateCode.yourCode")}
                      </Typography>
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{ mt: 2, mb: 2 }}
                      >
                        {generateCode}
                      </Typography>
                      <Box display="flex" justifyContent="center" width="100%">
                        <Button
                          component={Link}
                          to="/next-step"
                          variant="contained"
                          color="error"
                          className="nav-button-custom"
                          sx={{
                            pr: 7,
                            pl: 7,
                            backgroundColor:
                              theme.palette.custom.redblue_border,
                          }}
                        >
                          {t("generateCode.nextStep")}
                        </Button>
                      </Box>
                    </>
                  )}
                </div>
              </Box>
              <div className="bottom_btn">
                <Box display="flex" justifyContent="center" alignItems="center">
                  {!generateCode && (
                    <Button
                      onClick={generateRandom}
                      variant="contained"
                      color="error"
                      className={`nav-button-custom ${isActive ? "hide" : ""}`}
                      sx={{ pl: 5, pr: 5, pt: 1, pb: 1, mt: 4 ,         backgroundColor:
                        theme.palette.custom.redblue_border,}}
                    >
                      {t("generateCode.generateCode")}
                    </Button>
                  )}
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCode;
