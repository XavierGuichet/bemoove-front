import { Component, Input, OnInit, ViewContainerRef, HostListener, Inject } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { SportySubscribeModalComponent  } from '../modal/sporty-subscribe/sporty-subscribe-modal';
import { LoginModalComponent  } from '../modal/login/login-modal.component';
import { RegisterModalComponent  } from '../modal/register/register-modal.component';

import { AuthenticationService } from '../_services/index';
import { SpaceService } from '../_services/space.service';

@Component({
    selector: 'header-nav',
    providers: [Modal],
    templateUrl: 'header-nav.component.html',
    styleUrls: ['header-nav.component.scss']
})

export class HeaderNavComponent implements OnInit {
    public isWhite: boolean = false;
    public headerType: string = 'default';
    public fixed: boolean = false;
    public logged: boolean = false;
    public displayConnexion: boolean = true;

    private returnUrl: string;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private route: ActivatedRoute,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private router: Router,
        private spaceService: SpaceService,
        private authenticationService: AuthenticationService
    ) {
        overlay.defaultViewContainer = vcRef;
        this.spaceService.setTopBarEmitter.subscribe( ( mode ) => {
            if (mode !== null) {
              this.displayConnexion = mode;
            }
        });
        this.spaceService.setLoggedEmitter.subscribe(( mode ) => {
            // console.log(mode);
            // mode will be null the first time it is created,
                //  so you need to igonore it when null
            if (mode !== null) {
              this.logged = mode;
            }
        });
        this.spaceService.setZoneEmitter.subscribe(( zone ) => {
            // mode will be null the first time it is created,
                //  so you need to igonore it when null
            if (zone !== null) {
              this.headerType = zone;
            }
        });
    }

    @HostListener('window:scroll', [])
      public onWindowScroll() {
        let scrollPos = window.pageYOffset
                     || this.document.documentElement.scrollTop
                     || this.document.body.scrollTop
                     || 0;
        if (scrollPos > 100) {
          this.isWhite = true;
        } else if (this.isWhite && scrollPos < 10) {
          this.isWhite = false;
        }
      }

    public ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
        console.log(this.route.snapshot.queryParams);
        if (this.returnUrl) {
            this.showLoginModal();
            this.router.navigate([this.returnUrl]);
        }
    }

    public logout(): void {
        this.authenticationService.logout();
        this.router.navigate(['/search']);
    }

    public showLoginModal() {
        return this.modal.open(LoginModalComponent,
            overlayConfigFactory({ showClose: false, isBlocking: false}, BSModalContext));
    }

    public showRegisterModal() {
        return this.modal.open(RegisterModalComponent,
            overlayConfigFactory({ showClose: false, isBlocking: false}, BSModalContext));
    }

    public showJoinUs() {
        return this.modal.open(SportySubscribeModalComponent,
            overlayConfigFactory({ showClose: false, isBlocking: false}, BSModalContext));
    }
}
