import axios from "axios";
import queryString from "query-string";

const axiosClient = {
  application: axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      [process.env.REACT_APP_API_HEADER_NAME]:
        process.env.REACT_APP_API_HEADER_VALUE,
    },
    paramsSerializer: (params) => queryString.stringify(params),
  }),

  applicationNoAuth: axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      [process.env.REACT_APP_API_HEADER_NAME]:
        process.env.REACT_APP_API_HEADER_VALUE,
    },
    paramsSerializer: (params) => queryString.stringify(params),
  }),

  formData: axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "multipart/form-data",
      [process.env.REACT_APP_API_HEADER_NAME]:
        process.env.REACT_APP_API_HEADER_VALUE,
    },
  }),
};

export default axiosClient;
