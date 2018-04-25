import { Person, WorkoutInstance } from './index';

export class Cart {
    public id: number;
    public member: Person;
    public workoutInstance: WorkoutInstance;
    public dateAdd: Date;
    public nbBooking: number;

    constructor( ) {
        // Nothing
    }

    get totalAmountTaxIncl() {
        let taxRate = this.workoutInstance.coach.business.vatRate;
        let productPriceTaxExcl = this.workoutInstance.workout.price;
        let totalAmountTaxExcl = productPriceTaxExcl * this.nbBooking;
        let totalAmountTaxIncl = totalAmountTaxExcl * (1 + taxRate / 100);

        return totalAmountTaxIncl;
    }
}
