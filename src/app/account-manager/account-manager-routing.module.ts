import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountManagerComponent } from './account-manager.component';
import { ResetPasswordModule } from './reset-password/reset-password.module';

import { SpaceService } from '../_services/space.service';

@NgModule({
  imports: [RouterModule.forChild([
    {
    path: 'account',
    component: AccountManagerComponent,
    children: [
        { path: '', loadChildren : () => ResetPasswordModule },
    ]
  }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class AccountManagerRoutingModule {}
