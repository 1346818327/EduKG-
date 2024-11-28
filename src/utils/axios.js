import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://8.137.104.90:8099', 
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

export default instance;