import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from './AuthContext';

const NotAuthRoutes = () => {
  const { isAuth } = useContext(AuthContext);
  const location = useLocation();
  console.log(location)

  return (
    isAuth && location.pathname === '/' ? <Navigate to="/home" /> : <Outlet />
  )
}

export default NotAuthRoutes