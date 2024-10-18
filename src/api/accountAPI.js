import axiosClient from "./axiosClient";

const accountInfoAPI = {
  getInfoByToken: async () => {
    const url = "/user";
    return await axiosClient.application.get(url);
  },
};

export default accountInfoAPI;
