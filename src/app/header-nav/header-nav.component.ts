import { Component, Input, OnInit, HostListener, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { UserManagerModule  } from '../user-manager/user-manager.module';

import { AuthenticationService } from '../_services/index';
import { SpaceService } from '../_services/space.service';

@Component({
  selector: 'header-nav',
  templateUrl: 'header-nav.component.html',
  styleUrls: ['header-nav.component.scss']
})

export class HeaderNavComponent implements OnInit {
  public transparent: boolean = true;
  public headerAbove: boolean = false;
  public headerType: string = 'default';
  public logged: boolean = false;
  public displayConnexion: boolean = true;
  public withToolBarAbove: boolean = false;

  private returnUrl: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private router: Router,
    private spaceService: SpaceService,
    private authenticationService: AuthenticationService
  ) {
    this.spaceService.setTopBarEmitter.subscribe((mode) => {
      if (mode !== null) {
        this.withToolBarAbove = mode;
      }
    });
    this.spaceService.setLoggedEmitter.subscribe((mode) => {
      if (mode !== null) {
        this.logged = mode;
      }
    });
    this.spaceService.setZoneEmitter.subscribe((zone) => {
      if (zone !== null) {
        this.headerType = zone;
      }
    });
    this.spaceService.setHeaderAboveEmitter.subscribe((value) => {
      if (value !== null) {
        this.headerAbove = value;
        this.onWindowScroll();
      }
    });
  }

  @HostListener('window:scroll', [])
  public onWindowScroll() {
    if (!this.headerAbove) {
        this.transparent = false;
        return;
    }
    let scrollPos = window.pageYOffset
      || this.document.documentElement.scrollTop
      || this.document.body.scrollTop
      || 0;
    if (scrollPos > 100) {
      this.transparent = false;
    } else if (!this.transparent && scrollPos < 10) {
      this.transparent = true;
    }
  }

  public ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    // if (this.returnUrl) {
    //   this.showLoginModal();
    //   this.router.navigate([this.returnUrl]);
    // }
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
