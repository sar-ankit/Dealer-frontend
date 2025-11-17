import axios from 'axios';

// const BASE_URL = 'https://veldel.up.railway.app/api/payment';

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || 'https://veldel.up.railway.app/api';
const BASE_URL = `${BASE_API_URL}/payment`;

export const getPayments = () => axios.get(BASE_URL);
export const getPaymentById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createPayment = (data) => axios.post(`${BASE_URL}/create`, data);
export const updatePayment = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deletePayment = (id) => axios.delete(`${BASE_URL}/${id}`);