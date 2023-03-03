import { atom } from "recoil";
import { v4 } from "uuid";

export const isLoginModal = atom({
  key: `state${v4()}`,
  default: true,
});

// export const isLogin = atom({
//     key : `state${v4()}`,
//     default : false,
// })
