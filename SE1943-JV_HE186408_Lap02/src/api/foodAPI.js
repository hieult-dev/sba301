import axiosClient from "./axiosClient";

const RESOURCE = "/api/foods";

const FoodAPI = {
    getAll() {
        return axiosClient.get(RESOURCE);
    },

    getById(id) {
        return axiosClient.get(`${RESOURCE}/${id}`);
    },

    create(data) {
        return axiosClient.post(RESOURCE, data);
    },

    update(id, data) {
        return axiosClient.put(`${RESOURCE}/${id}`, data);
    },

    remove(id) {
        return axiosClient.delete(`${RESOURCE}/${id}`);
    },

    // optional theo BE
    searchByName(name) {
        return axiosClient.get(`${RESOURCE}/search`, { params: { name } });
    },

    searchByCategory(categoryId) {
        return axiosClient.get(`${RESOURCE}/category/${categoryId}`);
    },

    searchByNameAndCategory(name, categoryId) {
        return axiosClient.get(`${RESOURCE}/search/category`, {
            params: { name, categoryId },
        });
    },
};

export default FoodAPI;
