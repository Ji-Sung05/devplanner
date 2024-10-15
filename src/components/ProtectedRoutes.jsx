import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './AuthContext';

const ProtectedRoutes = () => {
  const { isAuth, loading } = useContext(AuthContext);

  if(loading) {
    return <div>Loading...</div>
  }
  return (
    isAuth ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default ProtectedRoutes