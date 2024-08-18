import React, { createContext, useState, useEffect } from 'react';
import { useGetAuthQuery, useLogoutMutation } from '../app/usersSlice';
import { getCookie } from '../cookies/Cookies';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isSuccess } = useGetAuthQuery();
  const [logout] = useLogoutMutation()
  const [isAuth, setIsAuth] = useState(isSuccess);
  let token = getCookie('token');

  useEffect(() => {
    if (!token) {
      setIsAuth(false);
    } else {
      setIsAuth(isSuccess);
    }
  }, [token, isSuccess]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
