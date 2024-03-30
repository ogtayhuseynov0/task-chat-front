import axios from 'axios';

const axsiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export default axsiosInstance;
