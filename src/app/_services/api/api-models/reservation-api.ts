import { Reservation, WorkoutInstance } from '../../../models/index';

export class ReservationApi {
    public id: number;
    public order: string;
    public person: string;
    public workoutInstance: string;
    public dateAdd: Date;
    public nbBooking: number;

    constructor(reservation: Reservation
    ) {
        this.order = reservation.order;
        this.dateAdd = reservation.dateadd;
        this.nbBooking = reservation.nbBooking;

        if ( reservation.person.id ) {
            this.person = '/people/' + reservation.person.id;
        }
        if ( reservation.workoutInstance.id ) {
            this.workoutInstance = '/workout_instances/' + reservation.workoutInstance.id;
        }
    }
}
