import React, { useState } from "react";
import { Grid, Card, CardActionArea, Typography } from "@mui/material";
import ImageWithShimmer from "../../component/ImageWithShimmer";
import { endPoints } from "../../constant/Environment";
import { useTheme } from "@emotion/react";
import GameModal from "../GameModal";
import { useDispatch } from "react-redux";
import { setShowSearchList } from "../../redux/Reducers/sidebarReducer/sidebarSlice";

const SearchableCardList = (props) => {
  const { searchGameList, visibleSection } = props;
  const [openGameModal, setOpenGameModal] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <div>
      {searchGameList && visibleSection ? (
        <Grid
          container
          spacing={1.5}
          style={{
            position: "absolute",
            top: "90px",
            left: "24%",
            width: "28%",
            backgroundColor: theme.palette.custom.search_bg,
            paddingRight: "20px",
            borderRadius: "5px",
            paddingBottom: "15px",
          }}
        >
          {searchGameList &&
            searchGameList?.map((game, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card style={{ backgroundColor: "#f0f0f0" }}>
                  <CardActionArea
                    style={{ position: "relative" }}
                    onClick={() => {
                      setOpenGameModal(true);
                      setSelectedGame(game);
                    }}
                  >
                    <ImageWithShimmer
                      src={`${endPoints.imageCDN}${game.game_creative}`}
                      alt={game.game_name}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}

          {searchGameList?.length == 0 && (
            <Typography variant="body2" sx={{ padding: 1 }}>
              Game not found. It might not be available right now. Try searching again later!
            </Typography>
          )}
        </Grid>
      ) : null}
      {openGameModal && selectedGame && (
        <GameModal
          selectedGame={selectedGame}
          openGameModal={openGameModal}
          onModalClose={() => {
            setOpenGameModal(false);
           setSelectedGame(null)
          }}
        />
      )}
    </div>
  );
};

export default SearchableCardList;
