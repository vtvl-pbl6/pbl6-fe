import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UserRoute = () => {
    const { account } = useAuth();

    if (account && account.role === 2) { // thay đổi theo role
        return <Outlet />;
    } else {
        return <Navigate to="/home-page" />; // đổi đường dẫn đến page tương ứng với khi truy cập user
    }
};

export default UserRoute;
