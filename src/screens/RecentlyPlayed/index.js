import React, { useEffect, useState } from "react";
import { Grid, Card, CardActionArea, Typography, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { endPoints } from "../../constant/Environment";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import {  getAllData } from "../../Utility/API";
import { useDispatch, useSelector } from "react-redux";
import ImageWithShimmer from "../../component/ImageWithShimmer";
import GameModal from "../GameModal";
import Favorites from "../Favorites";
import GeoModal from "../Home/GeoModal";
import axios from 'axios';
import { Helmet } from "react-helmet";
const RecentlyPlayed = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const globalState = useSelector((state) => state.global);
  const { userGeolocation,isUserInAllowedRegion } = globalState;
  const [openGeoModal, setOpenGeoModal] = useState(false);
  const [allGames, setAllGames] = useState(null);
  const [openGameModal, setOpenGameModal] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [favoritegames, setFavoritegames] = useState(null);

  useEffect(() => {
    recentlyPlayed();
  }, []);

  const recentlyPlayed = async () => {
    let url = `${endPoints.api.RECENTLY_PLAYED}/${IsLoginData?.idUser}/${`10`}`;
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
        if (response?.status === "success") {
          setFavoritegames(response?.data);
        }
      });
    }
  };

  const gamePlay = async(game) => {
    const result =isUserInAllowedRegion
    if (result) {
      // const result = await  axios.get('https://ipapi.co/json/');
      // if (userGeolocation && result?.data?.country_code === 'US') {
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
    <Helmet>
        <title>Recently Played Games - Spinsaga</title>
        <meta name="description" content="Revisit the games you've recently played and continue your winning streak." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* geo modal */}
      <GeoModal open={openGeoModal} onClose={GeoModalClose} />
      {/* geo modal end */}
      <main className="inner-body">
        <Typography
          sx={{ color: theme.palette.custom.white_gray }}
          variant="h6"
        >
           Recently Played
        </Typography>

        <Grid container spacing={2}>
          {allGames && allGames?.length > 0 ?
            allGames.map((game, index) => (
              <Grid item xs={4} sm={6} md={2.4} key={index}>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      gamePlay(game);
                    }}
                  >
                    <ImageWithShimmer
                      src={
                         game?.ext_url?.includes("https:")
                          ? `${game.ext_url}`
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
            ))
         : 
         <Grid container justifyContent="center" alignItems="center" mt={5} mb={5}>
         <Grid item>
           <Typography variant="h5" textAlign="center">
             You didn't play any of our games yet.
           </Typography>
         </Grid>
         </Grid>
        }
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

export default RecentlyPlayed;
