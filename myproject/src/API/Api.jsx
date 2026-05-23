import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://api.foryoulearn.com',
   baseURL: 'http://api.foryou.local',
  withCredentials: true, 
});
axiosInstance.interceptors.request.use(config => {
  const token = decodeURIComponent(
    document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1] || ''
  ); 
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});
export default axiosInstance;