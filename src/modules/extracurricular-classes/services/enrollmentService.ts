import axios from 'axios';
import { API_BASE_URL } from '../lib/config';

const INSCRIPTIONS_URL = `${API_BASE_URL}/inscriptions`;

export const enrollUser = async (userId: string, classId: string) => {
  const response = await axios.post(`${INSCRIPTIONS_URL}/inscribe`, null, {
    params: { userId, classId },
  });
  return response.data;
};

export const getInscriptions = async () => {
  const response = await axios.get(INSCRIPTIONS_URL);
  return response.data;
};

export const deleteInscription = async (userId: string, classId: string) => {
  const response = await axios.delete(`${INSCRIPTIONS_URL}/delete`, {
    params: { userId, classId },
  });
  return response.data;
};
