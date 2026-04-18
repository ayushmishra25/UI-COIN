import axios from "axios";
// @ts-ignore
//import * as SecureStore from "expo-secure-store";
import i18n from "../i18n/config";

import { endPoints, sportEndPoint } from "../constant/Environment";
export const BASE_URL = endPoints.apiBaseUrl;
export const BASE_URL_BET = sportEndPoint.apiBaseUrl;
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const axiosInstanceBet = axios.create({
  baseURL: BASE_URL_BET,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add language header to every request
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = i18n.language || "en";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceBet.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = i18n.language || "en";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
