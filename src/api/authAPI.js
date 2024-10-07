import axiosClient from "./axiosClient";
const prefix_url = process.env.REACT_APP_API_URL;
const authAPI = {
  login: async (credentials) => {
    const url = prefix_url + "/auth/login";
    return await axiosClient.applicationNoAuth.post(url, credentials);
  },
  logout: async () => {
    const url = prefix_url + "/auth/revoke-token";
    return await axiosClient.application.post(url);
  },
  register: async (user) => {
    const url = prefix_url + "/auth/register";
    return await axiosClient.applicationNoAuth.post(url, user);
  },
  sendForgotPassword: async (email) => {
    const url = prefix_url + "/mail/sendResetPassword/" + email;
    return await axiosClient.applicationNoAuth.get(url);
  },
  resetPassword: async (token, newPassword) => {
    const url = prefix_url + "/auth/resetPassword";
    return await axiosClient.applicationNoAuth.post(url, {
      token: token,
      newPassword: newPassword,
    });
  },
};

export default authAPI;
