import axiosClient from "./axiosClient";

const RESOURCE = "SBA301";

const phamacyApi = {
  getAll() {
    return axiosClient.get(`/${RESOURCE}`);
  },

  getById(id) {
    return axiosClient.get(`/${RESOURCE}/${id}`);
  },

  create(data) {
    return axiosClient.post(`/${RESOURCE}`, data);
  },

  update(id, data) {
    return axiosClient.put(`/${RESOURCE}/${id}`, data);
  },

  remove(id) {
    return axiosClient.delete(`/${RESOURCE}/${id}`);
  },
};

export default phamacyApi;
