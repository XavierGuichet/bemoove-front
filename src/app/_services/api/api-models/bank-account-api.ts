import { BankAccount } from '../../../models/bank-account';

export class BankAccountApi {
    public id: number;
    public ownerName: string;
    public address: string;
    public iban: string;

    constructor(bankAccount: BankAccount) {
        this.ownerName = bankAccount.ownerName;
        this.iban = bankAccount.iban;

        if ( bankAccount.address.id ) {
            this.address = '/addresses/' + bankAccount.address.id;
        }
    }
}
