import { createTheme } from "@mui/material/styles";

const AppBaseColor = '#03B349'  //new color
    // #ed1d51 old color redish 
    // #03B349  suggiontion for green color  
    // #4eeccd  new color  nitin sir

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    text: {
      primary: "#000000", // Default text color for light mode
      secondary: "#555555",
      white: "#474747",
      lgray:"#C6C6C6"
    },
    background: {
      default: "#ffffff",
      paper: "#f4f4f4",
      green: "red",
      red: "green !important",
      gray: "#E5FFEB",
      black1:"#FCFCFC"

    },
    custom: {
      white: "#fff",
      white_green: "#03B449",
      gray_green: "#E5FFEB",
      white_gray: "#474747",
      black_light: "#E5E5E5",
      black_black: "#121212",
      lblack_light:"#f4f4f4",
      black2_light2:"#F0F0F0",
      dark_btn: "#D5D5D5",
      dark_light_btn:"#D5D5D5",
      btn_border: "#EBEBEB",
      greenbtn: "#03B349 !important",
      green1: "#00C300",
      blue: "#367AFF !important",
      gray_gray: "#474747",
      white_lgray: "#E1E1E1",
      trans_lgray: "#E1E1E1",
      gray_light:"#E1E1E1",
      gray_border:"#EBEBEB",
      half:"1",
      header_bg:"#FCFCFC",
      green_green:"#03B449 !important",
      dark_bg:"#D5D5D5",
      dark_btn:"#D5D5D5",
      red_gradient: "linear-gradient(90deg, rgba(237,29,81,1) 50%, rgba(140,3,37,1) 100%)",
      green_gradient: "linear-gradient(90deg, rgba(1,185,1,1) 50%, rgba(0,91,0,1) 100%);",
      blue_gradient: "linear-gradient(90deg, rgba(26,119,242,1) 50%, rgba(15,69,140,1) 100%)",
      light_btn:"linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(211,211,211,1) 50%)",
      search_bg:"#fff",
      search_border:"#2C2C2C",
      search_color:"#393939B2",
      white_black:"#212121",
      green_gradient:"linear-gradient(90deg, rgba(38, 38, 38, 0) 3.04%, rgba(66, 183, 41, 0.3) 100%)",
      white_white:"#fff",
      green_dark_gradient:"linear-gradient(180deg, #00C300 0%, #005D00 100%);",
      gray_red:`${AppBaseColor} !important`,
      red_white:"#fff !important",
      header_border:"#EBEBEB",
      red_light:"#F4F4F4",
      white_red:AppBaseColor,
      yellow:"#DB9F06",
      blue_bg:"#d5d5d5",
      black_white:'#0a0a0a',
      pink_bg:  '#4eeccd' , 
      lgray:"#333",
      red:"#fa114f",
      l_gray:"#ccc",
      dgray:"#4d4d4d",
      green01:"#00ff41",
      blackWhite:"#fff",
      dark_d:"#191919",
      greenhalf:"#03f24033",
      light_gray:"#191919"









    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    text: {
      primary: "#ffffff", // Default text color for dark mode
      secondary: "#bbbbbb",
      white: "#fff",
    },
    background: {
      default: "#0a0a0a",
      paper: "#1d1d1d",
      lgray: "#323232",
      green: "#9e9e9e",
      red: AppBaseColor,
      gray: "#222222",
      black1:"#0a0a0a"

    },
    custom: {
      white: "#474747",
      white_green: "#fff",
      gray_green: "#222222",
      white_gray: "#FFFFFF",
      white: "#fff",
      black2_light2:"#222222",
      black_light: "#121212",
      black_black: "#121212",
      lblack_light:"#262626",
      dark_btn: "#2D2D2D",
      dark_light_btn:"#2D2D2D",
      btn_border: "#464646",
      gray3:"#333",
      l_black: "#181818",
      header_bg:"#181818",
      green: "#EBFF00",
      redblue_border: AppBaseColor,
      red_gradient: "linear-gradient(90deg, rgba(237,29,81,1) 50%, rgba(140,3,37,1) 100%)",
      green_gradient: "linear-gradient(90deg, rgba(1,185,1,1) 50%, rgba(0,91,0,1) 100%);",
      blue_gradient: "linear-gradient(90deg, rgba(26,119,242,1) 50%, rgba(15,69,140,1) 100%)",
      greenbtn: "#03B349",
      l_black2: "#141414",
      green1: "#00C300",
      blue: "#367AFF",
      gray_gray: "#B0B0B0",
      white_lgray: "#fff",
      trans_lgray: "#1F1F1F",
      gray_light:"#222222",
      gray_border:"#2C2C2C",
      half:"0.5",
      green_green:"#03B449 !important",
      dark_bg:"#101010",
      dark_btn_gradient:`linear-gradient(180deg, ${AppBaseColor} 0%, #550216 100%)`,
      light_btn:"#101010",
      search_bg:"#262626",
      search_border:"#2C2C2C",
      search_color:"#D9D9D9B2",
      white_black:"#fff",
      green_gradient:"linear-gradient(90deg, rgba(38, 38, 38, 0) 3.04%, rgba(66, 183, 41, 0.3) 100%)",
      white_white:"#fff",
      green_dark_gradient:"linear-gradient(180deg, #00C300 0%, #005D00 100%);",
      gray_red:"#222222",
      red_white:AppBaseColor,
      header_border:"#2C2C2C",
      red_light:AppBaseColor,
      white_red:"#fff",
      yellow:"#DB9F06",
      blue_bg:"#0644AA",
      golden_yellow:"#FEEAA6",
      bronze:'#931C1C',
      gold:'#FE9F10',
      sapphire:'#0065B2',
      emerald:'#D7D821',
      ruby:'#C91781',
      daimond:'#F9FCFE',
      black_daimond:'#AAABAB',
      crown:'#E60505',
      black_white:'#0a0a0a',
      pink_bg: `${AppBaseColor} !important`,  
      lgray:"#333",
      gray3:"#333",
      red:"#03B349",
      l_gray:"#ccc",
      dgray:"#4d4d4d",
      green01:"#00ff41",
      blackWhite:"#000",
      dark_d:"#191919",
      greenhalf:"#03f24033",
      light_gray:"#191919"





    },
  },
});
