import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API}/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/csv",
  },
});

// axiosInstance.interceptors.request.use(async (config) => {
//   // const username = "22318";
//   // const password = "L3XzEO7mgC80Hg615wqnaJUHoxBsmxB3";

//   // const base64Credentials = btoa(`${username}:${password}`);

//   // config.headers.Authorization = `Basic ${base64Credentials}`;

//   return config;
// });

export default axiosInstance;
