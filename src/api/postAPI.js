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
  getListReposts: async (page = 1, author_id) => {
    const url = `${prefix_url}/repost?page=${page}&limit=6&author_id=${author_id}`;
    return await axiosClient.application.get(url);
  },
  getPostDetail: (id) => {
    const url = prefix_url + `/thread/${id}`;
    return axiosClient.application.get(url);
  },
  createPost: (newPost) => {
    const url = prefix_url + `/thread`;
    return axiosClient.formData.post(url, newPost);
  },
};

export default postAPI;
