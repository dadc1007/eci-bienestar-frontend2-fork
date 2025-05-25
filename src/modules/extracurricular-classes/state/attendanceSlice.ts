import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
  start: string;
  end: string;
}

export interface AttendanceByClassParams {
  userId: string;
  classId: string;
}

// Confirmar asistencia
export const confirmAttendance = createAsyncThunk(
  'attendance/confirmAttendance',
  async (params: AttendanceConfirmParams, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/assistance/confirm`,
        null,
        {
          params: {
            userId: params.userId,
            instructorId: params.instructorId,
            classId: params.classId,
            SessionId: params.sessionId,
          }
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Error al confirmar asistencia');
    }
  }
);

// Obtener cantidad de asistencias confirmadas por período
export const getConfirmedAttendanceStats = createAsyncThunk(
  'attendance/getConfirmedStats',
  async (params: AttendanceStatsParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/assistance/user/confirmed`,
        {
          params: {
            userId: params.userId,
            start: params.start,
            end: params.end,
          }
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Error al obtener estadísticas de asistencia');
    }
  }
);

// Obtener asistencias por clase
export const getAttendanceByClass = createAsyncThunk(
  'attendance/getByClass',
  async (params: AttendanceByClassParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/assistance/user/class`,
        {
          params: {
            userId: params.userId,
            classId: params.classId,
          }
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Error al obtener asistencias por clase');
    }
  }
);

// Obtener historial de asistencias
export const getAttendanceHistory = createAsyncThunk(
  'attendance/getHistory',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/assistance/my-Historical`,
        {
          params: { userId }
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Error al obtener historial de asistencias');
    }
  }
);

// Obtener todas las asistencias confirmadas
export const getAllConfirmedAttendances = createAsyncThunk(
  'attendance/getAllConfirmed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/assistance/confirmed`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Error al obtener asistencias confirmadas');
    }
  }
);

// Obtener inasistencias
export const getAbsences = createAsyncThunk(
  'attendance/getAbsences',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/assistance/absences`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Error al obtener inasistencias');
    }
  }
);

interface AttendanceState {
  attendances: Attendance[];
  confirmedAttendances: Attendance[];
  absences: Attendance[];
  attendanceHistory: Attendance[];
  attendanceStats: any;
  attendanceByClass: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  confirmStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  confirmError: string | null;
}

const initialState: AttendanceState = {
  attendances: [],
  confirmedAttendances: [],
  absences: [],
  attendanceHistory: [],
  attendanceStats: null,
  attendanceByClass: null,
  status: 'idle',
  confirmStatus: 'idle',
  error: null,
  confirmError: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearConfirmStatus: (state) => {
      state.confirmStatus = 'idle';
      state.confirmError = null;
    },
    clearError: (state) => {
      state.error = null;
      state.confirmError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Confirmar asistencia
      .addCase(confirmAttendance.pending, (state) => {
        state.confirmStatus = 'loading';
        state.confirmError = null;
      })
      .addCase(confirmAttendance.fulfilled, (state) => {
        state.confirmStatus = 'succeeded';
        state.confirmError = null;
      })
      .addCase(confirmAttendance.rejected, (state, action) => {
        state.confirmStatus = 'failed';
        state.confirmError = action.payload as string;
      })
      
      // Estadísticas de asistencia
      .addCase(getConfirmedAttendanceStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getConfirmedAttendanceStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendanceStats = action.payload;
      })
      .addCase(getConfirmedAttendanceStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Asistencias por clase
      .addCase(getAttendanceByClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAttendanceByClass.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendanceByClass = action.payload;
      })
      .addCase(getAttendanceByClass.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Historial de asistencias
      .addCase(getAttendanceHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAttendanceHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendanceHistory = action.payload;
      })
      .addCase(getAttendanceHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Asistencias confirmadas
      .addCase(getAllConfirmedAttendances.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllConfirmedAttendances.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.confirmedAttendances = action.payload;
      })
      .addCase(getAllConfirmedAttendances.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Inasistencias
      .addCase(getAbsences.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAbsences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.absences = action.payload;
      })
      .addCase(getAbsences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearConfirmStatus, clearError } = attendanceSlice.actions;
export default attendanceSlice.reducer;