import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://69706edf78fec16a63fdaaea.mockapi.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default axiosClient;