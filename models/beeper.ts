export interface Beeper {
    id?: string;
    name: string;
    status: BeeperStatus;
    created_at: Date;
    exploded_at?: Date;
    latitude?: number;
    longitude?: number;
}

export enum BeeperStatus {
    Manufactured = 'manufactured',
    Assembled = 'assembled',
    Shipped = 'shipped',
    Deployed = 'deployed',
    Detonated = 'detonated'
}