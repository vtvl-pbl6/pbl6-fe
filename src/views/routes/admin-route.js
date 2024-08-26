import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = () => {
    const { account } = useAuth();

    if (account && account.role === 1) { // thay đổi theo role
        return <Outlet />;
    } else {
        return <Navigate to="/" />; // đổi đường dẫn đến page tương ứng với khi truy cập admin
    }
};

export default AdminRoute;
