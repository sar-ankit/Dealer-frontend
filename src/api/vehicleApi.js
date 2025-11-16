import axios from 'axios';
// const BASE_URL = 'https://veldel.up.railway.app/api/vehicle';

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
const BASE_URL = `${BASE_API_URL}/vehicles`;


export const getVehicles = () => axios.get(BASE_URL);
export const getVehicleById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createVehicle = (data) => axios.post(`${BASE_URL}/create`, data);
export const updateVehicle = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteVehicle = (id) => axios.delete(`${BASE_URL}/${id}`);
export const getPremiumVehicles = () => axios.get(`${BASE_URL}/premiumDealers`);