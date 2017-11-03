import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material.module';

@NgModule({
  imports:      [ CommonModule, CustomMaterialModule ],
  declarations: [  ],
  exports:      [
      CommonModule, CustomMaterialModule
       ]
})
export class SharedModule { }
