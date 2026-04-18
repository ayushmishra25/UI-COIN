import { createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

const initialState = {
  themeMode: "dark",
  loading: false,
  license: "",
  userGeolocation: false,
  geoError:{},
  freeSpinGames: [],

};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLicense: (state, action) => {
      state.license = action.payload;
    },
    setUserGeoLocation: (state, action) => {
      state.userGeolocation = action.payload;
    },
    setGeoError: (state, action) => {
      state.geoError = action.payload;
    },
    setFreeSpinGames: (state, action) => {
      state.freeSpinGames = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setThemeMode, setLoading, setLicense,setUserGeoLocation,setGeoError,setFreeSpinGames } =
  globalSlice.actions;

export default globalSlice.reducer;
