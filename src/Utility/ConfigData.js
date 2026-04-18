// stable config which is no change.

import axios from "axios";
import React from "react";
import { GeoComplyKey } from "../constant/GeoEnv";
import { endPoints } from "../constant/Environment";
import { addData } from "./API";
import {
  setUserGeoLocation,
  setGeoError,
} from "../redux/Reducers/GlobalReducer/globalSlice";
var CryptoJS = require("crypto-js");
var convert = require("xml-js");
// Encrypt

let dispatch;

export const setDispatch = (d) => {
  dispatch = d;
};

function addSeconds(date, seconds) {
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}

const decryption = GeoComplyKey.decryption_key;
const decryptionIV = GeoComplyKey.decryption_IV_key;
export const decryptUsingAES128 = (data, payload) => {
  // console.log('decryptUsingAES128',data)

  let _key = CryptoJS.enc.Hex.parse(decryption);
  let _iv = CryptoJS.enc.Hex.parse(decryptionIV);
  let decrypted = CryptoJS.AES.decrypt(data, _key, {
    keySize: 16,
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  decrypted = decrypted.toString(CryptoJS.enc.Utf8);
  //  console.log('decrypted',decrypted)

  var xmljSONreponse = convert.xml2json(decrypted, {
    compact: false,
    spaces: 4,
  });
  var JsonResult = JSON.parse(xmljSONreponse);

  const allResult = JsonResult?.elements[0]?.elements;
  // console.log("allResult", allResult);

  let filter = allResult?.filter(
    (d) =>
      d.name == "error_code" ||
      d.name == "error_message" ||
      d.name == "error_details" ||
      d.name == "error_summary" ||
      d.name == "troubleshooter"
  );
  // console.log('filter',filter)
  let traceFilterInfo = allResult?.filter(
    (d) =>
      d.name == "gps" || d.name == "gsm" || d.name == "wifi" || d.name == "ip"
  );

  let timeFilter = allResult?.filter(
    (d) => d.name == "geolocate_in" || d.name == "timestamp"
  );
  let ipFilter = allResult?.filter((d) => d.name == "ip");

  let region =
    traceFilterInfo[0]?.attributes?.region ||
    traceFilterInfo[1]?.attributes?.region ||
    traceFilterInfo[2]?.attributes?.region ||
    traceFilterInfo[3]?.attributes?.region;
  //  console.log('all Location',region)
  let region_code =
    traceFilterInfo[0]?.attributes?.region_code ||
    traceFilterInfo[1]?.attributes?.region_code ||
    traceFilterInfo[2]?.attributes?.region_code ||
    traceFilterInfo[3]?.attributes?.region_code;

  // console.log("region",region,region_code);

  // dispatch({
  //   type: Actions.STATE_LOCATION,
  //   data: { stateCode: region_code, stateName: region },
  // });

  let primaryLocation = [];
  if (traceFilterInfo) {
    primaryLocation = traceFilterInfo?.filter(
      (item) => item?.attributes?.primary == "1"
    );
    region = primaryLocation[0]?.attributes?.region;
    region_code = primaryLocation[0]?.attributes?.region_code;
    // dispatch({
    //   type: Actions.STATE_LOCATION,
    //   data: { stateCode: region_code, stateName: region },
    // });
  }

  if (filter[0]?.elements[0]?.text == "1") {
    // dispatch({
    //   type: Actions.GEO_BASED_WALLET,
    //   data: false,
    // });
    // dispatch({
    //   type: Actions.GEO_RESPONSE, //Flag for the Geocomply response
    //   data: true,
    // });
    const priority = {
      Proxy: 1,
      Boundary: 2,
    };
    let arr = filter[4]?.elements;
    arr?.sort((a, b) => {
      return (
        (priority[a.attributes.rule] || 999) -
        (priority[b.attributes.rule] || 999)
      );
    });
    if (arr.length > 0) {
      const errorData = {
        type: arr[0].attributes.rule,
        message: arr[0].elements[0].text,
      };
      dispatch(setGeoError(errorData));

      dispatch(setUserGeoLocation(true));
      payload.state = region;
      payload.geo = false;
      // console.log("payload",payload);
      submitTraceData(payload);

      // dispatch({
      //   type: Actions.GEO_ERROR,
      //   data: {
      //     type: arr[0].attributes.rule,
      //     message: arr[0].elements[0].text,
      //   },
      // });
      // customAlert(arr[0].elements[0].text);
    }

    // for (var item of filter[4]?.elements) {
    //   if (item.elements[0]?.text) {
    //     alert(item.elements[0]?.text);
    //     break;
    //   }
    // }
  } else if (filter[0]?.elements[0]?.text == "0") {
    // dispatch({
    //   type: Actions.GEO_BASED_WALLET,
    //   data: true,
    // });
    // dispatch({
    //   type: Actions.GEO_RESPONSE, //Flag for the Geocomply response
    //   data: false,
    // });
    dispatch(setUserGeoLocation(false));
    let time = timeFilter[0].elements[0].text;
    let ipAddress = ipFilter[0].attributes?.ipaddress;
    // 12:00:00 AM on April 17, 2022
    const date = new Date();

    // 12:00:20 AM on April 17, 2022
    const newDateTime = addSeconds(date, parseInt(time));
    //  console.log('date',newDateTime);
    //  console.log('ip',ipAddress);
    payload.state = region;
    payload.geo = true;
    console.log("payload else if", payload);
    // dispatch({
    //   type: Actions.GEOLOCATION,
    //   data: { dateTime: newDateTime, ip: ipAddress },
    // });
    submitTraceData(payload);

    return true;
  }

  return false;

  // return JsonResult;
};
// encryptUsingAES128()
//decryptUsingAES128();

//const license = JSON.parse(localStorage.getItem("license" ));
var initConfig = {
  //   oobeeUrl: 'url of new Oobee Server version 2.x',
  oobeeUrl: GeoComplyKey.oobeeUrl,
  license: localStorage.getItem("license"),
};
//console.log("initConfig", initConfig);
// Initialize new Oobee Client

// export const client = GCOobee.createClient(initConfig); // eslint-disable-line
// export const clientMob = GCOobee; // eslint-disable-line

export const geoClientMob = window.GcHtml5; // eslint-disable-line
// export const geoClientMob = GcHtml5; // eslint-disable-line
// export client;

export const middleCallback = async (data) => {
  switch (data.type) {
    case "LOG":
      console.log(data.message);
      break;
    case "INTERACTION":
      // Acquire interaction: such as show popup with data.link...
      // Data object includes: {type, message, reason, link}
      // Acquire interaction with data.link:
      // Such as show popup. It should have a timer to push users to click on

      // There is a reason field inside the INTERACTION object for clients can
      // detect if they want to use their own message as below:

      // 'app_required': when need to open app to geolocate.
      // 'tlb_require': when need to open TLB to geolocate.
      // 'location_required': when Location permission is not granted.
      // 'precise_location_required': when Precise Location permission is not granted.
      // 'notification_required': when Notification on IOS permission is not granted. (Android no need notification permission anymore)
      break;
    default:
      console.log(`Unhandled ${data.type}: ${data.message}`);
  }
};
export const finalCallback = async (err, data) => {
  if (err) {
    console.log("Geolocate failed with error code: " + err.error_code);
    console.log("Geolocate failed with error message: " + err.error_message);
    // ErrorToast('err',err.error_message);
    return {
      status: "failed",
      message: err.error_message,
    };
  } else {
    console.log("Geolocate succeeded with data: " + data);
    return {
      status: "success",
      message: "Successfully login",
    };
  }
};
//Four configs which may change on each geolocation request.
// var geolocateOptions = {
//   userId: "user1",
//   phone: "1234567890",
//   reason: "login",
//   session: "123",
// };
// Parameters options of geolocate method is used only 1 time in this turn.
// It will be reset after that.
// client.geolocate(geolocateOptions, middleCallback, finalCallback);

export const getIpAddress = async () => {
  const res = await axios.get("https://api.ipify.org/?format=json");
  console.log("iup", res.data);

  return res.data;
  // setIP(res.data.ip);
};

const submitTraceData = async (payload) => {
  let url = `${endPoints.api.USER_TRACE}`;

  await addData(url, payload)
    .then(async (response) => {})
    .catch((error) => {
      console.error(error);
    });
};

export const getWebsiteInfo = () => {
  let url = window.origin;
  if (url.includes("stage.spinsagacasino")) {
    return "stage";
  } else if (url.includes("play.spinsagacasino")) {
    return "live";
  } else if (window.origin.includes("localhost")) {
    return "local";
  }
};
