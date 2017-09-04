import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
MdProgressSpinnerModule } from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterFormReactiveComponent } from './register-form-reactive.component';

@NgModule({
  imports:      [
      SharedModule,
      ReactiveFormsModule,
      MdButtonModule,
      MdInputModule,
      MdProgressSpinnerModule,
      MdDialogModule // TODO delete me ?
  ],
  declarations: [ RegisterFormReactiveComponent ],
  exports:      [ RegisterFormReactiveComponent ]
})
export class RegisterFormReactiveModule {}