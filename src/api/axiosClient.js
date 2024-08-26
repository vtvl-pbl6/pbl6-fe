import axios from 'axios'
import env from 'react-dotenv'
import queryString from 'query-string'

const axiosClient = {
    application : axios.create({
        baseURL: env.API_URL,
        
        headers: {
            'Content-Type': 'application/json',
            [env.API_HEADER_NAME]: env.API_HEADER_VALUE
        },
        paramsSerializer: (params) => queryString.stringify(params),
    }),

    applicationNoAuth : axios.create({
        baseURL: env.API_URL,
        headers: {
            'Content-Type': 'application/json',
            [env.API_HEADER_NAME]: env.API_HEADER_VALUE
        },
        paramsSerializer: (params) => queryString.stringify(params),
    }),

    formData : axios.create({
        baseURL: process.env.API_URL,
        
        headers: {
            'Content-Type': 'multipart/form-data',
            [env.API_HEADER_NAME]: env.API_HEADER_VALUE
        },
    })
}


export default axiosClient;