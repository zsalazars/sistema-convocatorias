import axios from "axios";

const convocatoriaApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
}) 

export const getAllConvocatorias = async () => {

  const res = await convocatoriaApi.get("api/convocatorias", {
    headers: {
      "Content-Type": "application/json"
    }
  })

  return res.data;
}

export const getConvocatoriaById = async (id: number) => {
  
  const res = await convocatoriaApi.get(`api/convocatorias/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })

  return res.data;
}