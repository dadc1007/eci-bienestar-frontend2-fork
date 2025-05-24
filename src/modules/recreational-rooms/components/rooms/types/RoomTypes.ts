export interface Room {
    id: string;
    name: string;
    location: string;
    capacity: number;
    description: string;
    isAvailable: boolean;
    openingHours: string;
    closingHours: string;
    features: string[];
}

export interface HallEntity {
    id?: number;
    name: string;
    location: string;
    status: string;
    description: string;
    capacity: number;
}

export interface BookingRequestDTO {
    date: string;
    startTime: {
        hour: number;
        minute: number;
        second: number;
        nano: number;
    };
    endTime: {
        hour: number;
        minute: number;
        second: number;
        nano: number;
    };
    hallId: number;
    itemsLoans: {
        idItem: number;
        quantity: number;
    }[];
}