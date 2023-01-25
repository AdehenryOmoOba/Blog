import axios from 'axios'

const axiosBase = axios.create({
    baseURL: "http://localhost:5000/blog-api",
    withCredentials: true
})

export default axiosBase