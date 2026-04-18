import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Avatar,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import { useTheme } from "@emotion/react";
import "../../App.css";
import img1 from "../../images/img1.webp";
import img2 from "../../images/img2.webp";
import img3 from "../../images/img3.webp";
import img7 from "../../images/Image7.png";
import Promo from "../../images/promo.jpg";
import { endPoints } from "../../constant/Environment";
import { MdHomeFilled } from "react-icons/md";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import {
  addData,
  getAllBetData,
  getAllData,
  addBetData,
} from "../../Utility/API";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageWithShimmer from "../../component/ImageWithShimmer";
import CloseIcon from "@mui/icons-material/Close";
import Favorites from "../Favorites";
import GameModal from "../GameModal";
import { setSideBarMenuList } from "../../redux/Reducers/sidebarReducer/sidebarSlice";
import QuickbuyPackage from "./QuickbuyPackage";
import GeoModal from "./GeoModal";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalState = useSelector((state) => state.global);

  const { userGeolocation } = globalState;
  // console.log("userGeolocation", userGeolocation);
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const theme = useTheme();
  const [featureGame, setFeatureGames] = useState();
  const [allGames, setAllGames] = useState(null);
  const [menuList, setMenuList] = useState(null);
  const [allData, setAllData] = useState(null);
  const [favoritegames, setFavoritegames] = useState(null);
  const [openGameModal, setOpenGameModal] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [openGeoModal, setOpenGeoModal] = useState(false);

  // const [packages, setPackages] = useState(null);

  useEffect(() => {
    getHomePageData();
    getFavorite();
  }, []);

  const getHomePageData = async () => {
    dispatch(setLoading(true));
    let data = {
      userid: IsLoginData?.idUser || null,
    };

    let url = `${endPoints.api.HOME_PAGE}`;
    await addData(url, data)
      .then((response) => {
        dispatch(setLoading(false));
        //  console.log("response.data", response);
        if (response?.data?.status === "success") {
          setAllData(response?.data?.data);
          setAllGames(response?.data?.data?.games);
          const filteredMenuData = response.data?.data?.menulist?.filter(
            (item) => item.isactive === 1
          );
          setMenuList(filteredMenuData);
          setFeatureGames(response?.data?.data?.featuregames);
          //  setFavoritegames(response?.data?.data?.favoritegames);

          // if(response?.data?.data?.packages.length > 0){
          //   const excludePackageIds = response?.data?.data?.packages?.[0]?.exclude_package || [];

          //   const filteredPackages = response?.data?.data?.packages?.filter(item => !excludePackageIds.includes(item?.id));

          //   setPackages(filteredPackages);
          // }

          dispatch(setSideBarMenuList(filteredMenuData));
        } else {
        }
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(setLoading(false));
      });
  };

  const showMenu = (category) => {
    const menuIds = allGames[category].map((game) => game.menu);
    // console.log("Game IDs:", menuIds);
    // const menuItem = nested && nested.nested_under ? nested : main;
    // if (menuItem && menuItem.menu_title) {
    //   navigate(createSlug(category), { state: { data: menuItem } });
    // }
    navigate(createSlug(category), {
      state: { menuId: menuIds[0], menuName: category },
    });
  };

  function createSlug(text) {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  }

  const gamePlay = async(game) => {
    const result = await  axios.get('https://ipapi.co/json/');
    if (userGeolocation && result?.data?.country_code === 'US') {
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
        if (response.status == "success") {
          setFavoritegames(response.data);
        }
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

  const onChangeMenu = (item) => {
    scrollToTarget(item.id); //menu_title);
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
      <main className="inner-body">
        <Typography
          className="normal_p mb-4"
          sx={{ color: "text.red" }}
          variant="h6"
        >
          Welcome, {IsLoginData?.name} {IsLoginData?.surname}
        </Typography>
        {/* geo modal */}
        <GeoModal open={openGeoModal} onClose={GeoModalClose} />
        {/* geo modal end */}

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
                  <CardActionArea onClick={() => gamePlay(game)}>
                    <ImageWithShimmer
                      src={
                        game?.ext_url
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

            {menuList &&
              menuList.map((menu) => (
                <Button
                  //  className="active"
                  key={menu.id}
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
                  onClick={() => onChangeMenu(menu)}
                >
                  <img
                    src={`${endPoints.imageCDN}${menu.icon}`}
                    alt={menu.menu_title}
                    style={{ width: 24, height: 24 }}
                  />
                  {menu.menu_title}
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
                      onClick={() => gamePlay(game)}
                    >
                      <ImageWithShimmer
                        // src={`${endPoints.imageCDN}${game.game_creative}`}
                        src={
                          game?.ext_url
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
                      showMenu(category);
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
                      id={game.menu}
                      style={{ flex: "none" }} // Prevent items from wrapping
                    >
                      <Card>
                        <CardActionArea
                          style={{ position: "relative" }}
                          onClick={() => gamePlay(game)}
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
    </>
  );
};

export default Home;
