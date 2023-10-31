import axios from "axios";
import { getToken, removeToken } from "@/utils/storages";
import { toast } from "react-toastify";

const mode = process.env.NODE_ENV;

let BASE_URL = "https://reqres.in/api";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

instance.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const defaultError = {
  code: 500,
  status: "error",
  message: "Failed to fetch data. Please contact developer.",
};

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    if (axios.isCancel(err)) {
      return Promise.reject("request canceled");
    }

    if (err.response && err.response.data) {
      if (err.response.status === 401) {
        removeToken();
        location.reload();
      }

      if (err.response.status === 404) {
        window.location.href = "/404";
      }

      if (err.response.data?.backto === "login") {
        toast.error(err.error);
        window.location.replace("/");
      }
      return Promise.reject(err.response.data);
    } else {
      return Promise.reject(defaultError);
    }
  }
);

export default instance;
