import { User, Address, Business, Image } from './index';

export class Coach {
    public id: number;
    public business: Business;
    public firstname: string;
    public lastname: string;
    public telHome: string;
    public telMobile: string;
    public user: User;
    public address: Address;
    public ismale: boolean;
    public description: string;
    public birthdate: Date;
    public photo: Image;

    constructor(photo = new Image() ) {
        this.photo = photo;
    }
}
