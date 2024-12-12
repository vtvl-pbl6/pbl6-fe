import axiosClient from "../axiosClient";
const prefix_url = process.env.REACT_APP_API_URL;
const RequestAPI = {
  getRequests: async () => {
    const url = prefix_url + `/admin/thread`;
    return await axiosClient.application.get(url);
  },
  getRequestById: async (id) => {
    const url = prefix_url + `/admin/thread/${id}`;
    console.log("API URL:", url);
    return await axiosClient.application.get(url);
  },
  acceptModeration: async (id) => {
    const url = prefix_url + `/admin/thread/${id}/moderation/accept`;
    return await axiosClient.application.post(url);
  },
  declineModeration: async (id) => {
    const url = prefix_url + `/admin/thread/${id}/moderation/decline`;
    return await axiosClient.application.post(url);
  },
  lockThread: async (id) => {
    const url = prefix_url + `/admin/thread/${id}/lock`;
    return await axiosClient.application.patch(url);
  },
  unlockThread: async (id) => {
    const url = prefix_url + `/admin/thread/${id}/unlock`;
    return await axiosClient.application.patch(url);
  },
};
export default RequestAPI;
