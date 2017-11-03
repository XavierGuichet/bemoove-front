import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
MatProgressSpinnerModule } from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterFormReactiveComponent } from './register-form-reactive.component';

@NgModule({
  imports:      [
      SharedModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatInputModule,
      MatProgressSpinnerModule,
      MatDialogModule // TODO delete me ?
  ],
  declarations: [ RegisterFormReactiveComponent ],
  exports:      [ RegisterFormReactiveComponent ]
})
export class RegisterFormReactiveModule {}
