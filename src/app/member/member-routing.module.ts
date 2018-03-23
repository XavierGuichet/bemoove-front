import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MemberComponent } from './member.component';
import { ProfileModule } from './profile/profile.module';
import { MemberReservationComponent } from './reservation/reservation.component';
import { MemberHistoryComponent } from './history/history.component';

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
        { path: 'mes-seances', component: MemberReservationComponent },
        { path: 'mon-historique', component: MemberHistoryComponent },
        { path: '', loadChildren : () => ProfileModule },
    ]
  }
  ])],
  providers: [SpaceService],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
