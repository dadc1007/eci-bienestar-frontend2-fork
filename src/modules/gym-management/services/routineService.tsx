import api from "@/modules/gym-management/lib/axios";

// CRUD básico
export const getRoutineById = (id: string) => api.get(`/routines/${id}`);
export const updateRoutine = (id: string, data: any) => api.put(`/routines/${id}`, data);
export const deleteRoutine = (id: string) => api.delete(`/routines/${id}`);
export const getAllRoutines = () => api.get("/routines");
export const createRoutine = (data: any) => api.post("/routines", data);

// Consultas especializadas
export const getRoutinesByName = (name: string) =>
  api.get(`/routines/name/${name}`);

export const getRoutinesByExercises = (exerciseIds: string[]) =>
  api.get(`/routines/exercises`, { params: { ids: exerciseIds.join(",") } });

export const getRoutinesByDifficulty = (level: string) =>
  api.get(`/routines/difficulty/${level}`);