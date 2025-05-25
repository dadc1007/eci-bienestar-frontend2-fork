import axios from 'axios';
import { API_BASE_URL } from '../lib/config';

export interface Attendance {
  id: string;
  startTime: string;
  endTime?: string;
  userId: string;
  instructorId: string;
  classId: string;
  sessionId: string;
  confirm: boolean;
}

export interface AttendanceConfirmParams {
  userId: string;
  instructorId: string;
  classId: string;
  sessionId: string;
}

export interface AttendanceStatsParams {
  userId?: string;
  start: string;
  end: string;
  classId?: string;
}

export interface AttendanceByClassParams {
  userId: string;
  classId: string;
  includeStats?: boolean;
}

const ATTENDANCE_URL = `${API_BASE_URL}/assistance`;

// Configuración común de axios para manejo de errores
const handleApiError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      switch (error.response.status) {
        case 400: throw new Error(error.response.data?.message || 'Solicitud incorrecta');
        case 401: throw new Error('No autorizado');
        case 404: throw new Error('Recurso no encontrado');
        case 500: throw new Error('Error interno del servidor');
        default: throw new Error(error.response.data?.message || defaultMessage);
      }
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    }
  }
  throw new Error(defaultMessage);
};

// Funciones principales del servicio
export const confirmAttendance = async (params: AttendanceConfirmParams): Promise<{ message: string; attendance: Attendance }> => {
  try {
    const response = await axios.post(`${ATTENDANCE_URL}/confirm`, null, {
      params: {
        userId: params.userId,
        instructorId: params.instructorId,
        classId: params.classId,
        SessionId: params.sessionId,
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error al confirmar asistencia');
    throw error;
  }
};

export const getConfirmedAttendanceStats = async (params: AttendanceStatsParams) => {
  try {
    const response = await axios.get(`${ATTENDANCE_URL}/user/confirmed`, { params });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error al obtener estadísticas de asistencia');
    throw error;
  }
};

export const getAttendanceByClass = async (params: AttendanceByClassParams) => {
  try {
    const response = await axios.get(`${ATTENDANCE_URL}/user/class`, { params });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error al obtener asistencias por clase');
    throw error;
  }
};

export const getAttendanceHistory = async (userId: string): Promise<Attendance[]> => {
  try {
    const response = await axios.get(`${ATTENDANCE_URL}/my-Historical`, { params: { userId } });
    if (response.status === 204) return [];
    return response.data.map((att: any) => ({
      id: att.id,
      startTime: att.startTime,
      endTime: att.endTime || null,
      userId: att.userId,
      instructorId: att.instructorId,
      classId: att.classId,
      sessionId: att.sessionId,
      confirm: att.confirm
    }));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 204) return [];
    handleApiError(error, 'Error al obtener historial de asistencias');
    throw error;
  }
};

export const getAllConfirmedAttendances = async (params?: { start?: string; end?: string }) => {
  try {
    const response = await axios.get(`${ATTENDANCE_URL}/confirmed`, { params });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error al obtener asistencias confirmadas');
    throw error;
  }
};

export const getAbsences = async (params?: { userId?: string; start?: string; end?: string }) => {
  try {
    const response = await axios.get(`${ATTENDANCE_URL}/absences`, { params });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error al obtener inasistencias');
    throw error;
  }
};

// Funciones utilitarias
export const calculateAttendancePercentage = (attendances: Attendance[], options?: {
  dateRange?: { start: string; end: string };
  classId?: string;
}): number => {
  if (attendances.length === 0) return 0;
  let filtered = [...attendances];
  if (options?.dateRange) {
    filtered = filterAttendancesByDateRange(filtered, options.dateRange.start, options.dateRange.end);
  }
  if (options?.classId) {
    filtered = filtered.filter(att => att.classId === options.classId);
  }
  const confirmedCount = filtered.filter(att => att.confirm).length;
  return Math.round((confirmedCount / filtered.length) * 100);
};

export const filterAttendancesByDateRange = (attendances: Attendance[], startDate: string, endDate: string) => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return attendances.filter(att => {
      const attDate = new Date(att.startTime);
      return attDate >= start && attDate <= end;
    });
  } catch (error) {
    console.error('Error filtrando asistencias por fecha:', error);
    return [];
  }
};

export const groupAttendancesByClass = (attendances: Attendance[]) => {
  return attendances.reduce((groups, attendance) => {
    const classId = attendance.classId;
    if (!groups[classId]) {
      groups[classId] = {
        attendances: [],
        stats: { total: 0, confirmed: 0, percentage: 0 }
      };
    }
    groups[classId].attendances.push(attendance);
    groups[classId].stats.total++;
    if (attendance.confirm) groups[classId].stats.confirmed++;
    groups[classId].stats.percentage = Math.round(
      (groups[classId].stats.confirmed / groups[classId].stats.total) * 100
    );
    return groups;
  }, {} as Record<string, { attendances: Attendance[]; stats: { total: number; confirmed: number; percentage: number } }>);
};

export const getCurrentMonthAttendances = async (userId: string, options?: { useCache?: boolean; forceRefresh?: boolean }) => {
  let cached: Attendance[] | null = null;
  if (options?.useCache && !options?.forceRefresh && cached) return cached;

  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  const history = await getAttendanceHistory(userId);
  const result = filterAttendancesByDateRange(
    history,
    firstDay.toISOString().split('T')[0],
    lastDay.toISOString().split('T')[0]
  );
  
  cached = result;
  return result;
};

export const getUserAttendanceSummary = async (userId: string) => {
  const [history, currentMonth, absences] = await Promise.all([
    getAttendanceHistory(userId),
    getCurrentMonthAttendances(userId),
    getAbsences({ userId })
  ]);

  return {
    overallStats: {
      total: history.length,
      confirmed: history.filter(att => att.confirm).length,
      percentage: calculateAttendancePercentage(history)
    },
    monthlyStats: {
      total: currentMonth.length,
      confirmed: currentMonth.filter(att => att.confirm).length,
      percentage: calculateAttendancePercentage(currentMonth)
    },
    absences,
    byClass: groupAttendancesByClass(history)
  };
};