import { Cart } from '../../../models/index';

export class CartApi {
  public id: number;
  public member: string;
  public workoutInstance: string;
  public dateAdd: Date;
  public nbBooking: number;

  constructor(cart: Cart) {
      this.dateAdd = cart.dateAdd;
      this.nbBooking = cart.nbBooking;
      if ( cart.member && cart.member.id ) {
          this.member = '/people/' + cart.member.id;
      }
      if ( cart.workoutInstance.id ) {
          this.workoutInstance = '/workout_instances/' + cart.workoutInstance.id;
      }
  }
}
