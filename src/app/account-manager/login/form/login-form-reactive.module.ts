import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { LoginFormReactiveComponent } from './login-form-reactive.component';

@NgModule({
    imports:      [
        SharedModule,
        ReactiveFormsModule
    ],
  declarations: [ LoginFormReactiveComponent ],
  exports:      [ LoginFormReactiveComponent ]
})
export class LoginFormReactiveModule {}
