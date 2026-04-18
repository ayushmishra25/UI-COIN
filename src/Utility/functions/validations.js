const messages = {
    isRequired: "This field is required.",
    notValid: "Email is not Valid",
    username: "Username must be 5 characters long.",
    notMatch: "Password doesn't match",
    password: "Password must be 8 charactors long",
  };
  
  import {
    isEmailValid,
    isNameValid,
    isPasswordValid,
    isPhoneValid,
  } from "../regex";
  
  export const validateEmail = (fieldValue) => {
    return fieldValue.trim() === ""
      ? messages.isRequired
      : isEmailValid(fieldValue)
      ? ""
      : messages.notValid;
  };
  
  export const validatePhone = (fieldValue) => {
    return fieldValue.trim() === ""
      ? messages.isRequired
      : isPhoneValid(fieldValue)
      ? ""
      : messages.notValid;
  };
  export const validateName = (fieldValue) => {
    return fieldValue.trim() === ""
      ? messages.isRequired
      : isNameValid(fieldValue)
      ? ""
      : messages.notValid;
  };
  
  export const userNameValidator = (userName) => {
    if (!userName || userName.length <= 4)
      return "Username must be 5 characters long.";
    return "";
  };
  
  export const validatePassword = (fieldValue) => {
    return fieldValue.trim() === ""
      ? messages.isRequired
      : isPasswordValid(fieldValue)
      ? ""
      : messages.password;
  };
  
  export const validateConfirmPassword = (fieldValue, password) => {
    return fieldValue.trim() === ""
      ? messages.isRequired
      : fieldValue === password
      ? ""
      : messages.notMatch;
  };
  
  export const validateData = (fieldValue) => {
    if (fieldValue.trim() === "") {
      return messages.isRequired;
    } else {
      return "";
    }
  };
  