import { Address } from '../../../models/address';
import { Person } from './person';

export class Organization {
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
  public address: Address;
  public legalRepresentative: Person;
}
