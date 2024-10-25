import { DependenciaForm } from "@/interfaces/model/Dependencia";
import axios from "axios";
import Cookies from "js-cookie";

export const getAllDependencias = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken');

  const response = await axios.get(`${apiUrl}api/dependencias`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data;
};

export const createDependencia = async (dependencia: DependenciaForm) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken');

  axios.post(`${apiUrl}api/dependencias`, dependencia, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })
};

export const updateDependencia = async (id: number, dependencia: DependenciaForm) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken');

  axios.put(`${apiUrl}api/dependencias/${id}`, dependencia, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })
};
