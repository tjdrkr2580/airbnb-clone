import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { v4 } from 'uuid';

const { persistAtom } = recoilPersist();

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

export const isFilterState = atom({
    key: `state${v4()}`,
    default: false,
});

export const globalUserInfoState = atom({
    key: `state${v4()}`,
    default: null,
});

export const userNamePersistState = atom({
    key: `username`,
    default: '',
    effects_UNSTABLE: [persistAtom],
});

// 검색했는지 여부
export const isSearchState = atom({
    key: `state${v4()}`,
    default: false,
});
// 검색 필터값
export const searchValueState = atom({
    key: `state${v4()}`,
    default: null,
});

export const changeState = atom({
    key: `state${v4()}`,
    default: false,
});

// tag 모두보기
export const isTotalTagsModal = atom({
    key: `state${v4()}`,
    default: false,
});

// tog modal true일때 가져갈 houseId
export const totalTagsHouseId = atom({
    key: `state${v4()}`,
    default: null,
});
