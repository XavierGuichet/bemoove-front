import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule }              from '../../shared/shared.module';
import { SubscribeFormReactiveComponent } from '../../form/subscribe/subscribe-form-reactive.component';

@NgModule({
  imports:      [ SharedModule, ReactiveFormsModule ],
  declarations: [ SubscribeFormReactiveComponent ],
  exports:      [ SubscribeFormReactiveComponent ]
})
export class SubscribeFormReactiveModule {}
