import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://8.137.104.90:5000', 
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

export default instance;