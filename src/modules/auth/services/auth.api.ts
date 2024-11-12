import axios from "axios"

export const getTokenAuth = async (username: string, password: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const res = await axios.post(`${apiUrl}auth/login`, {
      username: username,
      password: password
    });

    const token = res.data.token;
    
    return token;
    
  } catch (error) {
    return error;
  }
};
