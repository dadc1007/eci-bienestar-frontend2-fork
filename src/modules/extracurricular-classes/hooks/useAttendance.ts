import { useState, useEffect, useCallback } from 'react';
import {
  Attendance,
  AttendanceConfirmParams,
  AttendanceStatsParams,
  AttendanceByClassParams,
  confirmAttendance,
  getConfirmedAttendanceStats,
  getAttendanceByClass,
  getAttendanceHistory,
  getAllConfirmedAttendances,
  getAbsences,
  calculateAttendancePercentage,
  getCurrentMonthAttendances,
} from '../services/attendanceService';

// Hook para confirmar asistencia
export const useConfirmAttendance = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const confirm = async (params: AttendanceConfirmParams) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await confirmAttendance(params);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al confirmar asistencia');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { confirm, loading, error, success, reset };
};

// Hook para obtener estadísticas de asistencia
export const useAttendanceStats = (params?: AttendanceStatsParams) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (queryParams: AttendanceStatsParams) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getConfirmedAttendanceStats(queryParams);
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar estadísticas');
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (params) {
      fetchStats(params);
    }
  }, [params, fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};

// Hook para obtener asistencias por clase
export const useAttendanceByClass = (params?: AttendanceByClassParams) => {
  const [classAttendance, setClassAttendance] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClassAttendance = useCallback(async (queryParams: AttendanceByClassParams) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAttendanceByClass(queryParams);
      setClassAttendance(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar asistencias por clase');
      setClassAttendance(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (params) {
      fetchClassAttendance(params);
    }
  }, [params, fetchClassAttendance]);

  return { classAttendance, loading, error, refetch: fetchClassAttendance };
};

// Hook para obtener historial de asistencias
export const useAttendanceHistory = (userId?: string) => {
  const [history, setHistory] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async (userIdParam: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAttendanceHistory(userIdParam);
      setHistory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar historial');
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchHistory(userId);
    }
  }, [userId, fetchHistory]);

  // Calcular estadísticas del historial
  const attendancePercentage = calculateAttendancePercentage(history);
  const totalSessions = history.length;
  const confirmedAttendances = history.filter(att => att.confirm).length;
  const absences = totalSessions - confirmedAttendances;

  return {
    history,
    loading,
    error,
    refetch: fetchHistory,
    stats: {
      attendancePercentage,
      totalSessions,
      confirmedAttendances,
      absences,
    },
  };
};

// Hook para obtener todas las asistencias confirmadas
export const useAllConfirmedAttendances = () => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendances = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllConfirmedAttendances();
      setAttendances(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar asistencias confirmadas');
      setAttendances([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  return { attendances, loading, error, refresh: fetchAttendances };
};

// Hook para obtener inasistencias
export const useAbsences = () => {
  const [absences, setAbsences] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAbsences = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAbsences();
      setAbsences(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar inasistencias');
      setAbsences([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbsences();
  }, []);

  return { absences, loading, error, refresh: fetchAbsences };
};

// Hook para obtener asistencias del mes actual
export const useCurrentMonthAttendance = (userId?: string) => {
  const [monthlyAttendance, setMonthlyAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMonthlyAttendance = useCallback(async (userIdParam: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentMonthAttendances(userIdParam);
      setMonthlyAttendance(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar asistencias del mes');
      setMonthlyAttendance([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchMonthlyAttendance(userId);
    }
  }, [userId, fetchMonthlyAttendance]);

  const monthlyStats = {
    totalSessions: monthlyAttendance.length,
    confirmedAttendances: monthlyAttendance.filter(att => att.confirm).length,
    attendanceRate: calculateAttendancePercentage(monthlyAttendance),
  };

  return {
    monthlyAttendance,
    loading,
    error,
    refetch: fetchMonthlyAttendance,
    monthlyStats,
  };
};

// Hook combinado para dashboard de asistencias
export const useAttendanceDashboard = (userId?: string) => {
  const { history, loading: historyLoading, error: historyError, stats } = useAttendanceHistory(userId);
  const { monthlyAttendance, loading: monthlyLoading, monthlyStats } = useCurrentMonthAttendance(userId);
  const { confirm, loading: confirmLoading, error: confirmError, success: confirmSuccess } = useConfirmAttendance();

  const loading = historyLoading || monthlyLoading;
  const error = historyError;

  return {
    // Datos
    history,
    monthlyAttendance,
    
    // Estadísticas
    overallStats: stats,
    monthlyStats,
    
    // Estados
    loading,
    error,
    
    // Acciones
    confirmAttendance: confirm,
    confirmLoading,
    confirmError,
    confirmSuccess,
  };
};