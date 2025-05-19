// Cliente API para el módulo de salas recreativas
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Interfaces basadas en la documentación OpenAPI
export interface HallEntity {
  id?: number;
  name: string;
  location: string;
  status: string;
  description: string;
  capacity: number;
}

export interface ItemEntity {
  id?: number;
  name: string;
  description: string;
  status: string;
  category: string;
  quantity: number;
  quantityAvailable?: number;
  available: boolean;
  hall: HallEntity | number;
}

export interface ItemEntityRequest {
  name: string;
  description: string;
  status: string;
  category: string;
  quantity: number;
  available: boolean;
  hall: number;
}

export interface LocalTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface LoanRequestDTO {
  idItem: number;
  quantity: number;
}

export interface BookingRequestDTO {
  nameUser: string;
  idUser: number;
  rolUser: string;
  date: string; // Format: YYYY-MM-DD
  startTime: LocalTime;
  endTime: LocalTime;
  hallId: number;
  itemsLoans: LoanRequestDTO[];
}

// Cliente API para salas (halls)
export const hallsApi = {
  getAllHalls: async (page = 0, size = 10, sort = 'id', direction = 'asc') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/halls/all`, {
        params: { page, size, sort, direction }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching halls:', error);
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
      console.error('Error creating hall:', error);
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
  
  findAvailableHalls: async (date: string, startTime: string, endTime: string, page = 0, size = 10, sort = 'id', direction = 'asc') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/halls/available`, {
        params: { date, startTime, endTime, page, size, sort, direction }
      });
      return response.data;
    } catch (error) {
      console.error('Error finding available halls:', error);
      throw error;
    }
  }
};

// Cliente API para elementos (items)
export const itemsApi = {
  getAllItems: async (page = 0, size = 10, sort = 'id', direction = 'asc') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/items/all`, {
        params: { page, size, sort, direction }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  getItemById: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item with ID ${id}:`, error);
      throw error;
    }
  },

  addItem: async (item: ItemEntityRequest) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/items`, item);
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  updateItem: async (id: number, item: ItemEntity) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/items/${id}`, item);
      return response.data;
    } catch (error) {
      console.error(`Error updating item with ID ${id}:`, error);
      throw error;
    }
  },

  deleteItem: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting item with ID ${id}:`, error);
      throw error;
    }
  },

  searchItemsByName: async (name: string, page = 0, size = 10, sort = 'id', direction = 'asc') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/items/search`, {
        params: { name, page, size, sort, direction }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching items with name ${name}:`, error);
      throw error;
    }
  },

  getItemsByHallId: async (hallId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/items/hall/${hallId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching items for hall ID ${hallId}:`, error);
      throw error;
    }
  },

  searchItemsByCategory: async (category: string, available?: boolean, page = 0, size = 10, sort = 'id', direction = 'asc') => {
    try {
      const params: any = { page, size, sort, direction };
      if (available !== undefined) {
        params.available = available;
      }
      
      const response = await axios.get(`${API_BASE_URL}/api/items/category/${category}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error searching items by category ${category}:`, error);
      throw error;
    }
  }
};

// Cliente API para reservas (bookings)
export const bookingsApi = {
  getAllBookings: async (page = 0, size = 10, sort = 'id', direction = 'asc') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings`, {
        params: { page, size, sort, direction }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  getBookingById: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching booking with ID ${id}:`, error);
      throw error;
    }
  },

  createBooking: async (booking: BookingRequestDTO) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/bookings`, booking);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  returnBooking: async (id: number) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/bookings/${id}/return`);
      return response.data;
    } catch (error) {
      console.error(`Error returning booking with ID ${id}:`, error);
      throw error;
    }
  },

  cancelBooking: async (id: number) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/bookings/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.error(`Error cancelling booking with ID ${id}:`, error);
      throw error;
    }
  },

  getLoansByBookingId: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/${id}/loans`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching loans for booking ID ${id}:`, error);
      throw error;
    }
  },

  getBookingsByUserId: async (userId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bookings for user ID ${userId}:`, error);
      throw error;
    }
  }
};

// Cliente API para estadísticas
export const statisticsApi = {
  getItemUsageStatistics: async (startDate?: string, endDate?: string) => {
    try {
      const params: any = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const response = await axios.get(`${API_BASE_URL}/api/statistics/items`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching item usage statistics:', error);
      throw error;
    }
  },
  
  getHallUsageStatistics: async (startDate?: string, endDate?: string) => {
    try {
      const params: any = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const response = await axios.get(`${API_BASE_URL}/api/statistics/halls`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching hall usage statistics:', error);
      throw error;
    }
  }
};

// Función de ayuda para convertir string de tiempo a LocalTime
export const stringToLocalTime = (timeString: string): LocalTime => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return {
    hour: hours,
    minute: minutes,
    second: 0,
    nano: 0
  };
};

// Función de ayuda para convertir LocalTime a string de tiempo
export const localTimeToString = (time: LocalTime): string => {
  return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
};

export default {
  hallsApi,
  itemsApi,
  bookingsApi,
  statisticsApi,
  stringToLocalTime,
  localTimeToString
};
