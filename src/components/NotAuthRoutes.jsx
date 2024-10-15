import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const NotAuthRoutes = () => {
  const { isAuth } = useContext(AuthContext);
  const location = useLocation();

  // 사용자가 인증되어 있고, 현재 경로가 루트('/')일 때만 '/home'으로 리다이렉트
  if (isAuth && location.pathname === '/') {
    return <Navigate to="/home" />;
  }

  // 인증되지 않았을 경우 현재 페이지를 유지
  return <Outlet />;
};

export default NotAuthRoutes;
