import { Profile } from '../../models/index';

export class ProfileApi {
    public id: number;
    public firstname: string;
    public lastname: string;
    public telHome: string;
    public telMobile: string;
    public address: string;
    public ismale: boolean;
    public presentation: string;
    public birthdate: Date;
    public photo: string;

    constructor(profile: Profile) {
        this.id = profile.id;
        this.firstname = profile.firstname;
        this.lastname = profile.lastname;
        this.telHome = profile.telHome;
        this.telMobile = profile.telMobile;
        this.ismale = profile.ismale;
        this.presentation = profile.presentation;
        this.birthdate = profile.birthdate;

        if ( profile.photo.id ) {
            this.photo = '/images/' + profile.photo.id;
        }

    }
}
