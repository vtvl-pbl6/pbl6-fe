import axiosClient from "./axiosClient";

const accountInfoAPI = {
  getInfoByToken: () => {
    const url = "/user";
    return axiosClient.application.get(url);
  },
};

export default accountInfoAPI;
