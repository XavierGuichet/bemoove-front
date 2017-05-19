import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule,
    MdButtonModule,
    MdDialogModule,
MdProgressSpinnerModule } from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { LoginFormReactiveComponent } from './login-form-reactive.component';

@NgModule({
    imports:      [
        SharedModule,
        ReactiveFormsModule,
        MdButtonModule,
        MdProgressSpinnerModule,
        MdDialogModule // TODO delete me ?
    ],
  declarations: [ LoginFormReactiveComponent ],
  exports:      [ LoginFormReactiveComponent ]
})
export class LoginFormReactiveModule {}
