import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from './AuthContext';

const NotAuthRoutes = () => {
  const { isAuth } = useContext(AuthContext);
  const location = useLocation();

  return (
    isAuth ? <Navigate to={location.pathname} /> : <Outlet />
  )
}

export default NotAuthRoutes