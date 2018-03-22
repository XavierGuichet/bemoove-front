import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RouterModule, Routes } from '@angular/router';

import { NavPrimaryComponent } from './primary/nav-primary.component';
import { NavSecondaryComponent } from './secondary/nav-secondary.component';

export { Link } from './link.model';

@NgModule({
  bootstrap: [
  ],
  declarations: [
      NavPrimaryComponent,
      NavSecondaryComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
      NavPrimaryComponent,
      NavSecondaryComponent
  ],
  entryComponents: [
  ],
  providers: []
})
export class NavModule { }
