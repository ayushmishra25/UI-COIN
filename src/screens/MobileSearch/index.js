import React, { useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  TextField,
} from "@mui/material";
import { InputAdornment } from "@mui/material";
import ImageWithShimmer from "../../component/ImageWithShimmer";
import { endPoints } from "../../constant/Environment";
import { useTheme } from "@emotion/react";
import GameModal from "../GameModal";
import { useDispatch } from "react-redux";
import { setShowSearchList } from "../../redux/Reducers/sidebarReducer/sidebarSlice";
import SearchIcon from "@mui/icons-material/Search";
import { getAllData } from "../../Utility/API";

const Mobilesearch = () => {
  const [openGameModal, setOpenGameModal] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [search, setSearch] = useState("");
  const [searchGameList, setSearchGameList] = useState(null);
  const theme = useTheme();

  const searchGame = (e) => {
    const searchvalue = e.target.value;
    setSearch(searchvalue);
    if (searchvalue.length > 2) {
      getGameByName(searchvalue);
    } else  {
      getGameByName(null);
    }
  };

  const getGameByName = (name) => {
      let url = `${endPoints.api.SERACH_GAME}/${name}`;
      getAllData(url).then((response) => {
        if (response?.status === "success" && response?.data) {
          setSearchGameList(response.data);
        } else {
          setSearchGameList(null);
        }
      });
  };

  return (
    <div style={{ paddingBottom: "50px",height:"250px" }}>
      <TextField
        className="header_search_mobile"
        sx={{
          backgroundColor: theme.palette.custom.search_bg,
          color: theme.palette.custom.search_color,
          border: theme.palette.custom.search_border,
        }}
        variant="outlined"
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => {
          searchGame(e);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: theme.palette.custom.blue,
                }}
              />
            </InputAdornment>
          ),
        }}
      />

      {searchGameList ? (
        <Grid
          container
          style={{ marginTop: "15px", marginBottom: "15px" }}
          spacing={{ xs: 1, sm: 1, md: 2 }}
        >
          {searchGameList &&
            searchGameList?.map((game, index) => (
              <Grid item xs={4} sm={6} md={2.4} key={index}>
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
              No Matching Result,Please try again
            </Typography>
          )}
        </Grid>
      ) : null}
      {openGameModal && (
        <GameModal
          selectedGame={selectedGame}
          openGameModal={openGameModal}
          onModalClose={() => {
            setOpenGameModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Mobilesearch;
