import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';
import { ActivatedRoute, Params } from '@angular/router';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../../_services/index';

@Component({
  selector: 'set-password-form',
  templateUrl: 'set-password.component.html',
  styleUrls: ['../../../form.component.scss', '../../../center-container.component.scss']
})
export class SetPasswordFormComponent extends BMReactFormComponent implements OnInit {
  @Output()
  public onSuccess = new EventEmitter<boolean>();

  public setPasswordForm: FormGroup;
  public showpassword: boolean = false;
  public loading = false;

  public formErrors = {
    email: ''
  };

  public validationMessages = {
    password: {
      required: 'Name is required.',
      email: 'Une adresse mail valide est nécessaire.'
    }
  };

  private token: string;

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute) {
        super();
     }

  public ngOnInit(): void {
      this.token = this.route.snapshot.paramMap.get('token');
      this.buildForm();
  }

  public passwordToggle() {
    this.showpassword = !this.showpassword;
  }

  public onSubmit() {
    this.loading = true;
    let model = this.createObjectFromModel();
    model.token = this.token;
    this.authenticationService.changePassword(model)
      .then(
      (data) => {
          // TODO add alert & change location ?
      }
      );
  }

  protected buildForm(): void {
    this.setPasswordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.email
      ]
      ]
    });

    this.setPasswordForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.setPasswordForm, data));

    this.onValueChanged(this.setPasswordForm); // (re)set validation messages now
  }

  protected createNestedEntities(model: any): Promise<void> {
    return Promise.resolve(null);
  }

  protected createObjectFromModel() {
    return this.setPasswordForm.value;
  }

}
