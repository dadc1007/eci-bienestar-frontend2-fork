import axios from 'axios';
import { API_BASE_URL } from '../lib/config';

export interface Attendance {
  id: string;
  startTime: string;
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
  userId: string;
  start: string; // formato: YYYY-MM-DD
  end: string;   // formato: YYYY-MM-DD
}

export interface AttendanceByClassParams {
  userId: string;
  classId: string;
}

const ATTENDANCE_URL = `${API_BASE_URL}/assistance`;

// Confirmar asistencia a una sesión
export const confirmAttendance = async (params: AttendanceConfirmParams): Promise<string> => {
  try {
    const response = await axios.post(
      `${ATTENDANCE_URL}/confirm`,
      null,
      {
        params: {
          userId: params.userId,
          instructorId: params.instructorId,
          classId: params.classId,
          SessionId: params.sessionId, // Nota: La API usa 'SessionId' con mayúscula
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('Error en la solicitud de confirmación de asistencia');
      }
      if (error.response?.status === 404) {
        throw new Error('Sesión no encontrada');
      }
      throw new Error(error.response?.data || 'Error al confirmar asistencia');
    }
    throw new Error('Error de conexión al confirmar asistencia');
  }
};

// Obtener cantidad de asistencias confirmadas en un periodo
export const getConfirmedAttendanceStats = async (params: AttendanceStatsParams): Promise<any> => {
  try {
    const response = await axios.get(`${ATTENDANCE_URL}/user/confirmed`, {
      params: {
        userId: params.userId,
        start: params.start,
        end: params.end,
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Error al obtener estadísticas de asistencia');
    }
    throw new Error('Error de conexión al obtener estadísticas');
  }
};

// Obtener cantidad de asistencias confirmadas por clase
export const getAttendanceByClass = async (params: AttendanceByClassParams): Promise<any> => {
  try {
    const response = await axios.get(`${ATTENDANCE_URL}/user/class`, {
      params: {
        userId: params.userId,
        classId: params.classId,
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Error al obtener asistencias por clase');
    }
    throw new Error('Error de conexión al obtener asistencias por clase');
  }
};

// Obtener histórico de asistencias por usuario
export const getAttendanceHistory = async (userId: string): Promise<Attendance[]> => {
  try {
    const response = await axios.get(`${ATTENDANCE_URL}/my-Historical`, {
      params: { userId }
    });
    
    // La API puede retornar 204 si no hay historial
    if (response.status === 204) {
      return [];
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 204) {
        return []; // No hay historial
      }
      throw new Error(error.response?.data || 'Error al obtener historial de asistencias');
    }
    throw new Error('Error de conexión al obtener historial');
  }
};

// Obtener todas las asistencias confirmadas
export const getAllConfirmedAttendances = async (): Promise<Attendance[]> => {
  try {
    const response = await axios.get(`${ATTENDANCE_URL}/confirmed`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Error al obtener asistencias confirmadas');
    }
    throw new Error('Error de conexión al obtener asistencias confirmadas');
  }
};

// Obtener inasistencias (asistencias no confirmadas en sesiones pasadas)
export const getAbsences = async (): Promise<Attendance[]> => {
  try {
    const response = await axios.get(`${ATTENDANCE_URL}/absences`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Error al obtener inasistencias');
    }
    throw new Error('Error de conexión al obtener inasistencias');
  }
};

// Funciones adicionales útiles

// Calcular porcentaje de asistencia
export const calculateAttendancePercentage = (attendances: Attendance[]): number => {
  if (attendances.length === 0) return 0;
  
  const confirmedCount = attendances.filter(att => att.confirm).length;
  return Math.round((confirmedCount / attendances.length) * 100);
};

// Filtrar asistencias por fecha
export const filterAttendancesByDateRange = (
  attendances: Attendance[],
  startDate: string,
  endDate: string
): Attendance[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return attendances.filter(att => {
    const attDate = new Date(att.startTime);
    return attDate >= start && attDate <= end;
  });
};

// Agrupar asistencias por clase
export const groupAttendancesByClass = (attendances: Attendance[]): Record<string, Attendance[]> => {
  return attendances.reduce((groups, attendance) => {
    const classId = attendance.classId;
    if (!groups[classId]) {
      groups[classId] = [];
    }
    groups[classId].push(attendance);
    return groups;
  }, {} as Record<string, Attendance[]>);
};

// Obtener asistencias del mes actual
export const getCurrentMonthAttendances = async (userId: string): Promise<Attendance[]> => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  const history = await getAttendanceHistory(userId);
  return filterAttendancesByDateRange(
    history,
    firstDay.toISOString().split('T')[0],
    lastDay.toISOString().split('T')[0]
  );
};