import { createSlice } from "@reduxjs/toolkit";
import { isMobile } from "react-device-detect";

const initialState = {
  menuList: [],
  isDrawerOpen: true,
  showSearchList: false,
  categoryList: [],
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSideBarMenuList: (state, action) => {
      state.menuList = action.payload;
    },
    setIsDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    setShowSearchList: (state, action) => {
      state.showSearchList = action.payload;
    },
    setSideBarCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSideBarMenuList,setIsDrawerOpen ,setShowSearchList,setSideBarCategoryList} = sidebarSlice.actions;

export default sidebarSlice.reducer;
