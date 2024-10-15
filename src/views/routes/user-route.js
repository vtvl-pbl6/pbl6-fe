import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UserRoute = () => {
  const { account } = useAuth();
  console.log(account.role);
  if (account.role === "USER") {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default UserRoute;
