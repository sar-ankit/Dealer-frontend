import axios from 'axios';
const BASE_URL = 'https://veldel.up.railway.app/api/vehicle';




export const getVehicles = () => axios.get(BASE_URL);
export const getVehicleById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createVehicle = (data) => axios.post(`${BASE_URL}/create`, data);
export const updateVehicle = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteVehicle = (id) => axios.delete(`${BASE_URL}/${id}`);
export const getPremiumVehicles = () => axios.get(`${BASE_URL}/premiumDealers`);