import { axiosInstance, axiosInstanceBet } from "./axiosInstances";
//axiosFormInstance
let header_token;
export const setHeader = async (token) => {
  header_token = token;
};

const exports = {
  setHeader,
};

export default exports;

export const addData = async (endpoint, requestBody) => {
  try {
    const result = await axiosInstance.post(endpoint, requestBody);
    return result;
  } catch (error) {
    return error;
  }
};
export const addBetData = async (endpoint, requestBody) => {
  try {
    const result = await axiosInstanceBet.post(endpoint, requestBody);
    return result;
  } catch (error) {
    return error;
  }
};
export const getData = async (url) => {
  try {
    let result = await axiosInstanceBet.get(url);
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const updateBetUser = async (url, data) => {
  try {
    let result = await axiosInstanceBet.put(`${url}`, data);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getAllBetData = async (url) => {
  try {
    let result = await axiosInstanceBet.get(url);
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const updateData = async (endpoint, requestBody) => {
  try {
    const result = await axiosInstance.patch(endpoint, requestBody);
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const result = await axiosInstance.delete(endpoint);
    return result;
  } catch (error) {
    return error;
  }
};

export const getAllData = async (url) => {
  try {
    let result = await axiosInstance.get(url);
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const updateUser = async (url, data) => {
  try {
    let result = await axiosInstance.put(`${url}`, data);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

export async function fetchAllData(url) {
  // let tokenStr = await getHeaders();
  var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${tokenStr}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // return fetch(BASE_URL+url, requestOptions);
  return fetch(url, requestOptions);
}
