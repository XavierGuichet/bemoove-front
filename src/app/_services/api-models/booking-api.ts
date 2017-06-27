import { Booking } from '../../models/booking';

export class BookingApi {
  public id: number;
  public user: string;
  public workout: string;
  public dateAdd: Date;
  public nbBooking: number;

  constructor(booking: Booking) {
      this.dateAdd = booking.dateAdd;
      this.nbBooking = booking.nbBooking;
      if ( booking.user.id ) {
          this.user = '/users/' + booking.user.id;
      }
      if ( booking.workout.id ) {
          this.workout = '/workouts/' + booking.workout.id;
      }
  }
}
