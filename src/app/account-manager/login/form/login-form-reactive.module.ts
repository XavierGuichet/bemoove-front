import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
    MatButtonModule,
    MatDialogModule,
MatProgressSpinnerModule } from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { LoginFormReactiveComponent } from './login-form-reactive.component';

@NgModule({
    imports:      [
        SharedModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDialogModule // TODO delete me ?
    ],
  declarations: [ LoginFormReactiveComponent ],
  exports:      [ LoginFormReactiveComponent ]
})
export class LoginFormReactiveModule {}
