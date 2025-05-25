import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../lib/config';

const INSCRIPTIONS_URL = `${API_BASE_URL}/inscriptions`;

// Tipos de datos
export interface Assistance {
  id: string;
  startTime: Date; // O usar Date si lo conviertes
  userId: string;
  instructorId: string;
  classId: string;
  sessionId: string; // Nota: sessionId con 's' minúscula para consistencia
  confirm: boolean;
}

// Hook original para obtener todas las inscripciones
export const useInscriptions = () => {
  const [data, setData] = useState<Assistance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchInscriptions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(INSCRIPTIONS_URL);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
      console.error('Error al obtener inscripciones:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInscriptions();
  }, [fetchInscriptions]);

  // Función para refrescar los datos manualmente
  const refetch = () => {
    fetchInscriptions();
  };

  return { data, isLoading, error, refetch };
};

// Nuevo hook para obtener inscripciones pendientes de un usuario
export const usePendingInscriptions = (userId: string) => {
  const [data, setData] = useState<Assistance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchPendingInscriptions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsEmpty(false);
    
    try {
      const url = new URL(`${INSCRIPTIONS_URL}/my-inscriptions`);
      url.searchParams.append('userId', userId);
      
      const response = await fetch(url.toString());
      
      if (response.status === 204) {
        setIsEmpty(true);
        setData([]);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al obtener asistencias'));
      console.error('Error al cargar inscripciones pendientes:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchPendingInscriptions();
    }
  }, [fetchPendingInscriptions, userId]);

  const refetch = () => {
    fetchPendingInscriptions();
  };

  return { data, isLoading, error, isEmpty, refetch };
};

// Hook para inscribir a un usuario (existente)

export const useEnrollUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const enrollUserMutation = async (userId: string, classId: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      const url = new URL(`${INSCRIPTIONS_URL}/inscribe`);
      url.searchParams.append('userId', userId);
      url.searchParams.append('classId', classId);
      
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        // Manejar específicamente errores 400
        if (response.status === 400) {
          const errorText = await response.text();
          throw new Error(errorText || 'Error al inscribir usuario');
        }
        throw new Error(`Error en el servidor: ${response.status}`);
      }
      
      const result = await response.text();
      setIsSuccess(true);
      return result; // Devuelve "Usuario inscrito exitosamente"
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido al inscribir usuario');
      setError(error);
      console.error('Error al inscribir usuario:', error);
      throw error; // Re-lanzamos el error para que pueda ser capturado en el componente
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    mutate: enrollUserMutation, 
    isLoading, 
    error, 
    isSuccess,
    reset: () => {
      setIsSuccess(false);
      setError(null);
    }
  };
};

// Hook para eliminar una inscripción (existente)
export const useDeleteInscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const deleteInscriptionMutation = async (userId: string, classId: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      const url = new URL(`${INSCRIPTIONS_URL}/delete`);
      url.searchParams.append('userId', userId);
      url.searchParams.append('classId', classId);
      
      const response = await fetch(url.toString(), {
        method: 'DELETE',
      });
      
      if (response.status === 404) {
        throw new Error('Inscripción no encontrada');
      }
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      setIsSuccess(true);
      return await response.text(); // Devuelve el mensaje de éxito del backend
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido al eliminar inscripción');
      setError(error);
      console.error('Error al eliminar inscripción:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    mutate: deleteInscriptionMutation, 
    isLoading, 
    error, 
    isSuccess,
    reset: () => {
      setIsSuccess(false);
      setError(null);
    }
  };
};

export const useHistoricalAssistances = (userId: string) => {
  const [data, setData] = useState<Assistance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchHistoricalAssistances = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsEmpty(false);
    
    try {
      const url = new URL(`${INSCRIPTIONS_URL}/my-Historical`);
      url.searchParams.append('userId', userId);
      
      const response = await fetch(url.toString());
      
      if (response.status === 204) {
        setIsEmpty(true);
        setData([]);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al obtener historial'));
      console.error('Error al cargar historial de asistencias:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchHistoricalAssistances();
    }
  }, [fetchHistoricalAssistances, userId]);

  const refetch = () => {
    fetchHistoricalAssistances();
  };

  return { 
    data, 
    isLoading, 
    error, 
    isEmpty, 
    refetch 
  };
};