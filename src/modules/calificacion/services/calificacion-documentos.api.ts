import { calificacionDocumentosForm } from "@/interfaces/CalificacionDocumentos";
import axios from "axios";
import Cookies from "js-cookie";

const calificacionApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const updateCalificacionDocumentos = async (id: number, calificacion: calificacionDocumentosForm) => {
  const token = Cookies.get('authToken');

  const res = await calificacionApi.put(`api/calificacion-documentos/${id}`, calificacion, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data;
}