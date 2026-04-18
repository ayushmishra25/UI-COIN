import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import "../../App.css";
import { endPoints } from "../../constant/Environment";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { addData, getAllData } from "../../Utility/API";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageWithShimmer from "../../component/ImageWithShimmer";
import Favorites from "../Favorites";
import TestGameModal from "../TestGameModal";
import {
  setSideBarMenuList,
  setSideBarCategoryList,
} from "../../redux/Reducers/sidebarReducer/sidebarSlice";
import GeoModal from "./GeoModal";
import { Helmet } from "react-helmet";
import Promotions from "./Promotion";
import GameModal from "../GameModal";
import { Dialog, DialogContent } from "@mui/material";
import MonthlyPromotions from "../MonthlyPromotions";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalState = useSelector((state) => state.global);

  const { userGeolocation } = globalState;
  // console.log("userGeolocation", userGeolocation);
  const authState = useSelector((state) => state.auth);
  const { IsLoginData, isUserInAllowedRegion, isAuthenticated } = authState;
  const theme = useTheme();
  const [featureGame, setFeatureGames] = useState();
  const [allGames, setAllGames] = useState(null);
  const [menuList, setMenuList] = useState(null);
  const [allData, setAllData] = useState(null);
  const [favoritegames, setFavoritegames] = useState(null);
  const [openGameModal, setOpenGameModal] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [openGeoModal, setOpenGeoModal] = useState(false);
  const [categoryList, setCategoryList] = useState(null);
  const location = useLocation();
  const [openPromo, setOpenPromo] = useState(false);
  const[showloginPromo,setShowloginPromo]=useState(false);
  const [promotionName,setPromotionName]=useState("");

  const hasMinPackage = IsLoginData?.dailyReward?.hasMinPackage || false;

  // const [packages, setPackages] = useState(null);

//   useEffect(() => {
//   if (location.state?.showPromo) {
//     setOpenPromo(true);
//   }
// }, [location.state]);

useEffect(() => {
  const userId = IsLoginData?.idUser;
  if (!isAuthenticated || !userId) return;

  const closed = localStorage.getItem(`monthlyPromoafterLogin_${userId}`);
  const saved = localStorage.getItem(`monthlyPromoTimestamp_${userId}`);

  // First time → show
  if (!closed) {
    setOpenPromo(true);
    return;
  }

  if (closed === "true" && saved) {
    const now = Date.now();
    let savedTime = parseInt(saved, 10);

    // If timestamp is in future (system error / earlier device bug)
    if (savedTime > now) {
      savedTime = now; // Normalize it
      localStorage.setItem(`monthlyPromoTimestamp_${userId}`, now.toString());
    }

    const hoursPassed = (now - savedTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      localStorage.removeItem(`monthlyPromoafterLogin_${userId}`);
      localStorage.removeItem(`monthlyPromoTimestamp_${userId}`);
      setOpenPromo(true);
    }
  }
}, [isAuthenticated, IsLoginData?.idUser]);


  useEffect(() => {
    getHomePageData();
    getFavorite();
    getConfigurationList();
  }, []);

  const getConfigurationList = async (list) => {
      let url = `${endPoints.api.GET_CONFIGURATION}`;
      dispatch(setLoading(true));
      await getAllData(url)
        .then((response) => {
          dispatch(setLoading(false));
          if (response?.status === "success" && response?.data?.length > 0) {
            const dailyLoginStreak = response.data.find(
              (item) => item.conf_name === "daily_login_streak"
              );
      setShowloginPromo(dailyLoginStreak?.isActive); // store only that one
      setPromotionName(dailyLoginStreak?.name || "");
          }
        })
        .catch((error) => {
          dispatch(setLoading(false));
          console.error(error);
        });
    };

  const getHomePageData = async () => {
    dispatch(setLoading(true));
    let data = {
      userid: IsLoginData?.idUser || null,
    };

    let url = `${endPoints.api.HOME_PAGE_BY_CATEGORY}`;
    await addData(url, data)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.data?.status === "success") {
          setAllData(response?.data?.data);
          setAllGames(response?.data?.data?.games);
          const filteredMenuData = response.data?.data?.menulist?.filter(
            (item) => item.isactive === 1
          );
          setMenuList(filteredMenuData);

          //data has to be shown in cateogry
          setCategoryList(response.data?.data?.categorylist);

          setFeatureGames(response?.data?.data?.featuregames);
          //  setFavoritegames(response?.data?.data?.favoritegames);

          dispatch(setSideBarMenuList(response.data?.data?.categorylist));
          // passing categories list to sidebar category redux
          dispatch(setSideBarCategoryList(response.data?.data?.categorylist));
        } else {
        }
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(setLoading(false));
      });
  };

  //created new function to pass category name to nested game component
  const showCategory = (category) => {
    navigate(createSlug(category), {
      state: { categoryName: category },
    });
  };

  function createSlug(text) {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  }

  const gamePlay = async (game) => {
    const result = isUserInAllowedRegion;
    if (result) {
      //  const result = await  axios.get('https://ipapi.co/json/');
      //  if (userGeolocation && result?.data?.country_code === 'US') {

      setOpenGeoModal(true);
    } else {
      setOpenGameModal(true);
      setSelectedGame(game);
    }
  };

  const getFavorite = () => {
    if (IsLoginData?.idUser) {
      let url = `${endPoints.api.GET_FAVORITE}/${IsLoginData?.idUser}`;

      getAllData(url).then((response) => {
        if (response?.status == "success") {
          setFavoritegames(response?.data);
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  };

  const getCategoryCount = (category) => {
    if (allData) {
      const { countbymenu } = allData;
      if (countbymenu[category] !== undefined) {
        return `${countbymenu[category]}`;
      } else {
        return 0;
      }
    }
  };

  const onChangeCategory = (item) => {
    scrollToTarget(item.category); //category name);
  };
  function scrollToTarget(id, offset = 100) {
    var targetElement = document.getElementById(id);
    if (targetElement) {
      var scrollPosition = targetElement.offsetTop - offset;
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }

  const GeoModalClose = () => {
    setOpenGeoModal(false);
  };

  return (
    <>
      <Helmet>
        <title>{t('home.pageTitle')}</title>
        <meta name="description" content={t('home.metaDescription')} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/" />
        <meta property="og:title" content={t('home.pageTitle')} />
        <meta property="og:description" content={t('home.metaDescription')} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('home.pageTitle')} />
        <meta name="twitter:description" content={t('home.metaDescription')} />
        <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
      </Helmet>

     {showloginPromo && (
     <MonthlyPromotions 
     open={openPromo} 
     onClose={() => setOpenPromo(false)}
     fromHome={true}
      promotionName={promotionName}
     />
      )}

      <main className="inner-body">
        {isAuthenticated && (
          <Typography
            className="normal_p mb-4"
            sx={{ color: "text.red" }}
            variant="h6"
          >
            Welcome, {IsLoginData?.name} {IsLoginData?.surname}
          </Typography>
        )}
        {/* geo modal */}
        <GeoModal open={openGeoModal} onClose={GeoModalClose} />
        {/* geo modal end */}

        <Box>
              <Promotions showSmallShimmer={false} />
        </Box>
        <Grid
          container
          spacing={{ xs: 1, sm: 1, md: 2 }}
          style={{
            // overflowX: "scroll",
            display: "flex",
            overflowX: "auto",

            flexWrap: "nowrap",
          }}
        >
          {featureGame &&
            featureGame.map((game, index) => (
              <Grid
                item
                xs={4}
                sm={6}
                md={2.4}
                style={{ flex: "none" }}
                key={index}
                id={game.menu}
              >
                <Card>
                  <CardActionArea
                    onClick={() => {
                      isAuthenticated ? gamePlay(game) : navigate("/login");
                    }}
                  >
                    <ImageWithShimmer
                      src={
                         game?.ext_url?.includes("https:")
                          ? `${game?.ext_url}`
                          : `${endPoints.imageCDN}${game.game_creative}`
                      }
                      alt={game.game_name}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>

        <section className="button_scroll">
          <Typography
            className="btn_group c_scroll"
            sx={{
              backgroundColor: theme.palette.custom.black_light,
            }}
            component="div"
          >
            {/* <Button
            className="active"
            size="small"
            sx={{
              backgroundColor: theme.palette.custom.dark_btn,
              color: theme.palette.custom.white_gray,
              border: theme.palette.custom.btn_border,
            }}
          >
            <MdHomeFilled />
            Lobby
          </Button> */}

            {categoryList &&
              categoryList.map((item) => (
                <Button
                  //  className="active"
                  key={item.cat_id}
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.custom.dark_light_btn,
                    color: theme.palette.custom.white_gray,
                    border: theme.palette.custom.btn_border,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px", // Adjust spacing between icon and text
                  }}
                  onClick={() => onChangeCategory(item)}
                >
                  <img
                    src={`${endPoints.imageCDN}${item.categoryIcon}`}
                    alt={item.category}
                    style={{ width: 24, height: 24 }}
                  />
                  {item.category}
                </Button>
              ))}
          </Typography>
        </section>
        {favoritegames?.length > 0 && (
          <>
            <div className="heading_button">
              <Typography sx={{ color: theme.palette.custom.white_gray }}>
                My Favorites ({favoritegames.length})
              </Typography>
            </div>
            <Grid
              container
              spacing={{ xs: 1, sm: 1, md: 2 }}
              style={{
                //  overflowX: "scroll",
                display: "flex",
                overflowX: "auto",
                flexWrap: "nowrap",
              }}
            >
              {favoritegames.map((game, index) => (
                <Grid
                  item
                  xs={4}
                  sm={6}
                  md={2.4}
                  key={index}
                  style={{ flex: "none" }}
                >
                  <Card>
                    <CardActionArea
                      style={{ position: "relative" }}
                      onClick={() => {
                        isAuthenticated ? gamePlay(game) : navigate("/login");
                      }}
                    >
                      <ImageWithShimmer
                        src={
                          game?.ext_url?.includes("https:")
                            ? `${game?.ext_url}`
                            : `${endPoints.imageCDN}${game.game_creative}`
                        }
                        alt={game.game_name}
                      />
                      <Favorites
                        game={game}
                        getFavorite={getFavorite}
                        favoritegames={favoritegames}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>{" "}
          </>
        )}
        {allGames &&
          Object.keys(allGames).map((category, index) => {
            return (
              <>
                <div className="heading_button">
                  <Typography
                    sx={{ color: theme.palette.custom.white_gray }}
                    key={category}
                  >
                    {category} ({getCategoryCount(category)})
                  </Typography>
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.custom.gray_green,
                      color: theme.palette.custom.white_green,
                    }}
                    onClick={() => {
                      isAuthenticated
                        ? showCategory(category)
                        : navigate("/login");
                    }}
                  >
                    View all
                  </Button>
                </div>

                <Grid
                  container
                  spacing={{ xs: 1, sm: 1, md: 2 }}
                  style={{
                    //  overflowX: "scroll",
                    display: "flex",
                    overflowX: "auto",
                    flexWrap: "nowrap",
                  }}
                >
                  {allGames[category].map((game, index) => (
                    <Grid
                      item
                      xs={4}
                      sm={6}
                      md={2.4}
                      key={index}
                      id={game.category}
                    //  style={{ flex: "none" }} // Prevent items from wrapping
                    >
                      <Card>
                        <CardActionArea
                          style={{ position: "relative" }}
                          onClick={() => {
                            isAuthenticated
                              ? gamePlay(game)
                              : navigate("/login");
                          }}
                        >
                          <ImageWithShimmer
                            src={
                              game?.ext_url?.includes("https:")
                                ? `${game?.ext_url}`
                                : `${endPoints.imageCDN}${game.game_creative}`
                            }
                            alt={game.game_name}
                          />
                          <Favorites
                            game={game}
                            getFavorite={getFavorite}
                            favoritegames={favoritegames}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* {index == 0 && (
                  <>
                    <div className="heading_button">
                      <Typography
                        sx={{ color: theme.palette.custom.white_gray }}
                      >
                        Quick Buy
                      </Typography>
                      <Button
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.custom.gray_green,
                          color: theme.palette.custom.white_green,
                        }}
                        onClick={() => {
                          navigate("/buy-coins");
                        }}
                      >
                        View all
                      </Button>
                    </div>
                    <QuickbuyPackage />
                  </>
                )} */}
              </>
            );
          })}
      </main>

      {openGameModal && (
        <GameModal
          selectedGame={selectedGame}
          openGameModal={openGameModal}
          onModalClose={() => {
            setOpenGameModal(false);
          }}
        />
      )}

      {/* test Game modal */}
      {/* {openGameModal && (
        <TestGameModal
          selectedGame={selectedGame}
          openGameModal={openGameModal}
          onModalClose={() => {
            setOpenGameModal(false);
          }}
        />
      )} */}
    </>
  );
};

export default Home;
