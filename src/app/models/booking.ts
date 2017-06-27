import { User } from './user';
import { Workout } from './workout';

export class Booking {
    public id: number;
    public user: User;
    public workout: Workout;
    public dateAdd: Date;
    public nbBooking: number;

    constructor(user, workout, nbBooking
    ) {
        this.dateAdd = new Date();

        this.user = user;
        this.workout = workout;
        this.nbBooking = nbBooking;
    }
}
