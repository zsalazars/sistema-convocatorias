import { calificacionRequisitosForm } from "@/interfaces/CalificacionRequisitos";
import axios from "axios";
import Cookies from "js-cookie";

const calificacionApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const updateCalificacionRequisitos = async (id: number, calificacion: calificacionRequisitosForm) => {
  const token = Cookies.get('authToken');

  const res = await calificacionApi.put(`api/calificacion-requisitos/${id}`, calificacion, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data;
}