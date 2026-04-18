import React, { useEffect, useState } from "react";
import { Grid, Card, CardActionArea, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { endPoints } from "../../constant/Environment";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { addData, getAllData } from "../../Utility/API";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ImageWithShimmer from "../../component/ImageWithShimmer";
import GameModal from "../GameModal";
import Favorites from "../Favorites";
import GeoModal from "../Home/GeoModal";
import axios from "axios";

const NestedGame = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const location = useLocation();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const globalState = useSelector((state) => state.global);

  const { userGeolocation } = globalState;
  const [openGeoModal, setOpenGeoModal] = useState(false);
  const { menuId, menuName } = location.state || {};
  const [allGames, setAllGames] = useState(null);
  const [openGameModal, setOpenGameModal] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [favoritegames, setFavoritegames] = useState(null);

  useEffect(() => {
    getGameByMenu(menuId);
  }, [menuId]);

  const getGameByMenu = async (id) => {
    let url = `${endPoints.api.GET_GAME_BY_MENU_ID}/${id}`;
    dispatch(setLoading(true));

    await getAllData(url)
      .then((response) => {
        dispatch(setLoading(false));
        if (response?.status === "success") {
          setAllGames(response?.data);
        } else {
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error(error);
      });
  };

  useEffect(() => {
    getFavorite();
  }, []);

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

  const gamePlay = async(game) => {
    const result = await  axios.get('https://ipapi.co/json/');
    if (userGeolocation && result?.data?.country_code === 'US') {
      setOpenGeoModal(true);
    } else {
      setOpenGameModal(true);
      setSelectedGame(game);
    }
  };

  const GeoModalClose = () => {
    setOpenGeoModal(false);
  };
  return (
    <>
      {/* geo modal */}
      <GeoModal open={openGeoModal} onClose={GeoModalClose} />
      {/* geo modal end */}
      <main className="inner-body">
        <Typography
          sx={{ color: theme.palette.custom.white_gray }}
          variant="h6"
        >
          {menuName}
        </Typography>

        <Grid container spacing={2}>
          {allGames &&
            allGames.map((game, index) => (
              <Grid item xs={4} sm={6} md={2.4} key={index}>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      gamePlay(game);
                      // setOpenGameModal(true);
                      // setSelectedGame(game);
                    }}
                  >
                    <ImageWithShimmer
                      src={
                        game.ext_url
                          ? `${game.ext_url}`
                          : `${endPoints.imageCDN}${game.game_creative}`
                      }
                      // src={`${endPoints.imageCDN}${game.game_creative}`}
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

        {openGameModal && (
          <GameModal
            selectedGame={selectedGame}
            openGameModal={openGameModal}
            onModalClose={() => {
              setOpenGameModal(false);
            }}
          />
        )}
      </main>
    </>
  );
};

export default NestedGame;
