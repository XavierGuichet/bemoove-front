import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { IdentityComponent } from './identity/identity.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
// import { ListComponent } from './list/list.component';
// import { CoachDashBoardComponent } from './dashboard/coach-dashboard.component';
// import { CoachAddComponent } from './add/coach-add.component';
// import { CoachEditComponent } from './edit/coach-edit.component';
// import { CoachViewComponent } from './view/coach-view.component';

const profileRoutes: Routes = [
  {
  path: 'profile',
  component: ProfileComponent,
  children: [
      { path: '', redirectTo: 'identity', pathMatch: 'full' },
      { path: 'identity', component: IdentityComponent },
      { path: 'contact-information', component: ContactInformationComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  providers: [ ],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
