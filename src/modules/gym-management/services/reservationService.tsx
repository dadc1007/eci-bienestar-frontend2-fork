import api from "@/modules/gym-management/lib/axios";

// CRUD básico
export const getReservationById = (id: string) => api.get(`/reservations/${id}`);
export const updateReservation = (id: string, data: any) => api.put(`/reservations/${id}`, data);
export const deleteReservation = (id: string) => api.delete(`/reservations/${id}`);
export const getAllReservations = () => api.get("/reservations");
export const createReservation = (data: any) => api.post("/reservations", data);

// Consultas especializadas
export const getReservationsByUserId = (userId: string) =>
  api.get(`/reservations/user/${userId}`);

export const getReservationsByStatus = (status: string) =>
  api.get(`/reservations/status/${status}`);

export const getReservationsBySessionId = (sessionId: string) =>
  api.get(`/reservations/session/${sessionId}`);

export const getReservationsByDate = (date: string) =>
  api.get("/reservations/date", { params: { date } });