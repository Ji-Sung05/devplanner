import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './AuthContext';

const NotAuthRoutes = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    isAuth ? <Navigate to={'/home'} /> : <Outlet />
  )
}

export default NotAuthRoutes