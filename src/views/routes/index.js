import { Routes, Route, Navigate } from "react-router-dom";
import LoadableComponent from "../../components/loadable-component";
import UserRoute from "./user-route.js";
// import AdminRoute from "./admin-route.js";
// import AdminLayout from "../../layout/admin/AdminLayout.jsx";
import UserLayout from "../../layout/user/UserLayout.jsx";

const UserHomePage = LoadableComponent(() =>
  import("../pages/Homepage/index.jsx")
);
const Login = LoadableComponent(() =>
  import("../../layout/auth/Login/index.jsx")
);

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/auth/login"} />} />
      <Route path="/auth/login" element={<Login />} />

      {/* User */}
      <Route element={<UserRoute />}>
        <Route
          path="/user-homepage"
          element={<UserLayout component={UserHomePage} />}
        />
      </Route>

      {/* Admin */}
      {/* <Route element={<AdminRoute />}>
                <Route
                    path="/admin/manage-account"
                    element={
                        <AdminLayout component={ManageAccount} />
                        <AdminLayout component={ManageAccount} />
                    }
                />
                <Route
                    path="/admin/manage-activity"
                    element={
                        <AdminLayout component={ManageActivity} />
                    }
                />
            </Route> */}
    </Routes>
  );
};

export default AllRoutes;
