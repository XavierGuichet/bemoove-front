import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MemberComponent } from './member.component';
import { MemberProfileComponent } from './profile/profile.component';

import { SpaceService } from '../_services/space.service';

import { AuthMemberGuard } from '../_guards/index';

@NgModule({
  imports: [RouterModule.forChild([
    {
    path: 'member',
    component: MemberComponent,
    canActivate: [ AuthMemberGuard ],
    children: [
        { path: '', redirectTo: 'mon-profil', pathMatch: 'full' },
        { path: 'mon-profil', component: MemberProfileComponent },
    ]
  }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
