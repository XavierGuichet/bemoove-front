import { Component, OnInit } from '@angular/core';

import { Person } from '../../../models/index';

import { PersonService } from '../../../_services/index';

@Component({
  selector: 'profile-identity',
  templateUrl: 'identity.component.html'
})

export class IdentityComponent implements OnInit {
    public person: Person;
    constructor(
      private personService: PersonService
    ) { }

    public ngOnInit(): void {
        this.personService.getMyPerson()
              .then((person) => this.person = person);
    }
}
