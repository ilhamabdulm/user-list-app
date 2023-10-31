export const TOKEN_KEY = "vhiweb_users_app_fe_test";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (value) => {
  return localStorage.setItem(TOKEN_KEY, value);
};

export const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};
