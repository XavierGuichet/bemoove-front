import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { RegexpValidator } from '../../../../_directives/regexp.directive';

import { Person } from '../../../../models/index';
import { PersonService } from '../../../../_services/index';

@Component({
  selector: 'legalrepresentative-form',
  templateUrl: './legalrepresentative-form.component.html'
})

export class LegalRepresentativeFormComponent implements OnInit {
  @Input()
  public person: Person;
  public limitedPerson: Person;

  public loading: boolean = false;
  public personForm: FormGroup;
  public formErrors = {
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '',
  };

  public validationMessages = {
    firstname: {
      required: 'startdate is required.',
    },
    lastname: {
      required: 'Veuillez choisir une adresse.',
    },
    email: {
      required: 'Une adresse mail est requise.',
      regexpvalidatorphrase: 'Une adresse mail valide est nécessaire.'
    },
    birthdate: {
      required: 'Veuillez choisir une adresse.',
    }
  };

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {

  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(): void {
      this.loading = true;

      this.limitedPerson = this.prepareLimitedPerson();

      this.personService.update( this.limitedPerson )
                                 .subscribe((person) => {
                                     this.person = person;
                                     this.loading = false;
                                 });
  }

  private prepareLimitedPerson(): Person {
      const form = this.personForm;
      const formModel = this.personForm.value;
      let limitedPerson = new Person();

      if (this.person.id) {
        limitedPerson.id = this.person.id;
      }
      if (form.get('firstname').dirty) {
        limitedPerson.firstname = formModel.firstname;
      }
      if (form.get('lastname').dirty) {
        limitedPerson.lastname = formModel.lastname;
      }
      if (form.get('email').dirty) {
        limitedPerson.email = formModel.email;
      }
      if (form.get('birthdate').dirty) {
        limitedPerson.birthdate = new Date(this.ngbDateParserFormatter.format(formModel.birthdate));
      }

    return limitedPerson;
  }

  private buildForm(): void {
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
      birthdate: [this.ngbDateParserFormatter.parse(this.person.birthdate.toISOString()), [
        Validators.required
      ]
      ],
    });

    this.personForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.personForm, data));

    // (re)set validation messages.
    this.onValueChanged(this.personForm);
  }

  private onValueChanged(form, data?: any): void {
    const formErrors = this.formErrors;
    this.formErrors = this.recursiveCheck(form, formErrors);
  }

  private recursiveCheck(form, formErrors, validationprefix = '') {
    if (validationprefix !== '') {
      validationprefix += '.';
    }
    for (const field in formErrors) {
      if (typeof formErrors[field] === 'string') {
        const control = form.get(validationprefix + field);
        formErrors[field] = this.checkControlError(control, validationprefix + field);
      } else if (typeof this.formErrors[field] === 'object') {
        let prefix = validationprefix + field;
        formErrors[field] = this.recursiveCheck(this.formErrors[field], prefix);
      }
    }
    return formErrors;
  }

  private checkControlError(control, field) {
    let errorMessages = '';
    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          errorMessages += messages[key] + ' ';
        }
      }
    }
    return errorMessages;
  }
}
