import { Person } from '../../../models/person';

export class PersonApi {
  public id: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public birthdate: Date;
  public nationality: string;
  public countryOfResidence: string;
  public phoneNumber: string;

  constructor(person: Person) {
      this.id = person.id;
      this.firstname = person.firstname;
      this.lastname = person.lastname;
      this.email = person.email;
      this.birthdate = person.birthdate;
      this.phoneNumber = person.phoneNumber;
      this.nationality = person.nationality;
      this.countryOfResidence = person.countryOfResidence;
  }
}
