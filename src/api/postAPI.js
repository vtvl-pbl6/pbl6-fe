import axiosClient from "./axiosClient";
const prefix_url = process.env.REACT_APP_API_URL;
const postAPI = {
  getPosts: async (page = 1, limit = 6) => {
    const url = `${prefix_url}/thread?page=${page}&limit=${limit}`;
    return await axiosClient.application.get(url);
  },
  getPostsByAuthor: async (page = 1, author_id) => {
    const url = `${prefix_url}/thread?page=${page}&limit=6&author_id=${author_id}`;
    return await axiosClient.application.get(url);
  },
  getRepostByCurrentUser: async (page = 1, author_id) => {
    const url = `${prefix_url}/repost?page=${page}&limit=6&author_id=${author_id}`;
    return await axiosClient.application.get(url);
  },
  getRepostByUserId: async (userId, page) => {
    const url = `${prefix_url}/repost/user/${userId}?page=${page}&limit=10`;
    return await axiosClient.get(url);
  },
  getPostDetail: (id) => {
    const url = prefix_url + `/thread/${id}`;
    return axiosClient.application.get(url);
  },
  createPost: (newPost) => {
    const url = prefix_url + `/thread`;
    return axiosClient.formData.post(url, newPost);
  },
  likePost: async (postId) => {
    const url = `${prefix_url}/thread/${postId}/like`;
    return await axiosClient.application.patch(url);
  },
  unlikePost: async (postId) => {
    const url = `${prefix_url}/thread/${postId}/unlike`;
    return await axiosClient.application.patch(url);
  },
  sharePost: async (postId) => {
    const url = `${prefix_url}/thread/${postId}/share`;
    return await axiosClient.application.post(url);
  },
  unsharePost: async (postId) => {
    const url = `${prefix_url}/thread/${postId}/unshare`;
    return await axiosClient.application.post(url);
  },
};

export default postAPI;
