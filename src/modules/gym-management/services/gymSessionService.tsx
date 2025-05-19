import api from "@/modules/gym-management/lib/axios";

// CRUD básico
export const getGymSessionById = (id: string) => api.get(`/gym-sessions/${id}`);
export const updateGymSession = (id: string, data: any) => api.put(`/gym-sessions/${id}`, data);
export const deleteGymSession = (id: string) => api.delete(`/gym-sessions/${id}`);
export const getAllGymSessions = () => api.get("/gym-sessions/");
export const createGymSession = (data: any) => api.post("/gym-sessions/", data);

// Búsquedas especializadas
export const getGymSessionsByTimeRange = (start: string, end: string) =>
  api.get("/gym-sessions/time-range", { params: { start, end } });

export const getGymSessionsByEndTime = (endTime: string) =>
  api.get(`/gym-sessions/end-time/${endTime}`);

export const getGymSessionsByDate = (date: string) =>
  api.get(`/gym-sessions/date/${date}`);

export const getGymSessionsByDateAndTimeRange = (date: string, start: string, end: string) =>
  api.get(`/gym-sessions/date/${date}/time-range`, { params: { start, end } });

export const getGymSessionsByCoachId = (coachId: string) =>
  api.get(`/gym-sessions/coach/${coachId}`);

export const getGymSessionsByCapacity = (capacity: number) =>
  api.get(`/gym-sessions/capacity/${capacity}`);
