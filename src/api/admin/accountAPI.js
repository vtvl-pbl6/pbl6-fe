import axiosClient from "../axiosClient";
const prefix_url = process.env.REACT_APP_API_URL;
const AccountAPI = {
  getAccounts: async () => {
    const url = prefix_url + "/admin/account";
    return await axiosClient.application.get(url);
  },
};

export default AccountAPI;
