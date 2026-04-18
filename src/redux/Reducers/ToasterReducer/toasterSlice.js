import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
  open:false,
  message:"",
  type:""

};

export const toastSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    setToasterMsg: (state, action) => {
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToasterMsg } = toastSlice.actions;

export default toastSlice.reducer;
