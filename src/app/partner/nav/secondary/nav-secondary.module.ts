import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { RouterModule, Routes } from '@angular/router';

import { PartnerNavSecondaryComponent } from './nav-secondary.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    PartnerNavSecondaryComponent
  ],
  exports: [
    PartnerNavSecondaryComponent
  ]
})

export class PartnerNavSecondaryModule { }
