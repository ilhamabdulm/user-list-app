import instance from "@/utils/axios";

export const getUsers = async (query) =>
  await instance.get("/users", { params: query });

export const getUserDetail = async (id) => await instance.get(`/users/${id}`);
