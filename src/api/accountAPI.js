import axiosClient from "./axiosClient";

const accountInfoAPI = {
  getInfoByToken: async () => {
    const url = "/user";
    return await axiosClient.application.get(url);
  },
  searchUsers: async (displayName, page, limit = 6) => {
    const url = `/user/search?limit=${limit}&display_name=${displayName}&page=${page}`;
    return await axiosClient.application.get(url);
  },
};

export default accountInfoAPI;
