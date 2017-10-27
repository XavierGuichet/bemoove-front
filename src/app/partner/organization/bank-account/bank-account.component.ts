import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Address, BankAccount } from '../../../models/index';

import { SpaceService, AddressService, BankAccountService } from '../../../_services/index';

@Component({
  selector: 'bank-account',
  templateUrl: 'bank-account.component.html'
})

export class BankAccountComponent extends BMReactFormComponent implements OnInit {
        public formResult: any;
        public loading: boolean;
        public formReady: boolean = false;

  public bankAccountForm: FormGroup;
  public bankAccount: BankAccount;
  public limitedBankAccount: BankAccount;

  public formErrors = {
    ownerName: '',
    address: {
      firstline: '',
      secondline: '',
      city: '',
      postalCode: ''
    },
    iban: '',
  };

  public validationMessages = {
    'ownerName': {
      required: 'Le nom du propriétaire du compte est obligatoire.',
    },
    'address.firstline': {
      required: 'Une adresse est requise.',
    },
    'address.secondline': {
    },
    'address.city': {
      required: 'La ville est nécessaire.',
    },
    'address.postalCode': {
      required: 'Le code postal est réquis.',
    },
    'iban': {
      required: 'Veuillez entrez votre IBAN.',
    }
  };

  constructor(
    private fb: FormBuilder,
    private bankAccountService: BankAccountService,
    private router: Router,
    private spaceService: SpaceService,
    private addressService: AddressService,
  ) {
      super();
  }

  public ngOnInit(): void {
    this.bankAccountService.getMyBankAccount()
                            .then((bankAccount) => {
                                this.bankAccount = bankAccount;
                                this.buildForm();
                            });
  }

  public onSubmit(): void {
      this.loading = true;

      let bankAccount = this.createObjectFromModel();

      this.createNestedEntities(bankAccount).then(
          (bankAccountWithCreatedNestedEntities) => {
              return Promise.all([
                  bankAccountWithCreatedNestedEntities,
                  this.createOrUpdate(this.bankAccountService, bankAccountWithCreatedNestedEntities)
              ]);
          })
          .then( (result) => {
              this.loading = false;
              this.showFormResult('success', 'Sauvegarde réussie');
          })
          .catch( this.handleError );
        //   this.showFormResult('error', 'Echec de la sauvegarde');

  }

  public createNestedEntities(bankAccount: BankAccount): Promise<BankAccount> {
    let Promises: any[] = new Array();

    if (bankAccount.hasOwnProperty('address')) {
      Promises.push(this.addressService.create(bankAccount.address).then((address) => bankAccount.address = address));
    }

    if (bankAccount.address) {
      return Promise.all(Promises).then(() => {
          return bankAccount;
      });
    } else {
      return Promise.resolve(bankAccount);
    }
  }

  protected buildForm(): void {
    this.bankAccountForm = this.fb.group({
      ownerName: [this.bankAccount.ownerName, [
        Validators.required,
      ]
      ],
      address: this.fb.group({
        firstline: [this.bankAccount.address.firstline, [
          Validators.required,
        ]
        ],
        secondline: [this.bankAccount.address.secondline, [
        ]
        ],
        city: [this.bankAccount.address.city, [
          Validators.required,
        ]
        ],
        postalCode: [this.bankAccount.address.postalCode, [
          Validators.required,
        ]
        ]
      }),
      iban: [this.bankAccount.iban, [
        Validators.required,
      ]
      ],
    });

    this.bankAccountForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.bankAccountForm, data));

    // (re)set validation messages.
    this.onValueChanged(this.bankAccountForm);
  }

  protected createObjectFromModel(): BankAccount {
      const form = this.bankAccountForm;
      const formModel = this.bankAccountForm.value;

      const bankAccount = new BankAccount();
      if (this.bankAccount.id) {
        bankAccount.id = this.bankAccount.id;
      }

      if (form.get('ownerName').dirty) {
        bankAccount.ownerName = formModel.ownerName;
      }
      if (form.get('address').dirty) {
        bankAccount.address = new Address();
        bankAccount.address.firstline = formModel.address.firstline;
        bankAccount.address.secondline = formModel.address.secondline;
        bankAccount.address.city = formModel.address.city;
        bankAccount.address.postalCode = formModel.address.postalCode;
      }
      if (form.get('iban').dirty) {
        bankAccount.iban = formModel.iban;
      }

      return bankAccount;
  }
}
