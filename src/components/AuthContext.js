import React, { createContext, useState } from "react";
import { getCookie } from "../cookies/Cookies";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(getCookie("token"));

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};
