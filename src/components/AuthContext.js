import React, { createContext, useState, useEffect } from 'react';
import { useGetAuthQuery, useLogoutMutation } from '../app/usersSlice';
import { getCookie, removeCookie } from '../cookies/Cookies';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isSuccess } = useGetAuthQuery();
  const [isAuth, setIsAuth] = useState(isSuccess);
  const [logout] = useLogoutMutation();
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
      setIsAuth(false)
      window.location.href = '/login'; // 로그아웃 후 로그인 페이지로 리디렉트
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
