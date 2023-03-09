import Axios from "./axios";

const axios = new Axios();

export const postSignup = (data) => {
  const res = axios.post("api/users/signup", data);
  return res;
};

export const postSignin = (data) => {
  const res = axios.post("api/users/login", data);
  return res;
};

export const getHouses = (data) => {
  let res = "";
  if (data.id) {
    res = axios.get(`api/houses?userId=${data.id}`);
  } else {
    res = axios.get(`api/houses`);
  }
  return res;
};

// /api/houses?peopleCount=3&minPrice=0&maxPrice=100000&startDate=2023-03-04&endDate=2023-03-10&page=0&size=10&sortBy=id&isAsc=false

export const getWishList = (token) => {
  const res = axios.getToken("api/houses/wish", {
    headers: { Authorization: token },
  });
  return res;
};

export const getDetailPatch = (id) => {
  let res = "";
  if (id.userId) {
    res = axios.get(`api/houses/${id.houseId}?userId=${id.userId}`);
  } else {
    res = axios.get(`api/houses/${id.id}`);
  }
  return res;
};

export const postDetailRequest = (data, token) => {
  const res = axios.post(`api/reservation`, data, {
    headers: { Authorization: token },
  });
  return res;
};

export const postHouses = (data, token) => {
  const res = axios.post(`api/houses`, data, {
    headers: { Authorization: token, "Content-Type": "multipart/form-data" },
  });
  return res;
};

export const getRegistration = (token) => {
  const res = axios.getToken(`api/houses/registration`, {
    headers: { Authorization: token },
  });
  return res;
};

export const getTags = () => {
  const res = axios.get("api/tags");
  return res;
};

export const getReservation = (token) => {
  const res = axios.get("api/reservation", {
    headers: { Authorization: token },
  });
  return res;
};

export const postWish = (id, token) => {
  const res = axios.post(
    `api/houses/wish/${id}`,
    {},
    {
      headers: { Authorization: token },
    }
  );
  return res;
};

// 검색시 api
export const getSearchHouses = (data) => {
  let res = "";
  if (data.id) {
    res = axios.get(
      `api/houses?adminDistrict=${data.filter.adminDistrict}&peopleCount=${data.filter.peopleCount}&minPrice=${data.filter.minPrice}&maxPrice=${data.filter.maxPrice}&startDate=${data.filter.startDate}&endDate=${data.filter.endDate}&page=0&size=10&sortBy=id&isAsc=false&userId=${data.id}`
    );
  } else {
    res = axios.get(
      `api/houses?adminDistrict=${data.filter.adminDistrict}&peopleCount=${data.filter.peopleCount}&minPrice=${data.filter.minPrice}&maxPrice=${data.filter.maxPrice}&startDate=${data.filter.startDate}&endDate=${data.filter.endDate}&page=0&size=10&sortBy=id&isAsc=false`
    );
  }
  return res;
};

export const postHouseDelete = (id, token) => {
  const res = axios.del(`api/houses/${id}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const getInfinityHouse = (page, id) => {
  let res;
  if (id) {
    res = axios.get(`api/houses?page=${page}&userId=${id}`);
  } else {
    res = axios.get(`api/houses?page=${page}`);
  }
  return res;
};

export const getInfinityHouseFilterSearch = (page, data, id) => {
  let res;
  if (id) {
    res = axios.get(
      `api/houses?adminDistrict=${data.adminDistrict}&peopleCount=${data.peopleCount}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}&startDate=${data.startDate}&endDate=${data.endDate}&page=${page}&userId=${id}`
    );
  } else {
    res = axios.get(
      `api/houses?adminDistrict=${data.adminDistrict}&peopleCount=${data.peopleCount}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}&startDate=${data.startDate}&endDate=${data.endDate}&page=${page}`
    );
  }
  return res;
};

// adminDistrict=${data.filter.adminDistrict}&peopleCount=${data.filter.peopleCount}&minPrice=${data.filter.minPrice}&maxPrice=${data.filter.maxPrice}&startDate=${data.filter.startDate}&endDate=${data.filter.endDate}&page=0&size=10&sortBy=id&isAsc=false&userId=${data.id}`

// export const getSearchHouses = (data) => {
//   let res = "";
//   if (data.id) {
//     res = axios.get(
//       `api/houses?adminDistrict=${data.filter.adminDistrict}&peopleCount=${data.filter.peopleCount}&minPrice=${data.filter.minPrice}&maxPrice=${data.filter.maxPrice}&startDate=${data.filter.startDate}&endDate=${data.filter.endDate}&page=0&size=10&sortBy=id&isAsc=false&userId=${data.id}`
//     );
//   } else {
//     res = axios.get(
//       `api/houses?adminDistrict=${data.filter.adminDistrict}&peopleCount=${data.filter.peopleCount}&minPrice=${data.filter.minPrice}&maxPrice=${data.filter.maxPrice}&startDate=${data.filter.startDate}&endDate=${data.filter.endDate}&page=0&size=10&sortBy=id&isAsc=false`
//     );
//   }
//   return res;
// };
