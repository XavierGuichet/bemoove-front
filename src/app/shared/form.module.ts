import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2CompleterModule } from 'ng2-completer';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@NgModule({
  imports:      [ CommonModule, FormsModule, ReactiveFormsModule, Ng2CompleterModule ],
  declarations: [ ImageCropperComponent ],
  exports:      [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      Ng2CompleterModule,
      ImageCropperComponent
       ]
})
export class BmFormModule { }
