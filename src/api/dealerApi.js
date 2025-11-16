import axios from 'axios';
const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
const BASE_URL = `${BASE_API_URL}/dealer`;




export const getDealers = () => axios.get(BASE_URL);
export const getDealerById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createDealer = (data) => axios.post(BASE_URL, data);
export const updateDealer = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteDealer = (id) => axios.delete(`${BASE_URL}/${id}`);