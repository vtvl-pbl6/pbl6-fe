import axiosClient from "../axiosClient";
const prefix_url = process.env.REACT_APP_API_URL;
const AccountAPI = {
  getAccounts: async () => {
    const url = prefix_url + "/admin/account";
    return await axiosClient.application.get(url);
  },
  activateAccount: async (id) => {
    const url = `${prefix_url}/admin/account/${id}/activate`;
    return await axiosClient.application.patch(url);
  },
  deactivateAccount: async (id) => {
    const url = `${prefix_url}/admin/account/${id}/deactivate`;
    return await axiosClient.application.patch(url);
  },
};

export default AccountAPI;
