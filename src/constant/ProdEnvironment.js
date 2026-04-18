export const endPoints = {
    apiBaseUrl: "https://api-prod.spinsagacasino.com:5000/",
    api: {
      geocomplyLience1: "geocomplyLience1",
      LOGIN_ENDPOINT: "casino/users/login", //  "users/login",
      SIGNUP: "casino/users/fullsignup", //"users/signup",
      GET_BY_USERID: "users/userid", // 12  Append userid
      GET_BY_USERNAME: "users/username/", // userrname
      UPDATE_PERSONAL: "users/personal",
      UPDATE_PROFILE_IMAGE: "upload/profileimage",
      EMAIL_SUPPORT: "/casino/email/support",
      VERIFICATION_ENDPOINT: "users/validate",
      STATES: "states",
      UPDATE_EMAIL: "/users/casino/email",
      FORGOT_PASSWORD: "casino/users/passwordlost/",
      GET_SPORTS_DATA: "api/sports/id", //sportsid 6046
      CHANGE_PASS: "users/password",
      GET_QUESTIONS: "questions",
      GET_DOCUMENTS: "documentTypes",
      transactions: "alltransactions",
      activations: "activations",
      ssnVerification: "api/ssn/verification",
      Reset_password: "reset/password",
      resendMail: "casino/users/resend", //'user/resend',
      GetUserLimit: "user/limit/",
      SetUserLimit: "user/limit",
      brochures: "brochures",
      brochureDetails: "brochureDetails",
      order: "transactions/order",
      ordersHistory: "orders",
      apiurl: "casino/user/kyc/token",
      banking_withdraw: "banking/withdrawals",
      kyc_verify: "user/kyc/verify/",
      promo: "/promo/apply",
      GET_BANNER: "activepromotions",
      GOOGLE_LOGIN: "user/loginwithgoogle",
      USER_PROFILE: "user/profile",
      GET_GAMES: "api/casino/games",
      GET_MENU: "api/casino/menu",
      GET_GAME_BY_MENU_ID: "api/casino/gamesbymenu",
      GET_ACTIVE_GAMES: "api/casino/activegames",
      // GET_PROMO:'api/casino/promosadmin',
      GET_PROMO: "api/casino/promos",
      GET_PACKAGE: "api/casino/packages",
      GET_EXCHANGE: "api/casino/favgifts",
      GET_FEATURE_GAME: "api/casino/featuregames",
      BUY_COIN: "api/casino/buycoin",
      BUY_GIFT: "api/casino/buygift",
      // COIN_TRANSACTION:'api/casino/getBuyCoins',
      GIFT_TRANSACTION: "api/casino/getGifts",
      LOYALTY_DATA: "api/bench/getuserLevel",
      USER_TRACE: "casino/user/logintrace", //'user/logintrace',
      USER_AVAILABILTY: "users/username",
      EMAIL_AVAIALBILTY: "users/email",
      USER_SIGNUP: "casino/users/fullsignup",
      RADAR_API: "api/radar/search",
      EMAIL_POPUP: "user/emailpopup",
      SKRILL_PAYMENT: "skrill/payment/addpayment",
      CASINO_PLAY: "casinoplay/create",
      COIN_TRANSACTION: "casinoskrill/payment/transactions",
      GET_FAVORITE: "api/casino/favgames",
      ADD_FAVORITE: "api/casino/gameaddtofav",
      REMOVE_FAVORITE: "api/casino/removefavGame",
      REMOVE_FEATURE_FAVORITE: "api/casino/removeFeaturefavGame",
      REMOVE_GIFT_FAVORITE: "api/casino/removefavGift",
      ADD_GIFT_FAVORITE: "api/casino/giftaddtofav",
      GET_FEATURE_FAVORITE: "api/casino/Featurefavgames",
      DAILY_FREE_COIN: "api/casino/dailyfree",
      OTP_VERIFICATION: "casino/user/otpverification",
      HOME_PAGE: "api/casino/homepage",
      GAME_HISTORY: "casinoplay/gametrasactions",
      SERACH_GAME: "api/casino/searchgames",
      USER_COOLOFF: "/user/cooloff",
      USER_EXCLUDE: "/user/exclude",
    },
    mode: "Development",
  };
  //https://bettordoneapi-dev.betthouse.com/
  export const Image_Url =
    "https://elasticbeanstalk-us-east-1-715244717776.s3.amazonaws.com/team/";
  export const SportImage_Url =
    "https://elasticbeanstalk-us-east-1-715244717776.s3.amazonaws.com/sports/";
  export const LeagueImage_Url =
    "https://elasticbeanstalk-us-east-1-715244717776.s3.amazonaws.com/leagues/";
  export const API_URL = "";
  export const Voucher_Url =
    "https://elasticbeanstalk-us-east-1-715244717776.s3.amazonaws.com";
  
  export const PaymentEndpoints = {
    //apiBaseUrl: "https://dev-payment.bettdraft.com/", //Dev Url
    apiBaseUrl: "https://paymentapi.bettdraft.com:5000/", // stage Url
    //  apiBaseUrl: "https://paymentapiprod.bettdraft.com:5000/",  //prod urrl
    api: {
      ACTIVATE: "api/payment/enroll",
      WALLET: "api/payment/wallet",
      INFORMATION: "api/payment/information/",
      deposit_WithDraw: "api/payment/transfers",
      fabiwallet: "api/payment/information",
      SKRILL_WALLET: "api/skrillcustomer/payment",
      DEPOSIT_PAYMENT: "api/casino/payment",
      GETGAMES: "getgames",
    },
  };
  
  export const sportEndPoint = {
    apiBaseUrl: "https://sportsfeed.bettdraft.com:5000/", 
    api: {},
  
    mode: "Development",
  };
  
  export const appVersion = {
    version: "1.0.0",
  };
  
  export default {};
  