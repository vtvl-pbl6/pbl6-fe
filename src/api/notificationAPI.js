import axiosClient from "./axiosClient";

const NotificationAPI = {
    getNotifications: async (page) => {
        const url = `/notification?page=${page}&limit=10`;
        return await axiosClient.application.get(url);
    }
};
export default NotificationAPI;