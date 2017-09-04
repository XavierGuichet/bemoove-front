import { Person } from '../../models/person';

export class PersonApi {
  public id: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public birthdate: Date;

  constructor(person: Person) {
      this.id = person.id;
      this.firstname = person.firstname;
      this.lastname = person.lastname;
      this.email = person.email;
      this.birthdate = person.birthdate;
  }
}
