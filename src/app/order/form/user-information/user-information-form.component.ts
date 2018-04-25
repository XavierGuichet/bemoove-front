import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Address, Person } from '../../../models/index';
import { AddressService, PersonService } from '../../../_services/index';

@Component({
  selector: 'user-information-form',
  templateUrl: './user-information-form.component.html'
})

export class UserInformationFormComponent extends BMReactFormComponent implements OnInit {
    @Output()
    public onSuccess = new EventEmitter<boolean>();
    @Input()
    public person: Person;

    public userInformationForm: FormGroup;
    public formReady: boolean = false;

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
        countryOfResidence: '',
        nationality: '',
        phoneNumber: '',
        birthdate: '',
        address: {
            firstline: '',
            secondline: '',
            postalCode: '',
            city: ''
        }
    };

    public validationMessages = {
      'firstname': '',
      'lastname': '',
      'nationality': '',
      'countryOfResidence': '',
      'phoneNumber': '',
      'birthdate': {
        required: 'Veuillez indiquer votre date de naissance.',
      },
      'address.firstline': '',
      'address.secondline': '',
      'address.postalCode': '',
      'address.city': ''
    };

    public countries = [ {name: 'France'} ];

    constructor(
        private fb: FormBuilder,
        private personService: PersonService,
        private addressService: AddressService,
        private ngbDateParserFormatter: NgbDateParserFormatter
    ) {
        super();
    }

    public ngOnInit() {
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
        .then((resPerson) => {
          this.loading = false;
          this.showFormResult('success', 'Sauvegarde réussie');
          if (resPerson[0].hasOwnProperty('id')) {
              this.person = resPerson[0];
          } else {
              this.person = resPerson[1];
          }
          this.onSuccess.emit(true);
        })
        .catch(this.handleError);
    }

    public createNestedEntities(person: Person): Promise<Person> {
      let Promises: any[] = new Array();

      if (person.hasOwnProperty('address')) {
        Promises.push(this.addressService.update(person.address).then((address) => person.address = address));
      }

      if (person.address) {
        return Promise.all(Promises).then(() => {
          return person;
        });
      } else {
        return Promise.resolve(person);
      }
    }

    protected buildForm() {
        this.userInformationForm = this.fb.group({
            firstname: [this.person.firstname, [
              Validators.required
            ]
            ],
            lastname: [this.person.lastname, [
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
            phoneNumber: [this.person.phoneNumber],
            address: this.fb.group({
                firstline: [this.person.address.firstline],
                secondline: [this.person.address.secondline],
                postalCode: [this.person.address.postalCode],
                city: [this.person.address.city]
            })
        });

        this.userInformationForm.valueChanges
          .subscribe((data) => this.onValueChanged(this.userInformationForm, data));

        this.onValueChanged(this.userInformationForm); // (re)set validation messages now

        this.formReady = true;
    }

    protected createObjectFromModel(): Person {
        const form = this.userInformationForm;
        const formModel = this.userInformationForm.value;

        const person = new Person();
        if (this.person.id) {
          person.id = this.person.id;
        }

        if (form.get('firstname').dirty) {
            person.firstname = formModel.firstname;
        }
        if (form.get('lastname').dirty) {
            person.lastname = formModel.lastname;
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
        if (form.get('phoneNumber').dirty) {
            person.phoneNumber = formModel.phoneNumber;
        }
        if (form.get('address').dirty) {
          person.address = new Address();
          person.address.id = this.person.address.id;
          person.address.firstline = formModel.address.firstline;
          person.address.secondline = formModel.address.secondline;
          person.address.city = formModel.address.city;
          person.address.postalCode = formModel.address.postalCode;
        }

        return person;
    }

    private missingUserInformation() {
        if (this.person.firstname === null || this.person.firstname.length === 0) {
            return true;
        }
        if (this.person.lastname === null || this.person.lastname.length === 0) {
            return true;
        }
        if (this.person.nationality === null || this.person.nationality.length === 0) {
            return true;
        }
        if (this.person.phoneNumber === null || this.person.phoneNumber.length === 0) {
            return true;
        }
        if (this.person.address === null) {
            return true;
        }
        if (this.person.address.firstline === null || this.person.address.firstline.length === 0) {
            return true;
        }
        if (this.person.address.postalCode === null || this.person.address.postalCode.length === 0) {
            return true;
        }
        if (this.person.address.city === null || this.person.address.city.length === 0) {
            return true;
        }
        return false;
    }
}
