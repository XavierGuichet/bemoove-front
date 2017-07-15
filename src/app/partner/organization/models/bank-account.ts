import { Address } from '../../../models/address';

export class BankAccount {
    public id: number;
    public user: string;
    public ownerName: string;
    public address: Address;
    public iban: string;
}
