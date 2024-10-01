import axiosClient from "./axiosClient";

const checkTokenAPI = {
    checkToken: (token) => {
        const url = "auth/checkToken";
        return axiosClient.applicationNoAuth.post(url, { token: token });
    },
};

export default checkTokenAPI;
