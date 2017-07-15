import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

import { WelcomePartnerComponent } from './welcome/partner/partner.component';
import { PartnerRegistrationComponent } from './welcome/partner-registration/partner-registration.component';
import { HomeComponent } from './home/home.component';
import { PagesListComponent } from './pages-list/pages-list.component';

import { AuthMemberGuard, AuthPartnerGuard } from './_guards/index';

// export const ROUTES: Routes = [
//     { path: '', component: WelcomeSearchComponent },
//     { path: '**',    redirectTo: '', pathMatch: 'full' }
// ];
export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'joinus', component: WelcomePartnerComponent },
    { path: 'welcomepartner',  component: WelcomePartnerComponent },
    { path: 'new-partner', component: PartnerRegistrationComponent },
    { path: '**',    component: NoContentComponent }
];
