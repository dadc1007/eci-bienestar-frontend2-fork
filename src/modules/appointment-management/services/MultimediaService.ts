import apiClient from "@/common/services/apiClient";
import { CreateMultimediaRequest } from "@/modules/appointment-management/types/dto/request/CreateMultimediaRequest";
import { MultimediaResponse } from "@/modules/appointment-management/types/dto/response/MultimediaResponse";

export const uploadMultimedia = async (
  data: CreateMultimediaRequest
): Promise<void> => {
  try {
    await apiClient.post("/api/multimedia", data);
  } catch (error) {
    console.error("Error subiendo multimedia:", error);
    throw error;
  }
};

export const getAllMultimedia = async (): Promise<MultimediaResponse[]> => {
  try {
    const response = await apiClient.get<MultimediaResponse[]>("/api/multimedia");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo multimedia:", error);
    throw error;
  }
};

export const deleteMultimedia = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/api/multimedia/${id}`);
  } catch (error) {
    console.error("Error eliminando multimedia:", error);
    throw error;
  }
};
