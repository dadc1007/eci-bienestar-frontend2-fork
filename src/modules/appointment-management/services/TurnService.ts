import apiClient from "@/common/services/apiClient";
import {
  ApiResponse,
  TurnResponse,
  CallTurnRequest,
  CreateTurnRequest,
} from "@modules/appointment-management/types/dto";
import { SpecialityEnum } from "@modules/appointment-management/types/enums";

export const createTurn = async (
  data: CreateTurnRequest
): Promise<ApiResponse<TurnResponse>> => {
  try {
    const response = await apiClient.post<ApiResponse<TurnResponse>>(
      "/medical-turns/turns",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creando el turno:", error);
    throw error;
  }
};

export const getTurns = async (): Promise<ApiResponse<TurnResponse[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<TurnResponse[]>>(
      "/medical-turns/turns"
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo turnos:", error);
    throw error;
  }
};

export const getTurnsBySpeciality = async (
  speciality: SpecialityEnum
): Promise<ApiResponse<TurnResponse[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<TurnResponse[]>>(
      `/medical-turns/turns/${speciality}`
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo turnos:", error);
    throw error;
  }
};

export const getCurrentTurn = async (): Promise<ApiResponse<TurnResponse>> => {
  try {
    const response = await apiClient.get<ApiResponse<TurnResponse>>(
      `/medical-turns/turns/current-turn`
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo el turno que esta siendo atendido:", error);
    throw error;
  }
};

export const getCurrentTurnBySpeciality = async (
  speciality: SpecialityEnum
): Promise<ApiResponse<TurnResponse>> => {
  try {
    const response = await apiClient.get<ApiResponse<TurnResponse>>(
      `/medical-turns/turns/current-turn/${speciality}`
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo el turno que esta siendo atendido:", error);
    throw error;
  }
};

export const callNextTurn = async (
  data: CallTurnRequest
): Promise<ApiResponse<TurnResponse>> => {
  try {
    const response = await apiClient.post<ApiResponse<TurnResponse>>(
      "/medical-turns/turns/call-next",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error llamando al siguiente turno:", error);
    throw error;
  }
};

export const callTurn = async (
  data: CallTurnRequest
): Promise<ApiResponse<TurnResponse>> => {
  try {
    const response = await apiClient.post<ApiResponse<TurnResponse>>(
      "/medical-turns/turns/call",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error llamando al siguiente turno:", error);
    throw error;
  }
};

export const skipTurn = async (
  speciality: SpecialityEnum
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.post<ApiResponse<void>>(
      `/medical-turns/turns/skip?speciality=${speciality}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al finalizar el turno:", error);
    throw error;
  }
};

export const turnsEnabled = async (): Promise<ApiResponse<boolean>> => {
  try {
    const response = await apiClient.get<ApiResponse<boolean>>(
      "/medical-turns/turns/are-enabled"
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el estado de los turnos:", error);
    throw error;
  }
};

export const turnsDisabledBySpeciality = async (): Promise<
  ApiResponse<SpecialityEnum[]>
> => {
  try {
    const response = await apiClient.get<ApiResponse<SpecialityEnum[]>>(
      "/medical-turns/turns/specialties-disabled"
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el estado de los turnos:", error);
    throw error;
  }
};

export const toggleTurns = async (
  action: "enable" | "disable"
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.post<ApiResponse<void>>(
      `/medical-turns/turns/${action}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al ${action === "enable" ? "habilitar" : "deshabilitar"} turnos:`,
      error
    );
    throw error;
  }
};

export const toggleTurnsBySpeciality = async (
  action: "enable" | "disable",
  speciality: SpecialityEnum
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.post<ApiResponse<void>>(
      `/medical-turns/turns/${action}/${speciality}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al ${action === "enable" ? "habilitar" : "deshabilitar"} turnos:`,
      error
    );
    throw error;
  }
};
