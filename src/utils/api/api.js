import Axios from "./axios";

const axios = new Axios();

export const postSignup = (data) => {
  const res = axios.post("/api/users/signup", data);
  return res;
};

export const postSignin = (data) => {
  const res = axios.post("/api/users/login", data);
  return res;
};
