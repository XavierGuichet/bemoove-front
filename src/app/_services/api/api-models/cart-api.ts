import { Cart } from '../../../models/index';

export class CartApi {
  public id: number;
  public user: string;
  public workoutInstance: string;
  public dateAdd: Date;
  public nbBooking: number;

  constructor(cart: Cart) {
      this.dateAdd = cart.dateAdd;
      this.nbBooking = cart.nbBooking;
      if ( cart.user && cart.user.id ) {
          this.user = '/users/' + cart.user.id;
      }
      if ( cart.workoutInstance.id ) {
          this.workoutInstance = '/workout_instances/' + cart.workoutInstance.id;
      }
  }
}
