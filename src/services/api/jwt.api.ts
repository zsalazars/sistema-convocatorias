import axios from "axios"
import Cookies from 'js-cookie';

export const getTokenAuth = async (username: string, password: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const res = await axios.post(`${apiUrl}auth/login`, {
      username: username,
      password: password
    });

    const token = res.data.token;

    // Almacena el token en una cookie
    Cookies.set('token', token, { expires: 1 }); // Expira en 1 día
    
    return token;
    
  } catch (error) {
    return error;
  }
};
