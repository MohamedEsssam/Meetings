import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] =
  "http://localhost:8000";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET, POST, PATCH, PUT, DELETE, OPTIONS";
axios.defaults.headers.common["Access-Control-Expose-Headers"] =
  "Authorization";
axios.defaults.headers.common["Access-Control-Allow-Headers"] =
  "Origin, Content-Type, Authorization";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log(error);
    console.log("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token;

  return config;
});

export default {
  post: axios.post,
  put: axios.put,
  get: axios.get,
  delete: axios.delete,
};
