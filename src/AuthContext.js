import React, { createContext, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginData } from './redux/Reducers/AuthReducer/authSplice';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
   const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const {  isAuthenticated  } = authState;


  const login = () => {

  };

  const logout = () => {

   dispatch(setLoginData({ user: {}, isAuthenticated: false }));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
