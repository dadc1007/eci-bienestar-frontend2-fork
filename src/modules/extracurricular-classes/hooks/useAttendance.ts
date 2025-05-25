import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../lib/config';

const ASSISTANCE_URL = `${API_BASE_URL}/assistance`;

export interface Assistance {
  id: string;
  startTime: string; // Cambiado a string para facilitar el manejo
  endTime: string;
  userId: string;
  instructorId: string;
  classId: string;
  sessionId: string;
  confirm: boolean;
  // Considera añadir más campos si la API los devuelve
}

export const useHistoricalAssistances = (userId: string) => {
  const [data, setData] = useState<Assistance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchHistoricalAssistances = useCallback(async () => {
    if (!userId) {
      setIsEmpty(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const url = new URL(`${ASSISTANCE_URL}/my-Historical`);
      url.searchParams.append('userId', userId);
      
      const response = await fetch(url.toString());
      
      if (response.status === 204) {
        setIsEmpty(true);
        setData([]);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Validación básica de la respuesta
      if (!Array.isArray(result)) {
        throw new Error('Formato de respuesta inválido');
      }
      
      setData(result);
      setIsEmpty(result.length === 0);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setError(error);
      console.error('Error fetching historical assistances:', error);
      setIsEmpty(true);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchHistoricalAssistances();
  }, [fetchHistoricalAssistances]);

  return { 
    data, 
    isLoading, 
    error, 
    isEmpty, 
    refetch: fetchHistoricalAssistances // Eliminé la función redundante
  };
};