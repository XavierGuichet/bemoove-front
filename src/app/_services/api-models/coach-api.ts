import { Coach } from '../../models/index';

export class CoachApi {
    public id: number;
    public business: string;
    public firstname: string;
    public lastname: string;
    public telHome: string;
    public telMobile: string;
    public user: string;
    public address: string;
    public ismale: boolean;
    public description: string;
    public birthdate: Date;
    public photo: string;

    constructor(coach: Coach ) {
        this.id = coach.id;
        this.firstname = coach.firstname;
        this.lastname = coach.lastname;
        this.telHome = coach.telHome;
        this.telMobile = coach.telMobile;
        this.ismale = coach.ismale;
        this.description = coach.description;
        this.birthdate = coach.birthdate;

        if ( coach.business.id ) {
            this.business = '/businesses/' + coach.business.id;
        }
        if ( coach.photo.id ) {
            this.photo = '/images/' + coach.photo.id;
        }
    }
}
