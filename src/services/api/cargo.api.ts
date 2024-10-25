import { CargoForm } from "@/interfaces/model/Cargo";
import axios from "axios";
import Cookies from "js-cookie";

export const getAllCargos = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken');

  const response = await axios.get(`${apiUrl}api/cargos`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data;
};

export const createCargo = async (cargo: CargoForm) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken');

  axios.post(`${apiUrl}api/cargos`, cargo, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })
};
