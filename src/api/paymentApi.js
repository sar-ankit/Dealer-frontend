import axios from 'axios';


const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
const BASE_URL = `${BASE_API_URL}/payment`;

export const getPayments = () => axios.get(BASE_URL);
export const createPayment = (data) => axios.post(`${BASE_URL}/create`, data);