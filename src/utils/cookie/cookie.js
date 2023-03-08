const { Cookies } = require("react-cookie");

const cookies = new Cookies();

export const setCookie = (name, value) => {
  return cookies.set(name, value);
};

export const removeCookie = (name) => {
  return cookies.remove(name);
};

export const getCookie = (name) => {
  return cookies.get(name);
};
