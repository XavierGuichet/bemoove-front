import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { RegexpValidator } from '../../../../_directives/regexp.directive';

import { Person } from '../../../../models/index';
import { PersonService } from '../../../../_services/index';

@Component({
  selector: 'legal-representative-form',
  templateUrl: './legalrepresentative-form.component.html'
})

export class LegalRepresentativeFormComponent extends BMReactFormComponent implements OnInit {
  public formResult: any;
  public loading: boolean;
  public formReady: boolean = false;

  public personForm: FormGroup;
  @Input()
  public person: Person;

  public minBirthDate: { year: number, month: number, day: number } = {
    year: 1900,
    month: 1,
    day: 1
  };
  public maxBirthDate: { year: number, month: number, day: number };
  public nbgBirthdate: { year: number, month: number};

  public formErrors = {
    firstname: '',
    lastname: '',
    email: '',
    countryOfResidence: '',
    nationality: '',
    birthdate: ''
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
    countryOfResidence: '',
    nationality: '',
    birthdate: {
      required: 'Veuillez indiquer la date de naissance du representant légal.',
    }
  };

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {
    super();
  }

  public ngOnInit(): void {
    let now = new Date();
    let maxbirthDate = new Date(now.getTime() - 18 * 365 * 24 * 60 * 60 * 1000);
    this.maxBirthDate = this.ngbDateParserFormatter.parse(new Date(maxbirthDate).toISOString());
    this.nbgBirthdate = this.ngbDateParserFormatter.parse(new Date(this.person.birthdate).toISOString());

    this.buildForm();
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
      .then((result) => {
        this.loading = false;
        this.showFormResult('success', 'Sauvegarde réussie');
      })
      .catch(this.handleError);
    //   this.showFormResult('error', 'Echec de la sauvegarde');
  }

  protected buildForm(): void {
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
      countryOfResidence: [this.person.countryOfResidence, [
        Validators.required
      ]
      ],
      nationality: [this.person.nationality, [
        Validators.required
      ]
    ],
      birthdate: [this.ngbDateParserFormatter.parse(new Date(this.person.birthdate).toISOString()), [
        Validators.required
      ]
      ],
    });

    this.personForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.personForm, data));

    // (re)set validation messages.
    this.onValueChanged(this.personForm);

    this.formReady = true;
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
    if (form.get('firstname').dirty) {
      person.firstname = formModel.firstname;
    }
    if (form.get('lastname').dirty) {
      person.lastname = formModel.lastname;
    }
    if (form.get('email').dirty) {
      person.email = formModel.email;
    }
    if (form.get('nationality').dirty) {
        person.nationality = formModel.nationality;
    }
    if (form.get('countryOfResidence').dirty) {
        person.countryOfResidence = formModel.countryOfResidence;
    }
    if (form.get('birthdate').dirty) {
      person.birthdate = new Date(this.ngbDateParserFormatter.format(formModel.birthdate));
    }

    return person;
  }
}
