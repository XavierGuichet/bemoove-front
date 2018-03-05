import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
    DomSanitizer,
    SafeHtml,
    SafeUrl,
    SafeStyle
} from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';

import {
    Address,
    Cart,
    Coach,
    Person,
    Workout,
    WorkoutInstance } from '../../../models/index';

import {
    AddressService,
    CartService,
    ProfileService,
    WorkoutService,
    PersonService,
    WorkoutInstanceService } from '../../../_services/index';

@Component({
  selector: 'user-information-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-information-form.component.html',
  // styleUrls: [ './workout-details.component.scss']
})

export class UserInformationFormComponent extends BMReactFormComponent implements OnInit {
    @Output()
    public onSuccess = new EventEmitter<boolean>();
    public userInformationForm: FormGroup;
    public formReady: boolean = false;
    public person: Person;

    public formErrors = {
        firstname: '',
        lastname: '',
        nationality: '',
        phoneNumber: '',
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
      'phoneNumber': '',
      'address.firstline': '',
      'address.secondline': '',
      'address.postalCode': '',
      'address.city': ''
    };

    public countries = [ {name: 'France'} ];

    constructor(
        private fb: FormBuilder,
        private personService: PersonService,
        private addressService: AddressService
    ) {
        super();
    }

    public ngOnInit() {
        this.personService.getMyPerson().then((person) => {
          this.person = person;
          if (this.missingUserInformation()) {
              this.buildForm();
          } else {
              this.onSuccess.emit(true);
          }
        });
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
            this.person = person;
              if (this.missingUserInformation()) {
                  this.showFormResult('warning', 'Missing informations');
              } else {
                  this.onSuccess.emit(true);
              }
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
            firstname: [this.person.firstname],
            lastname: [this.person.lastname],
            nationality: [this.person.nationality],
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
        if (form.get('nationality').dirty) {
            person.nationality = formModel.nationality;
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
