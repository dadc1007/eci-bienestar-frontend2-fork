import api from "@/modules/gym-management/lib/axios";

export const getUserById = (id: string) => api.get(`/users/${id}`);

export const updateUser = (id: string, data: any) => api.put(`/users/${id}`, data);

export const deleteUser = (id: string) => api.delete(`/users/${id}`);

export const getAllUsers = () => api.get("/users");

export const createUser = (data: any) => api.post("/users", data);

export const getUsersByRole = (role: string) => api.get(`/users/role/${role}`);

export const getUsersByRegistrationDate = (date: string) =>
  api.get(`/users/registration-date/${date}`);

export const getUsersByName = (name: string) => api.get(`/users/name/${name}`);

export const getUserByEmail = (email: string) =>
  api.get(`/users/email`, { params: { email } });