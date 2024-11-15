import { PostulacionForm } from "@/interfaces/Postulacion";
import axios from "axios";
import Cookies from "js-cookie";

const cargoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const getAllPostulacion = async () => {
  const token = Cookies.get('authToken');

  const res = await cargoApi.get("api/postulaciones", {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data;
};

export const getPostulacionById = async (id: number) => {
  const token = Cookies.get('authToken');

  const res = await cargoApi.get(`api/postulaciones/${id}`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data;
}

export const updatePostulacion = async (id: number, postulacion: PostulacionForm) => {
  const token = Cookies.get('authToken');

  const res = await cargoApi.put(`api/postulaciones/${id}`, postulacion, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data;
}