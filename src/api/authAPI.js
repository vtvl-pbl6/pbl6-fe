import axiosClient from "./axiosClient";

const authAPI = {
    login: async (credentials) => {
        const url = "/auth/login";
        return await axiosClient.applicationNoAuth.post(url, credentials);
    },
};

export default authAPI;
