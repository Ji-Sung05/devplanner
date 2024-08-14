import React, { createContext, useState, useEffect } from 'react';
import { useGetAuthQuery, useLogoutMutation } from '../app/usersSlice';
import { getCookie, removeCookie } from '../cookies/Cookies';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isSuccess } = useGetAuthQuery();
  const [isAuth, setIsAuth] = useState(isSuccess);
  const [logoutRequest] = useLogoutMutation()
  let token = getCookie('token');

  useEffect(() => {
    if (!token) {
      setIsAuth(false);
    } else {
      setIsAuth(isSuccess);
    }
  }, [token, isSuccess]);

  const logout = async () => {
    try {
      await logoutRequest().unwrap()
      removeCookie('token')
      setIsAuth(false)
    } catch(error) {
      console.error('logout failed: ', error)
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
