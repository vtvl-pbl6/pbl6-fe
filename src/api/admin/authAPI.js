import axiosClient from "../axiosClient";
const prefix_url = process.env.REACT_APP_API_URL;
const AuthAPI = {
  logoutAdmin: async () => {
    const url = prefix_url + "/admin/auth/revoke-token";
    return await axiosClient.application.post(url);
  },
};

export default AuthAPI;
