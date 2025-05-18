import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../lib/config';

const INSCRIPTIONS_URL = `${API_BASE_URL}/inscriptions`;

// Tipos de datos
interface Inscription {
  userId: string;
  classId: string;
  // Añade otros campos según sea necesario
}

// Hook para obtener inscripciones
export const useInscriptions = () => {
  const [data, setData] = useState<Inscription[]>([]);
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

// Hook para inscribir a un usuario
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
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      setIsSuccess(true);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
      console.error('Error al inscribir usuario:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    mutate: enrollUserMutation, 
    isLoading, 
    error, 
    isSuccess 
  };
};

// Hook para eliminar una inscripción
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
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      setIsSuccess(true);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
      console.error('Error al eliminar inscripción:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    mutate: deleteInscriptionMutation, 
    isLoading, 
    error, 
    isSuccess 
  };
};