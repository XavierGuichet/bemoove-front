import { LegalRepresentative } from '../../models/legal-representative';

export class LegalRepresentativeApi {
    public id: number;
    public lastName: string;
    public firstName: string;
    public address: string;
    public phoneNumber: string;
    public ismale: boolean;
    public biography: string;
    public birthdate: string;
    public countryOfResidence: string;
    public nationality: string;

    constructor(legalRepresentative: LegalRepresentative) {
        this.lastName = legalRepresentative.lastName;
        this.firstName = legalRepresentative.firstName;

        // if ( legalRepresentative.address.id ) {
        //     this.address = '/addresses/' + legalRepresentative.address.id;
        // }
    }
}
