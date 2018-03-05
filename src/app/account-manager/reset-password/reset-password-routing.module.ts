import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResetPasswordComponent } from './reset-password.component';
import { GetResetPasswordTokenFormComponent } from './form/get-reset-password-token/get-reset-password-token.component';
import { SetPasswordFormComponent } from './form/set-password/set-password.component';

import { SpaceService } from '../../_services/space.service';

@NgModule({
    imports: [RouterModule.forChild([
      {
          path: 'recover',
          component: ResetPasswordComponent,
          children: [
              { path: 'request', component: GetResetPasswordTokenFormComponent },
              { path: 'set-new-password/:token', component: SetPasswordFormComponent }
            ]
          }
    ])],
  providers: [SpaceService],
  exports: [RouterModule]
})

export class ResetPasswordRoutingModule {
}
