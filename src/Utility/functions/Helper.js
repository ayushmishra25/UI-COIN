import {
  isMobile,
  isChrome,
  isEdge,
  isFirefox,
  isIE,
  isSafari,
} from "react-device-detect";
import axios from "axios";
import { LOCATION_API, VPN_API } from "../../constant/Environment";
import { setVPNResponse } from "../../redux/Reducers/AuthReducer/authSplice";

export const formatPlayerData = (data, martketIdArray = []) => {
  let formattedData = [];

  data.forEach((element) => {
    const { sport, location, league, startDate, participants } =
      element.fixture;
    let tempData = {};
    let marketfilteredData = element?.markets?.filter((marketEle) => {
      return martketIdArray.includes(marketEle.id);
    });

    const key = "id";
    let uniqueArr = [
      ...new Map(marketfilteredData?.map((item) => [item[key], item])).values(),
    ];

    uniqueArr = updateArray(uniqueArr, martketIdArray);

    let priority = [2, 1];
    let participantList = checkPosition(participants, priority);
    tempData.marketData = element?.markets; //uniqueArr;
    tempData.sport = sport;
    tempData.location = location;
    tempData.league = league;
    tempData.participants = participantList;
    tempData.startDate = startDate;
    tempData.fixtureId = element.fixtureId;
    tempData.id = element.id;
    tempData.goLive = element.fixture.goLive;
    if (tempData.marketData.length > 0) {
      formattedData.push(tempData);
    }
  });

  return formattedData;
};

export const formatApiData = (data, martketIdArray) => {
  let formattedData = [];

  data.forEach((element) => {
    const { sport, location, league, startDate, participants } =
      element.fixture;

    let tempData = {};
    let marketfilteredData = element?.markets?.filter((marketEle) => {
      return martketIdArray.includes(marketEle.id);
    });

    const key = "id";
    let uniqueArr = [
      ...new Map(marketfilteredData?.map((item) => [item[key], item])).values(),
    ];

    uniqueArr = updateArray(uniqueArr, martketIdArray);

    let priority = [2, 1];
    let participantList = checkPosition(participants, priority);
    tempData.marketData = uniqueArr;
    tempData.sport = sport;
    tempData.location = location;
    tempData.league = league;
    tempData.participants = participantList;
    tempData.startDate = startDate;
    tempData.fixtureId = element.fixtureId;
    tempData.id = element.id;
    tempData.goLive = element.fixture.goLive;
    if (tempData.marketData.length > 0) {
      formattedData.push(tempData);
    }
  });

  return formattedData;
};

export const formatWagerData = (data, martketIdArray) => {
  let formattedData = [];

  data.forEach((element) => {
    const { sport, location, league, startDate, participants } =
      element.fixture;

    let tempData = {};
    let marketfilteredData = element.markets.filter((marketEle) => {
      return martketIdArray.includes(marketEle.id);
    });

    const key = "id";
    let uniqueArr = [
      ...new Map(marketfilteredData.map((item) => [item[key], item])).values(),
    ];

    uniqueArr = updateArray(uniqueArr, martketIdArray);

    let priority = [2, 1];
    let participantList = checkPosition(participants, priority);
    tempData.marketData = uniqueArr;
    tempData.sport = sport;
    tempData.location = location;
    tempData.league = league;
    tempData.participants = participantList;
    tempData.startDate = startDate;
    tempData.fixtureId = element.fixtureId;
    tempData.id = element.id;

    formattedData.push(tempData);
  });

  return formattedData;
};

export const formatEventIdData = (data, martketIdArray, eventId) => {
  let formattedData = [];

  data.forEach((element) => {
    const { sport, location, league, startDate, participants } =
      element.fixture;
    const EventId = element.fixtureId;
    if (EventId === eventId) {
      let tempData = {};
      let marketfilteredData = element.markets.filter((marketEle) => {
        return martketIdArray.includes(marketEle.id);
      });

      const key = "id";
      let uniqueArr = [
        ...new Map(
          marketfilteredData.map((item) => [item[key], item])
        ).values(),
      ];

      uniqueArr = updateArray(uniqueArr, martketIdArray);

      let priority = [2, 1];
      let participantList = checkPosition(participants, priority);
      tempData.marketData = uniqueArr;
      tempData.sport = sport;
      tempData.location = location;
      tempData.league = league;
      tempData.participants = participantList;
      tempData.startDate = startDate;
      tempData.fixtureId = element.fixtureId;
      tempData.id = element.id;

      formattedData.push(tempData);
    }
  });

  return formattedData;
};

const updateArray = (arr, arr2) => {
  return arr.sort((a, b) => arr2.indexOf(a.id) - arr2.indexOf(b.id));
};

const checkPosition = (arr, arr2) => {
  return arr.sort(
    (a, b) =>
      arr2.indexOf(parseInt(a.position)) - arr2.indexOf(parseInt(b.position))
  );
};

const checkBetName = (arr) => {
  arr.map((value, index) => {
    if (value.id == 28) {
      value.bets.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }
  });
  return arr;
};

export const calculateOdds = (odds, stake) => {
  if (odds >= 0) {
    let total = stake * (odds / 100) + Number(stake); //5*(220/100)+5
    return total.toFixed(2);
  } else {
    let total = stake / (Math.abs(odds) / 100) + Number(stake);
    return total.toFixed(2);
  }
};

export const calculateReverseOdds = (odds, towin) => {
  if (odds >= 0) {
    return towin / (odds / 100) + 1;
  } else {
    return (towin * (odds / 100)) / (1 + odds / 100);
  }
};
export const calculateAllReverseOdds = (odds, stake) => {
  if (odds >= 0) {
    return stake * (odds / 100) + Number(stake); //5*(220/100)+5
  } else {
    return stake / (Math.abs(odds) / 100) + Number(stake);
  }
};
export const calculateAllOdds = (odds, stake) => {
  let totalodds = 1;
  let money = 1;
  let spread = 1;
  let total = 1;
  let usodds;
  odds.map((item) => {
    let first = item.t1Spread2 ?? item.tHome ?? item.priceUS;
    let second = item.t1Money2 ?? item.tTie;
    let third = item.t1Total2 ?? item.tAway;

    if (first != undefined) {
      if (first >= 0) {
        spread = (first / 100 + 1) * spread;
      } else {
        spread = (1 - 100 / first) * spread;
      }
    } else if (second != undefined) {
      if (second >= 0) {
        money = (second / 100 + 1) * money;
      } else {
        money = (1 - 100 / second) * money;
      }
    } else {
      if (third >= 0) {
        total = (third / 100 + 1) * total;
      } else {
        total = (1 - 100 / third) * total;
      }
    }
  });

  totalodds = spread * money * total;

  usodds = (totalodds - 1) * 100;

  var underdog = calculateOdds(usodds, stake);
  return underdog;
};

// filter data on the basis of event id
export const filterEventData = (data, multipleEventId) => {
  return data.map((item) => {
    const newdata = item.markets.filter((element) =>
      multipleEventId.includes(element.id)
    );
    return {
      fixtureId: item.fixtureId,
      markets: newdata,
    };
  });
};

export const getMarketSingleData = (data) => {
  let newmarket = [];
  data.forEach((element) => {
    if (element.markets.length > 0) {
      element.markets.map((item, index) => {
        if (newmarket.length == 0) {
          newmarket.push({
            id: `${element.id}_${index}`,
            name: item.statName,
          });
        } else {
          let filterData = newmarket.filter((d) => d.name == item.statName);

          if (filterData.length == 0) {
            newmarket.push({
              id: `${element.id}_${item.id}`,
              name: item.statName,
            });
          }
        }
      });
    }
  });
  return newmarket;
};

export const getMatchListData = (data, activeTabDate) => {
  // console.log(data,activeTabDate);
  let newTeam = [];
  let updated = data.filter((item) => item.displayDate == activeTabDate);
  updated.map((item, index) => {
    newTeam.push({
      id: `${item.id}`,
      name: item.eventName,
      shortname: item.shortEventName,
    });
  });
  // console.log('newTeam', newTeam)
  return newTeam;
};

export const getKeyPairList = (data) => {
  let newTeam = [];

  data.map((item, index) => {
    newTeam.push({
      id: `${index}`,
      name: item,
    });
  });

  return newTeam;
};

export const getdate = (data) => {
  let data_array = [];

  data.map((item, index) => {
    data_array.push({
      id: `${index}`,
      name: item.openDate,
      games: item.eventName,
      shortdate: item.displayDate,
    });
  });

  return data_array;
};

export const setCookie = (name, value, days) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + expirationDate.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const getCookie = (name) => {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
};

// getGame Menu Pair function
export const getGameMenuPair = (menu, gameList) => {
  let output = [];
  menu.forEach((menuItem) => {
    // Filter games that belong to this menu item
    let gamesForMenu = gameList.filter(
      (game) => game.menu === menuItem.id.toString()
    );

    // Push the menu item and its corresponding games to the output array
    output.push({
      menu: menuItem.menu_title,
      singleGameList: gamesForMenu.map((game) => ({
        game_name: game.game_name,
        game_id: game.game_id,
        game_creative: game.game_creative,
        feature_creative: game.feature_creative,
      })),
    });
  });

  return output;
};

//get Game Menu Pair and check istop and is new
export const getUniqueGameMenuPair = (menu, gameList) => {
  let output = [];
  output = menu.map((item) => {
    if (item.menu_title === "New Games") {
      let games = gameList.filter((game) => game.is_new === true);
      return { ...item, singleGameList: games };
    }
    if (item.menu_title === "Top Games") {
      let games = gameList.filter((game) => game.is_top === true);
      return { ...item, singleGameList: games };
    }
    let gamesForMenu = gameList.filter(
      (game) => game.menu === item.id.toString()
    );
    return { ...item, singleGameList: gamesForMenu };
  });
  return output;
};

// use this method to find the feature game only
export const findFeatureGame = (activeGameList, featureList) => {
  // Create a new output array for matching data
  const matchingGames = [];
  // Iterate through each game in featureGame
  featureList.forEach((feature) => {
    // Check if the game_name exists in allGame
    const matchingGame = activeGameList.find(
      (game) => game.game_name === feature.game_name
    );
    // If a match is found, add it to the output array
    if (matchingGame) {
      let data = {
        ...feature,
        feature_creative: matchingGame.feature_creative,
        game_creative: matchingGame.game_creative,
        game_id: matchingGame.game_id,
      };
      matchingGames.push(data);
    }
  });
  return matchingGames;
};

//use this method to display all children assicate with Memu
export const getMenuPair = (menu) => {
  let output = [];
  menu.forEach((item) => {
    if (item.nested_under !== "") {
      let parentItem = menu.find(
        (parent) => parent.menu_title === item.nested_under
      );
      if (parentItem) {
        if (!parentItem.children) {
          parentItem.children = [];
        }
        parentItem.children.push(item);
      }
    }
  });
  output = menu.filter((item) => item.nested_under === "");
  return output;
};

export const validateOnlyChar = (value) => {
  // contains only letters and numbers
  const regex = /^[a-zA-Z]+$/;
  return regex.test(value) ? false : true;
};

export const validateNoSpecialChar = (value) => {
  // contains only letters and numbers
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(value) ? false : true;
};

export const validateEmail = (emailAdress) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
};

export const validateOnlyLetters = (value) => {
  // contains only letters
  const regex = /^[a-zA-Z ]+$/;
  return regex.test(value) ? false : true;
};

export const validatePassword = (password) => {
  // Regular expression pattern for password validation
  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  // Test the password against the regex pattern
  return regex.test(password);
};

export const sumSC_credit_SC_Main = (sc_credit, sc_main) => {
  return (sc_credit + sc_main).toFixed(2);
};

export const isOldEnough = (day, month, year) => {
  if (!day || !month || !year) return false;

  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    return age - 1 >= 18;
  }

  return age >= 18;
};

export const devicetype = () => {
  if (isMobile) return "Mobile web";
  else return "web";
};

export const BrowserInfo = () => {
  if (isChrome) return "Google Chrome";
  if (isFirefox) return "Mozilla Firefox";
  if (isSafari) return "Apple Safari";
  if (isEdge) return "Microsoft Edge";
  if (isIE) return "Internet Explorer";
  return "Unknown Browser";
};

export const checkGeoAndVpnold = async (
  dispatch,
  expectedCountryCode = "US"
) => {
  try {
    const [locationRes, vpnRes] = await Promise.all([
      axios.get(LOCATION_API),
      axios.get(VPN_API),
    ]);

    // console.log('locationRes',locationRes?.data?.country_code);
    // console.log('vpnRes',vpnRes)

    const isVpn = false; //  vpnRes?.data?.security?.vpn;
    const userCountry = locationRes?.data?.country_code;

    const RegionCode = locationRes?.data?.region_code;
    dispatch(setVPNResponse(isVpn));
    let result =
      RegionCode === "WA" ||
      RegionCode === "ID" ||
      RegionCode === "NV" ||
      RegionCode === "ND" ||
      RegionCode === "NE" ||
      RegionCode === "MI"
        ? true
        : false;

    let checkUserCountry =
      userCountry === expectedCountryCode ? result || isVpn : false;
    return checkUserCountry;
  } catch (error) {
    console.error("Geo/VPN check failed:", error);
    return false;
  }
};

// export const checkGeoAndVpn_old = async (
//   dispatch,
//   expectedCountryCode = "US"
// ) => {
//   console.log("checkGeoAndVpn called", navigator);
//   if (!navigator.geolocation) {
//     console.log("Geolocation not supported");
//     return;
//   }
//   navigator.geolocation.getCurrentPosition(
//     async (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log("Lat:", latitude, "Lng:", longitude);

//       // Proceed to reverse geocode

//       const locationData = await getAddressFromCoords(latitude, longitude);
//       const userCountry = locationData.country;
//       const RegionCode = locationData.stateCode;
//       let result =
//         RegionCode === "WA" ||
//         RegionCode === "ID" ||
//         RegionCode === "NV" ||
//         RegionCode === "ND" ||
//         RegionCode === "NE" ||
//         RegionCode === "MI"
//           ? true
//           : false;
//       console.log(locationData);
//       const isVpn = false;
//       dispatch(setVPNResponse(isVpn));
//       let checkUserCountry =
//         userCountry === expectedCountryCode ? result : false;
//       console.log("checkUserCountry", checkUserCountry);
//       return !checkUserCountry;
//     },
//     (error) => {
//       console.error("Location error:", error.message);
//     }
//   );
//   return true;
// };
export const checkGeoAndVpn = async (dispatch, expectedCountryCode = "US") => {
  // console.log("checkGeoAndVpn called", navigator);

  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      resolve(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log("Lat:", latitude, "Lng:", longitude);

          // Reverse geocoding call
          const locationData = await getAddressFromCoords(latitude, longitude);
          const userCountry = locationData.country;
          const RegionCode = locationData.stateCode;

          const notAllowedRegions = [
            // "CA",
            "WA",
            "ID",
            "NV",
            "ND",
            "NE",
            "MI",
            "CT",
            "DE",
            "KY",
            "LA",
            "MD",
            "MS",
            "NY",
            "PA",
          ];
          const result = notAllowedRegions.includes(RegionCode);

          const isVpn = false; // You can integrate VPN API check here if needed
          dispatch(setVPNResponse(isVpn));

          const checkUserCountry =
            userCountry === expectedCountryCode ? result : false;

          resolve(checkUserCountry);
        } catch (err) {
          console.error("Error during reverse geocoding or processing:", err);
          resolve(false);
        }
      },
      (error) => {
        console.error("Location error:", error.message);
        resolve(false);
      }
    );
  });
};
export async function getAddressFromCoords(lat, lng) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
  );
  const data = await response.json();
  const address = data.address;

  const state = address.state || "";
  const country = address.country_code?.toUpperCase() || ""; // e.g., IN, US

  // Optional: Map state name → state code manually
  const stateCode =
    country == "US" ? getStateCodeFromName(state, country) : state;
  // console.log("stateCode", stateCode, "country", country);
  return {
    city: address.city || address.town || address.village || "",
    state,
    stateCode: country == "US" ? stateCode : state,
    country,
  };
}

const STATE_CODES = {
  IN: {
    Maharashtra: "MH",
    Karnataka: "KA",
    Delhi: "DL",
  },
  US: {
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
  },
};

function getStateCodeFromName(stateName, countryCode) {
  return STATE_CODES[countryCode]?.[stateName] || "";
}
