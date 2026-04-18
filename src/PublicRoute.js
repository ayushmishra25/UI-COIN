import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  // const isAuthenticated = 
  const authState = useSelector((state) => state.auth);
  const {  isAuthenticated  } = authState;

  // Redirect to home if user is authenticated
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
    