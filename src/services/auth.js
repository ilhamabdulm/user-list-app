import instance from "@/utils/axios";
import { removeToken } from "@/utils/storages";

export const postLoginUser = async (payload) =>
  await instance.post("/login", payload);

export const logoutUser = () => {
  removeToken();
  window.location.replace("/");
};
