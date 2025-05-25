import { API_BASE_URL } from '../lib/config';

const INSCRIPTIONS_URL = `${API_BASE_URL}/inscriptions`;

interface Assistance {
  startTime: string;
  userId: string;
  instructorId: string;
  classId: string;
  SessionId: string;
  confirm: boolean;
}

export const enrollUser = async (params: {
  userId: string;
  classId: string;
  startDate: string;
}) => {
  // Validación de parámetros requeridos
  if (!params.userId || !params.classId || !params.startDate) {
    throw new Error('Faltan parámetros requeridos para la inscripción');
  }

  // Crear URL con query parameters
  const url = new URL(`${INSCRIPTIONS_URL}/inscribe`);
  url.searchParams.append('userId', params.userId);
  url.searchParams.append('classId', params.classId);
  
  // Formatear fecha correctamente (yyyy-MM-ddTHH:mm:ss)
  const isoDate = new Date(params.startDate);
  if (isNaN(isoDate.getTime())) {
    throw new Error('Fecha de inicio inválida');
  }
  const formattedDate = isoDate.toISOString().split('.')[0]; // Remover milisegundos
  url.searchParams.append('startDate', formattedDate);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    }
  });

  if (!response.ok) {
    let errorMessage = 'Error en la inscripción';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      const text = await response.text();
      if (text) errorMessage = text;
    }
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch {
    return await response.text(); // Por si el backend devuelve texto plano
  }
};

// Eliminar una inscripción (esta parte está correcta)
export const deleteInscription = async (userId: string, classId: string) => {
  const url = new URL(`${INSCRIPTIONS_URL}/delete`);
  url.searchParams.append('userId', userId);
  url.searchParams.append('classId', classId);
  
  const response = await fetch(url.toString(), {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  
  return response.json();
};