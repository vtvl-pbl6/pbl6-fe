import axiosClient from "./axiosClient";

const accountInfoAPI = {
  getInfoByToken: () => {
    const url = "/account/detail";
    return axiosClient.application.get(url);
  },
};

export default accountInfoAPI;
