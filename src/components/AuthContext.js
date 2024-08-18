import React, { createContext, useState, useEffect } from 'react';
import { useGetAuthQuery } from '../app/usersSlice';
import { getCookie, removeCookie } from '../cookies/Cookies';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isSuccess } = useGetAuthQuery();
  const [isAuth, setIsAuth] = useState(isSuccess);
  let token = getCookie('token');

  useEffect(() => {
    if (!token) {
      setIsAuth(false);
    } else {
      setIsAuth(isSuccess);
    }
  }, [token, isSuccess]);

  const logout = () => {
    removeCookie('token');
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
