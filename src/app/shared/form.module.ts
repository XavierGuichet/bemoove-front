import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2CompleterModule } from 'ng2-completer';
import { ImageUploadModule } from 'angular2-image-upload';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
// import { ForbiddenValidatorDirective } from './forbidden-name.directive';
// import { SubmittedComponent }          from './submitted.component';

@NgModule({
  imports:      [ CommonModule, FormsModule, ReactiveFormsModule, Ng2CompleterModule, ImageUploadModule ],
  declarations: [ ImageCropperComponent ],
  exports:      [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      Ng2CompleterModule,
      ImageUploadModule,
      ImageCropperComponent
       ]
})
export class BmFormModule { }
// //
//
// NgbDatepickerI18n,
// CustomDatepickerI18n,
// ,
