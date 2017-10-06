import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Address, BankAccount } from '../../../models/index';

import { SpaceService, AddressService, BankAccountService } from '../../../_services/index';

@Component({
  selector: 'bank-account',
  templateUrl: 'bank-account.component.html'
})

export class BankAccountComponent implements OnInit {
  public loading = false;

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
  }

  public ngOnInit(): void {
    this.bankAccountService.getByOwnerId(this.spaceService.getUserId()).then((bankAccount) => {
        // TODO : This is ugly, service should return one result in this case
      if (bankAccount[0].hasOwnProperty('id')) {
        this.bankAccount = bankAccount[0];
      } else {
        this.bankAccount = new BankAccount();
        this.bankAccount.address = new Address();
      }
      this.buildForm();
    });
  }

  public onSubmit(): void {
    this.limitedBankAccount = this.prepareLimitedBankAccount();
    this.createRelatedEntities(this.limitedBankAccount).subscribe(() => {
      let request;
      this.loading = true;
      if (this.limitedBankAccount.id) {
        request = this.bankAccountService.update(this.limitedBankAccount);
      } else {
        request = this.bankAccountService.create(this.limitedBankAccount);
      }
      request.subscribe((bankAccount) => { this.bankAccount = bankAccount; this.loading = false; });
    });
  }

  public createRelatedEntities(limitedBankAccount) {
    let ObservableOfCreation: any[] = new Array();

    if (this.limitedBankAccount.hasOwnProperty('address')) {
      ObservableOfCreation.push(this.addressService.create(this.limitedBankAccount.address).map((address) => this.limitedBankAccount.address.id = address.id));
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

  private onValueChanged(data?: any): void {
    if (!this.bankAccountForm) { return; }

    const formErrors = this.formErrors;
    this.formErrors = this.recursiveCheck(formErrors);
  }

  private recursiveCheck(formErrors, validationprefix = '') {
    const form = this.bankAccountForm;
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
      .subscribe((data) => this.onValueChanged(data));

    // (re)set validation messages.
    this.onValueChanged();
  }
}
