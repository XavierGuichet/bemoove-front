import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SpaceService } from '../_services/space.service';

@Injectable()
export class AuthCoachGuard implements CanActivate {

    constructor(
        private router: Router,
        private spaceService: SpaceService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.spaceService.getLogged()
            && this.spaceService.getZone() === 'ROLE_COACH') {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        // TODO : display an alert or a popup
        // this.router.navigate(['/search'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
