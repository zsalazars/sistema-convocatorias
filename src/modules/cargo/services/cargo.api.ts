import { CargoForm } from "@/interfaces/Cargo";
import axios from "axios";
import Cookies from "js-cookie";

const cargoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const getAllCargos = async () => {
  const token = Cookies.get('authToken');

  const res = await cargoApi.get("api/cargos", {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data;
};

export const createCargo = async (cargo: CargoForm) => {
  const token = Cookies.get('authToken');

  cargoApi.post("api/cargos", cargo, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })
};
