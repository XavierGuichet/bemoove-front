import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

import { WelcomeCoachComponent }    from './welcome/coach/coach.component';
import { HomeComponent } from './home/home.component';
import { PagesListComponent } from './pages-list/pages-list.component';

import { AuthUserGuard, AuthCoachGuard } from './_guards/index';

// export const ROUTES: Routes = [
//     { path: '', component: WelcomeSearchComponent },
//     { path: '**',    redirectTo: '', pathMatch: 'full' }
// ];
export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'joinus', component: WelcomeCoachComponent },
    { path: 'welcomecoach',  component: WelcomeCoachComponent },
    { path: '**',    component: NoContentComponent }
];
