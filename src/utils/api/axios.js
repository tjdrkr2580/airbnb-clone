import axios from "axios";
import { getCookie } from "utils/cookie/cookie";
import { useNavigate } from "react-router-dom";

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
    });

    this.instance.interceptors.request.use((request) => {
      const token = getCookie("token");
      const navigate = useNavigate();
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      } else {
        alert("재 로그인이 필요합니다.");
        navigate("/");
      }
    });
  }

  get = async (url) => {
    const res = await this.instance.get(url);
    return res.data;
  };
  post = async (url, data) => {
    const res = await this.instance.post(url, data);
    return res.data;
  };
  put = async (url, data) => {
    const res = await this.instance.put(url, data);
    return res.data;
  };
  del = async (url) => {
    const res = await this.instance.delete(url);
    return res.data;
  };
}
