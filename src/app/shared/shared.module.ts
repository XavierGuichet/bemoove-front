import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports:      [ CommonModule, CustomMaterialModule, NgbModule ],
  declarations: [  ],
  exports:      [
      CommonModule,
      CustomMaterialModule,
      NgbModule
       ]
})
export class SharedModule { }
