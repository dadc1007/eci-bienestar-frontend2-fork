import axios from 'axios';
import { API_BASE_URL } from '../lib/config';

interface Resource {
  nombre: string;
  cantidad: number;
}

export interface Class {
  id: string;
  name: string;
  type: string | null;
  repetition: string | null;
  resources: Resource[] | null;
  instructorId: string | null;
  startTime: string;
  maxStudents: number;
  endTime: string;
  endTimeRepetition: string | null;
}

const CLASSES_URL = `${API_BASE_URL}/classes`;

// Obtener todas las clases
export const getAllClasses = async (): Promise<Class[]> => {
  const response = await axios.get(CLASSES_URL);
  return response.data;
};

// Obtener clase por ID
export const getClassById = async (classId: string): Promise<Class> => {
  const response = await axios.get(`${CLASSES_URL}/class`, {
    params: { classId }
  });
  return response.data;
};

// Obtener clases por tipo
export const getClassesByType = async (classType: string): Promise<Class[]> => {
  const response = await axios.get(`${CLASSES_URL}/type`, {
    params: { classType }
  });
  return response.data;
};

// Crear una nueva clase
export const createClass = async (classData: Class): Promise<Class> => {
  const response = await axios.post(CLASSES_URL, classData);
  return response.data;
};

// Actualizar una clase existente
export const updateClass = async (classData: Class): Promise<Class> => {
  const response = await axios.put(`${CLASSES_URL}/update`, classData, {
    params: { id: classData.id }
  });
  return response.data;
};

// Eliminar una clase
export const deleteClass = async (id: string): Promise<void> => {
  await axios.delete(`${CLASSES_URL}/delete`, {
    params: { id }
  });
};