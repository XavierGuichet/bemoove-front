import { Cart, Order } from '../../../models/index';

export class OrderApi {
    public id: number;
    public cart: string;

    constructor(cart: Cart) {
        if (!cart) {
            throw Error;
        }
        if ( cart.id ) {
            this.cart = '/carts/' + cart.id;
        }

    }
}
