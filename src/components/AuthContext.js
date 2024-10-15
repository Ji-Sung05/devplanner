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
    // 토큰이 있고, API 호출이 성공하면 인증 상태를 true로 설정
    if (token && isSuccess) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token, isSuccess]);

  const handleLogout = async () => {
    try {
      //await logout().unwrap();
      setIsAuth(false);
      window.location.href = "/login";
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
