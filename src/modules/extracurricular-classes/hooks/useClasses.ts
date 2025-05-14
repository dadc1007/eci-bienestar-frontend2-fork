import { useState, useEffect } from 'react';
import { Class, Assistance, getEnrolledClasses, getAllClasses, getAttendanceHistory, enrollUserToClass, cancelEnrollment } from '../services/classesService';

export const useEnrolledClasses = (userId: string) => {
  const [enrolledClasses, setEnrolledClasses] = useState<Assistance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrolledClasses = async () => {
    try {
      setLoading(true);
      const data = await getEnrolledClasses();
      // Filtramos solo las clases del usuario actual
      const userClasses = data.filter(assistance => assistance.userId === userId);
      setEnrolledClasses(userClasses);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar clases inscritas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledClasses();
  }, [userId]);

  const cancelClassEnrollment = async (classId: string) => {
    try {
      await cancelEnrollment(userId, classId);
      // Actualizar la lista de clases inscritas
      await fetchEnrolledClasses();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cancelar inscripción');
      return false;
    }
  };

  return { enrolledClasses, loading, error, cancelClassEnrollment, refreshClasses: fetchEnrolledClasses };
};

export const useAvailableClasses = (userId: string) => {
  const [availableClasses, setAvailableClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailableClasses = async () => {
    try {
      setLoading(true);
      const data = await getAllClasses();
      setAvailableClasses(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar clases disponibles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableClasses();
  }, [userId]);

  const enrollToClass = async (classId: string) => {
    try {
      await enrollUserToClass(userId, classId);
      // Actualizar la lista de clases disponibles
      await fetchAvailableClasses();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al inscribirse a la clase');
      return false;
    }
  };

  return { availableClasses, loading, error, enrollToClass, refreshClasses: fetchAvailableClasses };
};

export const useAttendanceHistory = (userId: string) => {
  const [attendanceHistory, setAttendanceHistory] = useState<Assistance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendanceHistory = async () => {
    try {
      setLoading(true);
      const data = await getAttendanceHistory();
      // Filtramos solo las asistencias del usuario actual
      const userAttendance = data.filter(assistance => assistance.userId === userId && assistance.confirmed);
      setAttendanceHistory(userAttendance);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar historial de asistencia');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceHistory();
  }, [userId]);

  return { attendanceHistory, loading, error, refreshHistory: fetchAttendanceHistory };
};