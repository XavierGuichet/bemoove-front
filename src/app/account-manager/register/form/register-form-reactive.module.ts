import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { RegisterFormReactiveComponent } from './register-form-reactive.component';

@NgModule({
  imports:      [
      SharedModule,
      ReactiveFormsModule
  ],
  declarations: [ RegisterFormReactiveComponent ],
  exports:      [ RegisterFormReactiveComponent ]
})
export class RegisterFormReactiveModule {}
