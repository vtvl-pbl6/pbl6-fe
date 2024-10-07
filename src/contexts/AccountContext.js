import { createContext, useState, useEffect, useMemo } from "react";
import axiosClient from "../api/axiosClient";
import authAPI from "../api/authAPI";
const AccountContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem("account"))
  );
  const logout = async () => {
    try {
      const response = await authAPI.logout();
      if (response.is_success) {
        setToken(null);
        setAccount(null);
        localStorage.removeItem("token");
        localStorage.removeItem("account");
      } else {
        console.error("Logout failed", response.errors);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  console.log("Current token:", token);
  console.log("LocalStorage token:", localStorage.getItem("token"));
  const providerValue = useMemo(
    () => ({ token, setToken, account, setAccount, logout }),
    [token, account]
  );

  useEffect(() => {
    if (token !== null) {
      axiosClient.application.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      axiosClient.formData.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      // User logout
      delete axiosClient.application.defaults.headers.common["Authorization"];
      delete axiosClient.formData.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AccountContext.Provider value={providerValue}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
