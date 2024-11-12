import { SolicitudForm } from "@/interfaces/Solicitud";
import axios from "axios";
import Cookies from "js-cookie";

const solicitudApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const getAllSolicitudes = async () => {
  const token = Cookies.get('authToken');

  const res = await solicitudApi.get("api/solicitudes", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  
  return res.data;
};

export const createSolicitud = async (solicitud: SolicitudForm) => {
  const token = Cookies.get('authToken');

  console.log(solicitud)
  solicitudApi.post("api/solicitudes", solicitud, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
};
