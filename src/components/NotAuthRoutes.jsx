import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './AuthContext';

const NotAuthRoutes = () => {
  const { isAuth, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;  // 로딩 중일 때 리다이렉션 하지 않음
  }
  return (
    isAuth ? <Navigate to={'/home'} /> : <Outlet />
  )
}

export default NotAuthRoutes