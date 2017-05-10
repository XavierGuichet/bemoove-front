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
    public transparent: boolean = true;
    public headerType: string = 'default';
    public logged: boolean = false;
    public displayConnexion: boolean = true;
    public withToolBarAbove: boolean = false;

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
              this.withToolBarAbove = mode;
            }
        });
        this.spaceService.setLoggedEmitter.subscribe(( mode ) => {
            if (mode !== null) {
              this.logged = mode;
            }
        });
        this.spaceService.setZoneEmitter.subscribe(( zone ) => {
            if (zone !== null) {
              this.headerType = zone;
              if(this.headerType != 'home') {
                  this.transparent = false;
              }
              else {
                  this.transparent = true;
              }
            }
        });
    }

    @HostListener('window:scroll', [])
      public onWindowScroll() {
        if(this.headerType != 'home') { return; }
        let scrollPos = window.pageYOffset
                     || this.document.documentElement.scrollTop
                     || this.document.body.scrollTop
                     || 0;
        if (scrollPos > 100) {
          this.transparent = false;
        } else if (this.transparent && scrollPos < 10) {
          this.transparent = true;
        }
      }

    public ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
        if (this.returnUrl) {
            this.showLoginModal();
            this.router.navigate([this.returnUrl]);
        }
    }

    public logout(): void {
        this.authenticationService.logout();
        this.router.navigate(['']);
    }

    public showLoginModal() {
        return this.modal.open(LoginModalComponent,
            overlayConfigFactory({ showClose: true, isBlocking: false}, BSModalContext));
    }

    public showRegisterModal() {
        return this.modal.open(RegisterModalComponent,
            overlayConfigFactory({ showClose: true, isBlocking: false}, BSModalContext));
    }

    public showJoinUs() {
        return this.modal.open(SportySubscribeModalComponent,
            overlayConfigFactory({ showClose: true, isBlocking: false}, BSModalContext));
    }
}
