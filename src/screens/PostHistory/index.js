import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography, Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import moment from "moment";
import { isMobile } from "react-device-detect";
import InfoModal from "./InfoModal";
import { Helmet } from "react-helmet";

const PostHistory = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const loginData = useSelector((state) => state.auth.IsLoginData);
  const dispatch = useDispatch();
  const [gamelist, setGameList] = useState([]);
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();
  const [cancelModal, setCancelModal] = React.useState(false);

  useEffect(() => {
    getMyPost();
  }, []);

  const getMyPost = async () => {
    const url = `${endPoints.api.USER_POST_DETAIL}/${loginData?.idUser}`;
    dispatch(setLoading(true));
    try {
      dispatch(setLoading(true));
      let response = await getAllData(url);
      if (response?.status === "success") {
        setGameList(response?.data ?? []);
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Helmet>
        <title>Post History - Spinsaga Casino</title>
        <meta name="description" content="Browse your complete Spinsaga post record here." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section
        className="inner_space table_design"
        style={{ paddingLeft: isMobile ? "20px" : "" }}
      >
        <Grid container spacing={3}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ marginTop: "30px" }}
          >
            {t("postHistory.postHistory")}
          </Typography>

          <Grid
            item
            xs={12}
            sm={6}
            md={10}
            container
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
          ></Grid>

          <TableContainer
            component={Paper}
            sx={{ maxHeight: 500 }}
            className="table_custom"
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("postHistory.date")}</TableCell>
                  <TableCell>{t("postHistory.name")}</TableCell>

                  <TableCell>{t("postHistory.sagaCoin")}</TableCell>
                  <TableCell>{t("postHistory.postUrl")}</TableCell>

                  <TableCell>{t("postHistory.postImage")}</TableCell>
                  <TableCell>{t("postHistory.status")}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {gamelist.length > 0 &&
                  gamelist.map((row) => {
                    return (
                      <TableRow key={row?.id}>
                        <TableCell>
                          <div>
                            {moment
                              .parseZone(row?.post_date)
                              .format("MMM DD, YYYY")}
                          </div>
                        </TableCell>
                        <TableCell>{row?.offerName}</TableCell>

                        <TableCell>
                          <b> {row.sagaCoin}</b>
                        </TableCell>
                        <TableCell> {row.post_url}</TableCell>
                        <TableCell>
                          <img
                            src={`${endPoints.apiBaseUrl}${row?.post_image}`}
                            style={{ height: "50px" }}
                          />
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            // handleStatus(row.id)
                            if (row.status === 2) {
                              setCancelModal(true);
                            }
                          }}
                        >
                          {/* {row.status == 0
                          ? "Pending"
                          : row.status == 1
                          ? "Approved"
                          : row.status == 2
                          ? "Cancel"
                          : "Pending"} */}
                          <Typography
                            variant="body1"
                            style={{
                              textDecoration:
                                row.status == 2 ? "underline" : "",
                              color:
                                row.status == 2
                                  ? theme.palette.custom.red_white
                                  : null,
                              cursor: row.status == 2 ? "pointer" : null,
                            }}
                          >
                            {row.status === 0
                              ? t("postHistory.pending")
                              : row.status === 1
                              ? t("postHistory.approved")
                              : row.status === 2
                              ? t("postHistory.cancelled")
                              : t("postHistory.pending")}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {gamelist.length == 0 && (
            <Button
              sx={{
                backgroundColor: theme.palette.custom.gray_green,
                color: theme.palette.custom.white_green,
                marginTop: "10px",
                width: "100%",
                height: 60,
              }}
            >
              <Typography style={{ textTransform: "none" }}>
                {t("postHistory.noPost")}
              </Typography>
            </Button>
          )}
        </Grid>
        <InfoModal
          open={cancelModal}
          setCancelModal={() => {
            setCancelModal(false);
          }}
        />
      </section>
    </>
  );
};

export default PostHistory;
