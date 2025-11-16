import axios from 'axios';
const BASE_URL = 'https://veldel.up.railway.app/api/payment';

export const getPayments = () => axios.get(BASE_URL);
export const createPayment = (data) => axios.post(`${BASE_URL}/create`, data);