export interface Beeper {
    id?: string;
    name: string;
    status: string;
    created_at: Date;
    exploded_at?: Date;
    latitude?: number;
    longitude?: number;
}

