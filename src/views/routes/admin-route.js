import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = () => {
  const { account } = useAuth();

  if (account && account.role === "ADMIN") {
    // thay đổi theo role
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default AdminRoute;
