import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../../_services/index';

@Component({
  selector: 'get-reset-password-token',
  templateUrl: 'get-reset-password-token.component.html',
  styleUrls: ['../../../form.component.scss', '../../../center-container.component.scss']
})
export class GetResetPasswordTokenFormComponent extends BMReactFormComponent implements OnInit {
  @Output()
  public onSuccess = new EventEmitter<boolean>();

  public getResetTokenForm: FormGroup;

  public formErrors = {
    email: ''
  };

  public validationMessages = {
    email: {
      required: 'Veuillez entrer votre adresse mail.',
      email: 'Une adresse mail valide est nécessaire.'
    }
  };

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {
        super();
     }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit() {
    this.loading = true;
    let model = this.createObjectFromModel();
    this.authenticationService.getResetPasswordToken(model)
      .then(
      (data) => {
          // TODO add alert & change location ?
      }
      );
  }

  protected buildForm(): void {
    this.getResetTokenForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]
      ]
    });

    this.getResetTokenForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.getResetTokenForm, data));

    this.onValueChanged(this.getResetTokenForm); // (re)set validation messages now
  }

  protected createNestedEntities(model: any): Promise<void> {
    return Promise.resolve(null);
  }

  protected createObjectFromModel() {
    return this.getResetTokenForm.value;
  }

}
