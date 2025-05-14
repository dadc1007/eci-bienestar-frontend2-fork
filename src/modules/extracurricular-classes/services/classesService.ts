import { API_BASE_URL } from '../lib/config';

export interface Resource {
  nombre: string;
  cantidad: number;
}

export interface Class {
  id: string;
  name: string;
  type: string;
  repetition: string;
  resources: Resource[];
  instructorId: string;
  startTime: string;
  maxStudents: number;
  endTime: string;
  endTimeRepetition: string | null;
}

// Obtener todas las clases disponibles
export const getAllClasses = async (): Promise<Class[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`);
    if (!response.ok) {
      throw new Error('Error al obtener clases');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getAllClasses:', error);
    throw error;
  }
};

// Obtener clase por ID
export const getClassById = async (classId: string): Promise<Class> => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes/class?classId=${classId}`);
    if (!response.ok) {
      throw new Error('Error al obtener la clase');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getClassById:', error);
    throw error;
  }
};

// Obtener clases por tipo
export const getClassesByType = async (classType: string): Promise<Class[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes/type?classType=${classType}`);
    if (!response.ok) {
      throw new Error('Error al obtener clases por tipo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getClassesByType:', error);
    throw error;
  }
};

// Crear una nueva clase
export const createClass = async (classData: Omit<Class, 'id'>): Promise<Class> => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al crear la clase');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en createClass:', error);
    throw error;
  }
};

// Actualizar una clase existente
export const updateClass = async (classData: Class): Promise<Class> => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes/update?id=${classData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al actualizar la clase');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en updateClass:', error);
    throw error;
  }
};

// Eliminar una clase
export const deleteClass = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes/delete?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al eliminar la clase');
    }
  } catch (error) {
    console.error('Error en deleteClass:', error);
    throw error;
  }
};