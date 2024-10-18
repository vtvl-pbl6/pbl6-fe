import { Navigate, Route, Routes } from "react-router-dom";
import LoadableComponent from "../../components/loadable-component";
import UserRoute from "./user-route.js";
import AdminRoute from "./admin-route.js";
import AdminLayout from "../../layout/admin/AdminLayout.jsx";
import UserLayout from "../../layout/user/UserLayout.jsx";

const UserHomePage = LoadableComponent(() =>
  import("../pages/Homepage/index.jsx")
);
const Login = LoadableComponent(() =>
  import("../../layout/auth/Login/index.jsx")
);
const Signup = LoadableComponent(() =>
  import("../../layout/auth/Signup/index.jsx")
);
const ForgotPassword = LoadableComponent(() =>
  import("../../layout/auth/ForgotPassword/index.jsx")
);
const Profile = LoadableComponent(() => import("../pages/Profile/index.jsx"));
const Activity = LoadableComponent(() => import("../pages/Activity/index.jsx"));
const Search = LoadableComponent(() => import("../pages/Search/index.jsx"));
const ManageAccount = LoadableComponent(() =>
  import("../pages/ManageAccount/index.jsx")
);
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/auth/login"} />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />

      {/* User */}
      <Route element={<UserRoute />}>
        <Route
          path="/user-homepage"
          element={<UserLayout component={UserHomePage} />}
        />
        <Route path="/profile" element={<UserLayout component={Profile} />} />
        <Route path="/activity" element={<UserLayout component={Activity} />} />
        <Route path="/search" element={<UserLayout component={Search} />} />
      </Route>

      {/* Admin */}
      <Route element={<AdminRoute />}>
        <Route
          path="/admin/manage-account"
          element={<AdminLayout component={ManageAccount} />}
        />
        {/* <Route
          path="/admin/manage-post"
          element={<AdminLayout component={ManagePost} />}
        /> */}
      </Route>
    </Routes>
  );
};

export default AllRoutes;
