import axios from "axios";
import Cookies from "js-cookie";

const cargoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const getAllAplicantes = async () => {
  const token = Cookies.get('authToken');

  const res = await cargoApi.get("api/aplicantes", {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data;
};

export const getAplicanteById = async (id: number) => {
  const token = Cookies.get('authToken');

  const res = await cargoApi.get(`api/aplicantes/${id}`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data;
}