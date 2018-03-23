import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Person } from '../../../../models/index';
import { PersonService } from '../../../../_services/index';

@Component({
  selector: 'identity-form',
  templateUrl: './identity-form.component.html'
})

export class IdentityFormComponent extends BMReactFormComponent implements OnInit {
  @Input()
  public person: Person;

  public personForm: FormGroup;
  public loading = false;
  public submitted = false;

  public minBirthDate: { year: number, month: number, day: number } = {
    year: 1900,
    month: 1,
    day: 1
  };
  public maxBirthDate: { year: number, month: number, day: number };
  public nbgBirthdate: { year: number, month: number, day: number };

  public formErrors = {
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '',
    countryOfResidence: '',
    nationality: ''
  };

  public validationMessages = {
    firstname: {
      required: 'Un prénom est requis.',
    },
    lastname: {
      required: 'Un nom est requis.',
    },
    email: {
      required: 'Une adresse mail est requise.',
      regexpvalidatorphrase: 'Une adresse mail valide est nécessaire.'
    },
    birthdate: {
      required: 'Veuillez indiquer votre date de naissance.',
      },
      countryOfResidence: '',
      nationality: ''
  };

  constructor(
    private personService: PersonService,
    private fb: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {
    super();
  }

  public ngOnInit(): void {
    let now = new Date();
    let maxbirthDate = new Date(now.getTime() - 18 * 365 * 24 * 60 * 60 * 1000);
    this.maxBirthDate = {
      year: maxbirthDate.getFullYear(),
      month: maxbirthDate.getMonth() + 1,
      day: maxbirthDate.getDate()
    };
    this.buildForm();
  }

  public buildForm(): void {
      this.personForm = this.fb.group({
        firstname: [this.person.firstname, [
          Validators.required
        ]
        ],
        lastname: [this.person.lastname, [
          Validators.required
        ]
        ],
        email: [this.person.email, [
          Validators.required
        ]
        ],
        birthdate: [this.ngbDateParserFormatter.parse(new Date(this.person.birthdate).toISOString()), [
          Validators.required
        ]
        ],
        countryOfResidence: [this.person.countryOfResidence],
        nationality: [this.person.nationality]
      });

      this.personForm.valueChanges
        .subscribe((data) => this.onValueChanged(this.personForm, data));

      // (re)set validation messages.
      this.onValueChanged(this.personForm);

      this.formReady = true;
  }

  public onSubmit(): void {
    this.loading = true;
    this.hideFormResult();

    let person = this.createObjectFromModel();

    this.createNestedEntities(person).then(
      (personWithCreatedNestedEntities) => {
        return Promise.all([
          personWithCreatedNestedEntities,
          this.createOrUpdate(this.personService, personWithCreatedNestedEntities)
        ]);
      })
      .then((resPerson) => {
        this.loading = false;
        this.showFormResult('success', 'Sauvegarde réussie');
        let coachId;
        if (resPerson[0].hasOwnProperty('id')) {
            this.person = resPerson[0];
        } else {
            this.person = resPerson[1];
        }
      })
      .catch(this.handleError);
  }

  protected createNestedEntities(person: Person): Promise<Person> {
    return Promise.resolve(person);
  }

  protected createObjectFromModel(): Person {
    const form = this.personForm;
    const formModel = this.personForm.value;
    let person = new Person();

    if (this.person.id) {
      person.id = this.person.id;
    }
    // limitedProfile.ismale = (formModel.gender === 'men' ? true : false);
    if (form.get('firstname').dirty) {
      person.firstname = formModel.firstname;
    }
    if (form.get('lastname').dirty) {
      person.lastname = formModel.lastname;
    }
    if (form.get('email').dirty) {
      person.email = formModel.email;
    }
    if (form.get('birthdate').dirty) {
      person.birthdate = new Date(this.ngbDateParserFormatter.format(formModel.birthdate));
    }
    if (form.get('nationality').dirty) {
        person.nationality = formModel.nationality;
    }
    if (form.get('countryOfResidence').dirty) {
        person.countryOfResidence = formModel.countryOfResidence;
    }

    return person;
  }


}
