import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SpaceService } from '../_services/index';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountManagerComponent } from './account-manager.component';
import { AccountManagerRoutingModule } from './account-manager-routing.module';

import { ResetPasswordModule } from './reset-password/reset-password.module';

import { RegisterFormReactiveComponent } from './register/form/register-form-reactive.component';
import { RegisterModalComponent } from './register/modal/register-modal.component';
import { RegisterButtonComponent } from './register/button/register-button.component';

import { LoginFormReactiveComponent } from './login/form/login-form-reactive.component';
import { LoginModalComponent } from './login/modal/login-modal.component';
import { LoginButtonComponent } from './login/button/login-button.component';

@NgModule({
    bootstrap: [
        AccountManagerComponent
    ],
  imports: [
        SharedModule,
        ReactiveFormsModule,
        AccountManagerRoutingModule,
        ResetPasswordModule
    ],
  declarations: [
      AccountManagerComponent,
      RegisterFormReactiveComponent,
      RegisterModalComponent,
      RegisterButtonComponent,
      LoginModalComponent,
      LoginButtonComponent,
      LoginFormReactiveComponent
    ],
  exports: [ AccountManagerComponent, RegisterButtonComponent, LoginButtonComponent, LoginFormReactiveComponent, RegisterFormReactiveComponent, RegisterModalComponent ],
  entryComponents: [ RegisterModalComponent, LoginModalComponent ],
  providers:    [
      SpaceService
    ]
})
export class AccountManagerModule { }
