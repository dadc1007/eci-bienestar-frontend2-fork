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