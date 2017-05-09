import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthUserGuard implements CanActivate {

    constructor(private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')
            && localStorage.getItem('currentUserRoles') === 'ROLE_USER') {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        //TODO : display an alert or a popup
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
