import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';

import { RouterModule, Routes } from '@angular/router';

import { PartnerNavSecondaryComponent } from './nav-secondary.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    RouterModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    PartnerNavSecondaryComponent
  ],
  exports: [
    PartnerNavSecondaryComponent
  ]
})

export class PartnerNavSecondaryModule { }
