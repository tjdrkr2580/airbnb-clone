import { atom } from 'recoil';
import { v4 } from 'uuid';

export const isLoginModalState = atom({
    key: `state${v4()}`,
    default: false,
});

export const isUserState = atom({
    key: `state${v4()}`,
    default: false,
});

// export const isLogin = atom({
//     key : `state${v4()}`,
//     default : false,
// })

export const isHotelAddState = atom({
    key: `state${v4()}`,
    default: false,
});
