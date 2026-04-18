export const endPoints = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
  imageCDN: "https://cdn.spinsagacasino.com:5000/",
  api: {
    geocomplyLience1: "geocomplyLience1",
    LOGIN_ENDPOINT: "casino/users/login", //  "users/login",
    SIGNUP: "casino/users/fullsignup", //"users/signup",
    GET_BY_USERID: "users/userid", // 12  Append userid
    GET_BY_USERNAME: "users/username/", // userrname
    UPDATE_PERSONAL: "users/personal",
    UPDATE_LANGUAGE: "user/language/update",
    UPDATE_CURRENCY: "user/currency/update",
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
    resendMail: "casino/user/resend", //'user/resend',
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
    GOOGLE_LOGIN: "casino/user/loginwithgoogle",
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
    GAME_HISTORY: "casinoplay/user/gamelist", // "casinoplay/gametrasactions",
    SERACH_GAME: "api/casino/searchgames",
    USER_COOLOFF: "/user/cooloff",
    USER_EXCLUDE: "/user/exclude",
    USER_CASINO_UPDATE: "users/update",
    REFERAL_TABLE: "referUsers",
    COIN_TRNASFER: "/user/coin/transfer",
    CANCEL_REDEEMPTION: "api/casino/cancelbuycoin",
    GET_PAYMENTS: "getPaymentMode",
    GET_DAILY_CLAIM: "casino/user/dailyClaim",
    SKRILL_WITHDRAW: "skrill/payment/withdrawfunds",
    GET_CONFIGURATION: "api/configuration/all",
    GIFT_CASH_TRANSACTION: "withdraw/",
    CANCEL_CASH_TRANSACTION: "transactions/cancel",
    GET_VIP_PACKAGES: "api/bench/packages",
    USER_VIP_LEVEL: "api/bench/getuserlevel",
    POST_SOCIAL_URL: "post/add",
    USER_TRANSACTION: "/user/transactions",
    USER_POST_DETAIL: "post/get",
    GET_SPIN_VALUES: "casino/v2/user/spin",
    GET_SPIN_PRIZE: "casino/user/dailySpinClaim",
    MAIL_IN_FEATURE: "promo/email/add",
    REDEEM_CODE: "promo/apply",
    HOME_PAGE_BY_CATEGORY: "api/casino/homepagecategory",
    GET_GAMES_BY_CATEGORY_NAME: "api/casino/gamesbycategory",
    RECENTLY_PLAYED: "api/casino/recentlyplayed",
    SHOW_POPUP: "user/transpopup",
    SKIP_POPUP: "user/skippopup",
    BIRTHDAY_CLAIM: "casino/user/birthDayClaim",
    SKRIL_CARD_WITHDRAW: "casinoskrill/payment/withdrawfundsCard",
    MULTIPLIER_CLAIM: "casino/user/dailyClaim",
    GIFT_CARD_TRANSACTION: "cardwithdraw/",
    CRYPTO_REDEEM:'casinoskrill/payment/withdrawfundsCrypto',
    CRYPTO_TRANSACTION_BY_USERID:'cryptowithdraw/',
    MONTHLY_REWARDS:'monthlyRewards/all',
    CLAIM_MONTHLY_REWARD:'api/rewards/claim',
    RECENT_FREE_SPIN_GAMES:'api/casino/freespin',
    GET_BOOSTER_PACKAGES:'api/casino/packages/dailyStreak',
    GET_EMAIL_PACKAGE: 'api/casino/package',
    GET_CUSTOMER_IP:'ip/info',
  },
  mode: "Development",
};

export const LOCATION_API = "https://ipapi.co/json/";
export const VPN_API =
  "https://vpnapi.io/api/?key=1d9dce1a6d5649f8869bba781bf1cf65";

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
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL_PAYMENT,
  api: {
    ACTIVATE: "api/payment/enroll",
    WALLET: "api/payment/wallet",
    INFORMATION: "api/payment/information/",
    deposit_WithDraw: "api/payment/transfers",
    fabiwallet: "api/payment/information",
    SKRILL_WALLET: "api/skrillcustomer/payment",
    DEPOSIT_PAYMENT: "api/casino/payment",
    GETGAMES: "getgames",
    FAILED_DEPOSIT: "api/casino/failedpayment",
    SKRILL_ADD: "api/casino/addpayment",
    ADD_PAYMENT_METHOD: "api/stripe/addpayment",
    CONFIRM_PAYMENT_METHOD: "api/stripe/payment",
    LIVE_GAME_LAUNCH: "launch",
    LIVE_BG_GAMEING_LAUNCH:"bgaminglaunch",
    GET_CRYPTO_CURRENCY: "getcurrencies",
    CRYPTO_PAYMENT: "payment",
    CREATE_CUSTOMER: "api/casino/createcustomer",
    CARD_INFO_BY_ID: "api/casino/cards",
    GET_PAYMENT_DETAILS:'getPaymentDetailsByPaymentId/',
    ADD_CRYPTO: 'addUserCyrpto',
    GET_CRYPTO_BY_USER: 'userAddress',
  },
};

export const sportEndPoint = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL_SPORT,
  api: {},

  mode: "Development",
};

export const appVersion = {
  version: "1.0.0",
};

export default {};

//us ethis url for the stripe payment
export const CASINO_US_WEBSITE = "https://stage.spinsaga.us/"; ///stage
// "https://www.spinsaga.us/";   //Prod url
// 'http://localhost:3001/'   // local url

console.log("process",process.env);
