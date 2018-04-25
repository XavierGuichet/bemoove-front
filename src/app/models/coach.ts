import { Address, Business, BMImage } from './index';

export class Coach {
    public id: number;
    public business: Business;
    public firstname: string;
    public lastname: string;
    public telHome: string;
    public telMobile: string;
    public address: Address;
    public ismale: boolean;
    public description: string;
    public birthdate: Date;
    public photo: BMImage;

    constructor(photo = new BMImage() ) {
        this.photo = photo;
    }
}
