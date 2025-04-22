import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null; // 로딩 중일 땐 아무것도 렌더링하지 않음

  return isAuthenticated ? children : <Navigate to="/account" />;
};

export default PrivateRoute;
