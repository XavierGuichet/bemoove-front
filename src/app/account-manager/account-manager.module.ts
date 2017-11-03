import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    MatButtonModule,
    MatDialogModule } from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';

import { RegisterFormReactiveModule } from './register/form/register-form-reactive.module';
import { RegisterModalComponent } from './register/modal/register-modal.component';
import { RegisterButtonComponent } from './register/button/register-button.component';
import { LoginFormReactiveModule } from './login/form/login-form-reactive.module';
import { LoginModalComponent } from './login/modal/login-modal.component';
import { LoginButtonComponent } from './login/button/login-button.component';

@NgModule({
    bootstrap: [

    ],
  imports: [
        SharedModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        MatDialogModule,
        MatButtonModule,
        RegisterFormReactiveModule,
        LoginFormReactiveModule
    ],
  declarations: [
      RegisterModalComponent,
      RegisterButtonComponent,
      LoginModalComponent,
      LoginButtonComponent
    ],
  exports: [ RegisterButtonComponent, LoginButtonComponent, RegisterFormReactiveModule ],
  entryComponents: [ RegisterModalComponent, LoginModalComponent ],
  providers:    [

    ]
})
export class AccountManagerModule { }
