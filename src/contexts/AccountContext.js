import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import axiosClient from "../api/axiosClient";
import authAPI from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import accountInfoAPI from "../api/accountAPI";

const AccountContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem("account"))
  );
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  const logout = async () => {
    try {
      const response = await authAPI.logout();
      if (response.status === 200) {
        setToken(null);
        setAccount(null);
        localStorage.removeItem("token");
        localStorage.removeItem("account");
        setPosts([]);
        setPage(1);
        delete axiosClient.application.defaults.headers.common["Authorization"];
        delete axiosClient.formData.defaults.headers.common["Authorization"];
        navigate("/");
      } else {
        console.error("Logout failed", response.errors);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const providerValue = useMemo(
    () => ({
      token,
      setToken,
      account,
      setAccount,
      posts,
      setPosts,
      page,
      setPage,
      logout,
    }),
    [token, account, posts, page]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken || token) {
      const currentToken = storedToken || token;
      setToken(currentToken);
      axiosClient.application.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${currentToken}`;
      axiosClient.formData.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${currentToken}`;
      accountInfoAPI
        .getInfoByToken()
        .then((response) => {
          setAccount(response.data.data);
          localStorage.setItem("account", JSON.stringify(response.data.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
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

export const useAccount = () => {
  return useContext(AccountContext);
};

export default AccountContext;
