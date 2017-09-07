import { User, Address, Image } from './index';

export class Profile {
    public id: number;
    public firstname: string;
    public lastname: string;
    public telHome: string;
    public telMobile: string;
    public user: User;
    public address: Address;
    public ismale: boolean;
    public presentation: string;
    public birthdate: Date;
    public photo: Image;

    constructor(
    ) {
    }
}
