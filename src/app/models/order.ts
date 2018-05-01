import { Payment } from './payment';
import { OrderHistory } from './index';

export class Order {
    public id: number;
    public statusHistory: OrderHistory[];
    public payment: Payment;
}
