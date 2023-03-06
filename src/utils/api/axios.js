import axios from "axios";

export default class Axios {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000",
    });

    // this.instance.interceptors.request.use((request) => {
    //   const token = getCookie("token");
    //   if (token) {
    //     request.headers.Authorization = `Bearer ${token}`;
    //   }
    // });
  }

  get = async (url) => {
    const res = await this.instance.get(url);
    return res;
  };
  post = async (url, data) => {
    const res = await this.instance.post(url, data);
    return res;
  };
  put = async (url, data) => {
    const res = await this.instance.put(url, data);
    return res;
  };
  del = async (url) => {
    const res = await this.instance.delete(url);
    return res;
  };
}
