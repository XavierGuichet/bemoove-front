import { Person, WorkoutInstance } from './index';

export class Reservation {
    public id: number;
    public order: string;
    public person: Person;
    public workoutInstance: WorkoutInstance;
    public dateadd: Date;
    public nbBooking: number;
}
