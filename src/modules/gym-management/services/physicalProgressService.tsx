import api from "@modules/gym-management/lib/axios";

export const getProgressById = (id: string) => api.get(`/physical-progress/${id}`);
export const getAllProgress = () => api.get("/physical-progress");
export const getProgressByUser = (userId: string) => api.get(`/physical-progress/user/${userId}`);
export const getProgressByUserAndDate = (userId: string, date: string) =>
  api.get(`/physical-progress/user/${userId}/date`, { params: { date } });
export const getProgressByUserAndDateRange = (userId: string, startDate: string, endDate: string) =>
  api.get(`/physical-progress/user/${userId}/date-range`, {
    params: { start: startDate, end: endDate },
  });
export const getProgressByDate = (date: string) =>
  api.get(`/physical-progress/date`, { params: { date } });

export const createProgress = (data: any) => api.post("/physical-progress", data);

export const updateProgress = (id: string, data: any) =>
  api.put(`/physical-progress/${id}`, data);

export const deleteProgress = (id: string) => api.delete(`/physical-progress/${id}`);