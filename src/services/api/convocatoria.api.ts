import { ConvocatoriaForm } from "@/interfaces/model/Convocatoria";
import axios from "axios";
import Cookies from "js-cookie";

const convocatoriaApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
}) 

export const getAllConvocatorias = async () => {
  const token = Cookies.get("authToken");

  const res = await convocatoriaApi.get("api/convocatorias", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  return res.data;
}

export const getAplicantesByConvocatoriaId = async (id: number) => {
  const token = Cookies.get("authToken");

  const res = await convocatoriaApi.get(`api/convocatorias/${id}/aplicantes`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  return res.data;
}

export const createConvocatoria = async (convocatoria: ConvocatoriaForm) => {
  const token = Cookies.get("authToken");

  await convocatoriaApi.post("api/convocatorias", convocatoria, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}