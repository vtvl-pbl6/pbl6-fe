import { Routes, Route, Navigate } from "react-router-dom";
import LoadableComponent from "../../components/loadable-component";
import UserRoute from "./user-route.js";
import AdminRoute from "./admin-route.js";
//import layout cho admin và user
// import UserLayout from "../../components/layout/user/MainLayout.jsx";
// import AdminLayout from "../../components/layout/admin/MainLayout.jsx";

const UserHomePage = LoadableComponent(() =>
    import("../pages/Homepage/index.jsx")
);

const AllRoutes = () => {
    return (
        <Routes>
            {/* Redirect to /user-homepage */}
            <Route path="/" element={<Navigate to={"/user-homepage"} />} />
            <Route path="/user-homepage" element={<UserHomePage />} />

            {/* Admin route và ví dụ cách tự động bỏ mainlayout */}
            {/* <Route element={<AdminRoute />}>
                <Route
                    path="/admin/manage-account"
                    element={
                        <MainLayout component={ManageAccount} />
                    }
                />
                <Route
                    path="/admin/manage-activity"
                    element={
                        <MainLayout
                            component={ManageActivity}
                        />
                    }
                />
            </Route> */}
        </Routes>);
};

export default AllRoutes;
