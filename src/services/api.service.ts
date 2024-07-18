import axios from "axios";

const BASE_URL = "http://51.222.84.169:8888/api/v1/";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
