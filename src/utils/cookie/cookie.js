const { Cookies } = require("react-cookie");

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  const date = new Date();
  date.setTime(date.getHours() + 1);
  return cookies.set(name, value, {
    ...option,
    expires: date,
  });
};

export const removeCookie = (name, { ...option }) => {
  return cookies.remove(name, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};
