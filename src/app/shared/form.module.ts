import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BMImageInputComponent } from '../form/bm-image-input/bm-image-input.component';

import { Ng2CompleterModule } from 'ng2-completer';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@NgModule({
  imports:      [ CommonModule, FormsModule, ReactiveFormsModule, Ng2CompleterModule ],
  declarations: [ ImageCropperComponent, BMImageInputComponent ],
  exports:      [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      Ng2CompleterModule,
      ImageCropperComponent,
      BMImageInputComponent
       ]
})
export class BmFormModule { }
