import { Routes, Route, Navigate } from "react-router-dom";
import LoadableComponent from "../../components/loadable-component";
import UserRoute from "./user-route.js";
import AdminRoute from "./admin-route.js";
import AdminLayout from "../../layout/admin/AdminLayout.jsx";
// import UserLayout from "../../components/layout/user/UserLayout.jsx";


const UserHomePage = LoadableComponent(() =>
    import("../pages/Homepage/index.jsx")
);
const ManageAccount = LoadableComponent(() =>
    import("../pages/ManageAccount/index.jsx")
);
const AllRoutes = () => {
    return (
        <Routes>
            {/* Redirect to /user-homepage */}
            {/* <Route path="/" element={<UserHomePage />} /> */}
            <Route
                    path="/"
                    element={
                        <AdminLayout component={ManageAccount} />
                    }
                />
            {/* Admin route và ví dụ cách tự động bỏ mainlayout */}
            {/* <Route element={<AdminRoute />}>
                <Route
                    path="/admin/manage-account"
                    element={
                        <AdminLayout component={ManageAccount} />
                    }
                />
                <Route
                    path="/admin/manage-activity"
                    element={
                        <AdminLayout
                            component={ManageActivity}
                        />
                    }
                />
            </Route> */}
        </Routes>);
};

export default AllRoutes;
