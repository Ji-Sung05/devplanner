import React, { createContext, useEffect, useState } from "react";
import { useGetAuthQuery, useLogoutMutation } from "../app/usersSlice";
import { getCookie } from "../cookies/Cookies";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isSuccess, isLoading } = useGetAuthQuery();
  const [logout] = useLogoutMutation();
  const [isAuth, setIsAuth] = useState(isSuccess);
  let token = getCookie("token");

  // 1. refresh 시에 token이 있는지 -> token이 남아있어야 함
  // 2. const isLogin = getCookie("token");
  // 3. 로그인 상태를 확인하기 위해서 매번 로그인 요청을 보내야 한다면 -> isLoading 같은 상태를 가지고 로그인 요청 중에는 하위 children을 렌더링하지 않도록 한다.
  // github oauth 를 사용 중

  useEffect(() => {
    if (!token) {
      setIsAuth(false);
    } else {
      setIsAuth(isSuccess);
    }
  }, [token, isSuccess]);

  const handleLogout = async () => {
    try {
      //await logout().unwrap();
      setIsAuth(false);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, handleLogout }}>
      {isLoading ? "loading..." : children}
    </AuthContext.Provider>
  );
};
