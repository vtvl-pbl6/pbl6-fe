import axiosClient from "../axiosClient";

const NotificationAPI = {
  getNotifications: async (page) => {
    const url = `/admin/notification?page=${page}&limit=10`;
    return await axiosClient.application.get(url);
  },
  getCreatedNotifications: async (page) => {
    const url = `/admin/notification/created?page=${page}&limit=10`;
    return await axiosClient.application.get(url);
  },
};
export default NotificationAPI;
