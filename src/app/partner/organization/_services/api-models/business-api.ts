import { Organization } from '../../models/organization';

export class BusinessApi {
    public id: number;
    public legalName: string;
    public commonName: string;
    public mail: string;
    public legalStatus: string;
    public siret: string;
    public shareCapital: number;
    public RCSNumber: string;
    public APECode: string;
    public vatNumber: string;
    public vatRate: number;
    public legalRepresentative: string;

    constructor(organization: Organization) {
        this.id = organization.id;

        if ( organization.legalName ) {
            this.legalName = organization.legalName;
        }
        if ( organization.vatRate ) {
            this.vatRate = organization.vatRate;
        }

        if ( organization.legalStatus ) {
          this.legalStatus = organization.legalStatus;
        }

        if ( organization.siret ) {
          this.siret = organization.siret;
        }

        if ( organization.APECode ) {
          this.APECode = organization.APECode;
        }

        if ( organization.vatNumber ) {
          this.vatNumber = organization.vatNumber;
        }

        if ( organization.RCSNumber ) {
          this.RCSNumber = organization.RCSNumber;
        }

        if ( organization.shareCapital ) {
          this.shareCapital = organization.shareCapital;
        }
    }
}
