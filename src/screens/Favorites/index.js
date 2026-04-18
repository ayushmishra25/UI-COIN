import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { endPoints } from "../../constant/Environment";
import { addData, deleteData, getAllData } from "../../Utility/API";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useNavigate } from "react-router-dom";
const Favorites = (props) => {
  const { game, getFavorite, favoritegames } = props;
  const authState = useSelector((state) => state.auth);
  const { IsLoginData, isAuthenticated } = authState;
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function checkIfGameExists(dataArray, singleGame) {
    if (dataArray) {
      return dataArray.some((game) => game.id === singleGame.id);
    } else {
      return "";
    }
  }

  const handleFavoriteClick = (item, isfeatured) => {
    const isFavorite = favoritegames.some((fav) => fav.id === item.id);
    isFavorite ? RemoveFavorite(item) : AddFavorite(item);
  };

  const AddFavorite = async (game) => {
    let data = {
      userid: IsLoginData?.idUser,
      idGame: game.id,
      isfeatured: 0,
    };

    let url = `${endPoints.api.ADD_FAVORITE}`;
    dispatch(setLoading(true));

    await addData(url, data)
      .then(async (response) => {
        dispatch(setLoading(false));
        showSuccessSnackbar(response.data.message);
        getFavorite();
      })
      .catch((error) => {
        dispatch(setLoading(false));
        // ErrorToast(
        //   "Issue connecting to server (error code 15). Please contact support for further assistance."
        // );
        console.error(error);
      });
  };

  const RemoveFavorite = (game) => {
    dispatch(setLoading(true));
    let url = `${endPoints.api.REMOVE_FAVORITE}/${game.id}/${IsLoginData?.idUser}`;
    deleteData(url).then((response) => {
      dispatch(setLoading(false));
      getFavorite();
      showSuccessSnackbar(response.data.message);
    });
  };

  return (
    <div className="favorites">
      {(favoritegames?.length > 0) & checkIfGameExists(favoritegames, game) ? (
        <FaHeart
          className="heart-icon "
          size={20}
          style={{ color: "red" }}
          onClick={(e) => {
            e.stopPropagation();
            isAuthenticated ? handleFavoriteClick(game) : navigate("/login");
          }}
        />
      ) : (
        <FaHeart
          className="heart-icon "
          size={20}
          onClick={(e) => {
            e.stopPropagation();
            // alert("clieck");
            isAuthenticated ? handleFavoriteClick(game) : navigate("/login");
          }}
        />
      )}
    </div>
  );
};

export default Favorites;
