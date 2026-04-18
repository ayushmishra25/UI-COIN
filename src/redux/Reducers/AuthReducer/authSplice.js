import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    IsLoginData:{},
    isUserInAllowedRegion:false,     // this is used for checking the vpn anmd ip with the help of ip api
    isVpn:false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setIsAuthenticated: (state, action)=>{
    //     state.isAuthenticated = action.payload;
    //     state.IsLoginData ={}
    // },
    setLoginData: (state, action)=> {
      // console.log('action.payload',action.payload)
      state.IsLoginData = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
  },
   setLocationResponse:(state, action)=>{
    state.isUserInAllowedRegion = action.payload;
   },
   setVPNResponse:(state, action)=>{
    state.isVpn = action.payload;
   },
     
  },
});

// Action creators are generated for each case reducer function
export const { setLoginData,setLocationResponse,setVPNResponse } = authSlice.actions;

export default authSlice.reducer;
