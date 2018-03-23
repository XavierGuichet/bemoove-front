import { Component, OnInit } from '@angular/core';

import { Person } from '../../../models/index';

import { PersonService } from '../../../_services/index';

@Component({
  selector: 'contact-information',
  templateUrl: 'contact-information.component.html'
})

export class ContactInformationComponent implements OnInit {
    public person: Person;
    constructor(
      private personService: PersonService
    ) { }

    public ngOnInit(): void {
        this.personService.getMyPerson()
              .then((person) => {
                  this.person = person;
                  console.log(person);
              });
    }
}
