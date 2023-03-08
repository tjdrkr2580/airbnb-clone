import Axios from './axios';

const axios = new Axios();

export const postSignup = (data) => {
    const res = axios.post('/api/users/signup', data);
    return res;
};

export const postSignin = (data) => {
    const res = axios.post('/api/users/login', data);
    return res;
};

export const getHouses = (filter) => {
    const res = axios.get('/api/houses');
    return res;
};

// /api/houses?peopleCount=3&minPrice=0&maxPrice=100000&startDate=2023-03-04&endDate=2023-03-10&page=0&size=10&sortBy=id&isAsc=false

export const getWishList = (token) => {
    const res = axios.getToken('api/houses/wish', {
        headers: { Authorization: token },
    });
    return res;
};

export const getDetailPatch = (id) => {
    const res = axios.get(`/api/houses/${id}`);
    return res;
};

export const postDetailRequest = (data, token) => {
    const res = axios.post(`/api/reservation`, data, {
        headers: { Authorization: token },
    });
    return res;
};

export const postHouses = (data, token) => {
    console.log('api : ', data);
    console.log('api token : ', token);
    const res = axios.post(`api/houses`, data, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
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
    const res = axios.get('api/tags');
    return res;
};
