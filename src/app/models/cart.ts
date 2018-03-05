import { User, WorkoutInstance } from './index';

export class Cart {
    public id: number;
    public user: User;
    public workoutInstance: WorkoutInstance;
    public dateAdd: Date;
    public nbBooking: number;

    constructor(
    ) {

    }
}
