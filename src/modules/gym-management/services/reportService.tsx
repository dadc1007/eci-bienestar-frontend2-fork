import api from "@/modules/gym-management/lib/axios";

// CRUD básico
export const getReportById = (id: string) => api.get(`/reports/${id}`);
export const updateReport = (id: string, data: any) => api.put(`/reports/${id}`, data);
export const deleteReport = (id: string) => api.delete(`/reports/${id}`);
export const getAllReports = () => api.get("/reports");
export const createReport = (data: any) => api.post("/reports", data);

// Consultas especializadas
export const getReportsByType = (type: string) =>
  api.get("/reports/type", { params: { type } });

export const getReportsByDate = (date: string) =>
  api.get("/reports/date", { params: { date } });

export const getReportsByCoachId = (coachId: string) =>
  api.get(`/reports/coach/${coachId}`);