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
    followUser: async (id) => {
        const url = `/user/${id}/follow`;
        return await axiosClient.application.post(url);
    },
    unfollowUser: async (id) => {
        const url = `/user/${id}/unfollow`;
        return await axiosClient.application.post(url);
    },
    updateInfo: async (data) => {
        const url = "/user";
        return await axiosClient.application.patch(url, data);
    },
    updateAvatar: async (formData) => {
        const url = "/user/avatar";
        return await axiosClient.application.patch(url, formData);
    },
};

export default accountInfoAPI;
