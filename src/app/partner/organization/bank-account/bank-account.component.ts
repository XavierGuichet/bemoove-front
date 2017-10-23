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
      required: 'startdate is required.',
    },
    'address.firstline': {
      required: 'firstline is required.',
    },
    'address.secondline': {
    },
    'address.city': {
      required: 'city est nécessaire.',
    },
    'address.postalCode': {
      required: 'postalCode est réquise.',
    },
    'address.other.item1': {
      required: 'blabla',
    },
    'iban': {
      required: 'Veuillez choisir une adresse.',
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
    this.bankAccountService.getMyBankAccount().then((bankAccount) => {
        this.bankAccount = bankAccount;
        this.buildForm();
    });
  }

  public onSubmit(): void {
    this.limitedBankAccount = this.prepareLimitedBankAccount();
    this.createRelatedEntities(this.limitedBankAccount).subscribe(() => {
      let request;
      this.loading = true;
      this.hideFormResult();
        request = this.bankAccountService.update(this.limitedBankAccount).then(
          (bankAccount) => {
              this.bankAccount = bankAccount;
              this.loading = false;
              this.showFormResult('success', 'Sauvegarde réussie');
              },
              (error) => {
                 this.showFormResult('error', 'Echec de la sauvegarde');
                 this.loading = false;
              });
    });
  }

  public createRelatedEntities(limitedBankAccount) {
    let ObservableOfCreation: any[] = new Array();

    if (this.limitedBankAccount.hasOwnProperty('address')) {
      ObservableOfCreation.push(this.addressService.create(this.limitedBankAccount.address).then((address) => this.limitedBankAccount.address.id = address.id));
    }

    if (this.bankAccount.address) {
      return Observable.forkJoin(ObservableOfCreation).map(() => true);
    } else {
      return Observable.empty();
    }
  }

  private prepareLimitedBankAccount(): BankAccount {
    const form = this.bankAccountForm;
    const formModel = this.bankAccountForm.value;

    const limitedBankAccount: BankAccount = new BankAccount();
    if (this.bankAccount.id) {
      limitedBankAccount.id = this.bankAccount.id;
    }
    if (form.get('ownerName').dirty) {
      limitedBankAccount.ownerName = formModel.ownerName;
    }
    if (form.get('address').dirty) {
      limitedBankAccount.address = new Address();
      limitedBankAccount.address.firstline = formModel.address.firstline;
      limitedBankAccount.address.secondline = formModel.address.secondline;
      limitedBankAccount.address.city = formModel.address.city;
      limitedBankAccount.address.postalCode = formModel.address.postalCode;
    }
    if (form.get('iban').dirty) {
      limitedBankAccount.iban = formModel.iban;
    }
    return limitedBankAccount;
  }

  private buildForm(): void {
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
}
