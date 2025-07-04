// components/ProtectedRoutes/PrivateRoutes.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAdminLoggedIn } = useContext(AuthContext);

  return isAdminLoggedIn ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
