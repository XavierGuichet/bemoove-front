import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

import { WelcomeCoachComponent }    from './welcome/coach/coach.component';
import { WelcomeSearchComponent } from './welcome/search/search.component';
import { PagesListComponent } from './pages-list/pages-list.component';

import { AuthUserGuard, AuthCoachGuard } from './_guards/index';

// export const ROUTES: Routes = [
//     { path: '', component: WelcomeSearchComponent },
//     { path: '**',    redirectTo: '', pathMatch: 'full' }
// ];
export const ROUTES: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'joinus', component: WelcomeCoachComponent },
    { path: 'pages-list', component: PagesListComponent },
    { path: 'search',      component: WelcomeSearchComponent },
    { path: 'welcomecoach',  component: WelcomeCoachComponent },
    { path: '**',    component: NoContentComponent }
];
