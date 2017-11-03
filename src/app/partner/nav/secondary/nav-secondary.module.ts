import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';

import { PartnerNavSecondaryComponent } from './nav-secondary.component';

@NgModule({
  imports: [
    SharedModule,
    NgbModule.forRoot(),
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
