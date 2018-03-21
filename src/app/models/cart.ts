import { User, WorkoutInstance } from './index';

export class Cart {
    public id: number;
    public user: User;
    public workoutInstance: WorkoutInstance;
    public dateAdd: Date;
    public nbBooking: number;

    constructor( ) {
        console.log('hello');
        // Nothing
    }

    get totalAmountTaxIncl() {
        console.log('totalAmountTaxIncl Called');
        let taxRate = this.workoutInstance.coach.business.vatRate;
        console.log('taxRate');
        console.log(taxRate);
        let productPriceTaxExcl = this.workoutInstance.workout.price;
        console.log('productPriceTaxExcl');
        console.log(productPriceTaxExcl);
        let totalAmountTaxExcl = productPriceTaxExcl * this.nbBooking;
        console.log('totalAmountTaxExcl');
        console.log(totalAmountTaxExcl);
        let totalAmountTaxIncl = totalAmountTaxExcl * (1 + taxRate / 100);
        console.log('totalAmountTaxIncl');
        console.log(totalAmountTaxIncl);

        return totalAmountTaxIncl;
    }
}
