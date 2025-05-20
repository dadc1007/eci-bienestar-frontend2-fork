
import axios from "axios";
import {HallEntity} from "../types/RoomTypes.ts";
const API_BASE_URL = "http://localhost:8080";


export const hallsApi = {
    getAllHalls: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/halls/all`, {});
            return response.data;
        } catch (error) {
            console.error("Error fetching halls:", error);
            throw error;
        }
    },

    getHallById: async (id: number) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/halls/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching hall with ID ${id}:`, error);
            throw error;
        }
    },

    addHall: async (hall: HallEntity) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/halls`, hall);
            return response.data;
        } catch (error) {
            console.error("Error creating hall:", error);
            throw error;
        }
    },

    deleteHall: async (id: number) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/halls/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting hall with ID ${id}:`, error);
            throw error;
        }
    },

    findAvailableHalls: async (
        date: string,
        startTime: string,
        endTime: string,
        page = 0,
        size = 10,
        sort = "id",
        direction = "asc",
    ) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/halls/available`, {
                params: { date, startTime, endTime, page, size, sort, direction },
            });
            return response.data;
        } catch (error) {
            console.error("Error finding available halls:", error);
            throw error;
        }
    },
};