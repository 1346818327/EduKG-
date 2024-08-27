import axiosInstance from './axios.js';

const useAxios = () => {
  const get = (url, params = {}) => {
    return axiosInstance.get(url, { params });
  };

  const post = (url, data = {}) => {
    return axiosInstance.post(url, data);
  };

  const put = (url, data = {}) => {
    return axiosInstance.put(url, data);
  };

  const deleteRequest = (url, data = {}) => {
    return axiosInstance.delete(url, { data });
  };

  return { get, post, put, deleteRequest };
};

export default useAxios;