import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { SpaceService } from '../../_services/index';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';

import { ResetPasswordComponent } from './reset-password.component';
import { GetResetPasswordTokenFormComponent } from './form/get-reset-password-token/get-reset-password-token.component';
import { SetPasswordFormComponent } from './form/set-password/set-password.component';

@NgModule({
    bootstrap: [
        ResetPasswordComponent
    ],
  imports: [
        SharedModule,
        ReactiveFormsModule,
        ResetPasswordRoutingModule
    ],
  declarations: [
      ResetPasswordComponent,
      GetResetPasswordTokenFormComponent,
      SetPasswordFormComponent
    ],
  exports: [ ],
  entryComponents: [ ],
  providers:    [
      SpaceService
    ]
})
export class ResetPasswordModule { }
