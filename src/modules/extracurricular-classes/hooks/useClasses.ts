import { useState, useEffect } from 'react';
import {
  Class,
  getAllClasses,
  getClassById,
  getClassesByType,
  createClass,
  updateClass,
  deleteClass,
} from '../services/classesService';

// Hook para obtener todas las clases
export const useAllClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const data = await getAllClasses();
      setClasses(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las clases');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return { classes, loading, error, refresh: fetchClasses };
};

// Hook para obtener una clase por ID
export const useClassById = (classId: string) => {
  const [classData, setClassData] = useState<Class | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClass = async () => {
    try {
      setLoading(true);
      const data = await getClassById(classId);
      setClassData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar la clase');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classId) fetchClass();
  }, [classId]);

  return { classData, loading, error, refresh: fetchClass };
};

// Hook para obtener clases por tipo
export const useClassesByType = (classType: string) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClassesByType = async () => {
    try {
      setLoading(true);
      const data = await getClassesByType(classType);
      setClasses(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar clases por tipo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classType) fetchClassesByType();
  }, [classType]);

  return { classes, loading, error, refresh: fetchClassesByType };
};

// Hook para crear una nueva clase
export const useCreateClass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createNewClass = async (classData: Omit<Class, 'id'>): Promise<Class | null> => {
    try {
      setLoading(true);
      const created = await createClass(classData);
      setError(null);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la clase');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createNewClass, loading, error };
};

// Hook para actualizar una clase
export const useUpdateClass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateExistingClass = async (classData: Class): Promise<Class | null> => {
    try {
      setLoading(true);
      const updated = await updateClass(classData);
      setError(null);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la clase');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateExistingClass, loading, error };
};

// Hook para eliminar una clase
export const useDeleteClass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteExistingClass = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await deleteClass(id);
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la clase');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteExistingClass, loading, error };
};