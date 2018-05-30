

export interface Exercise {
    id: string;
    name: string;
    duration: number;
    calories: number;
    date?: Date;
    userId: string;
    state? : 'completed' | 'cancelled' | null;
}