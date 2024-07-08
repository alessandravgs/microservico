import axios from 'axios';

export const registerService = async () => {
  try {

    const register = await axios.post(`${process.env.SERVICE_REGISTRY_URL}/register`, {
      name: process.env.APP_NAME,
      url: `http://localhost:${process.env.PORT}`
    });

    console.log(register.data.message);

  } catch (error) {
    console.error('Erro no registro do serviço:', error.message);
  }
};
