import React, { createContext, useState } from 'react';
import { useLogoutMutation } from '../app/usersSlice';
import { getCookie } from '../cookies/Cookies';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logout] = useLogoutMutation()
  let token = getCookie('token');
  const [isAuth, setIsAuth] = useState(token);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setIsAuth(false);
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
