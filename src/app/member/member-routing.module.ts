import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MemberComponent } from './member.component';
import { ProfileModule } from './profile/profile.module';
import { MyReservationComponent } from './my-reservation/my-reservation.component';

import { SpaceService } from '../_services/space.service';

import { AuthMemberGuard } from '../_guards/index';

@NgModule({
  imports: [RouterModule.forChild([
    {
    path: 'member',
    component: MemberComponent,
    canActivate: [ AuthMemberGuard ],
    children: [
        { path: '', redirectTo: 'mes-seances', pathMatch: 'full' },
        { path: 'mes-seances', component: MyReservationComponent },
        { path: '', loadChildren : () => ProfileModule },
    ]
  }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
