import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Profile, Address } from '../../models/index';

import { AlertService, ProfileService } from '../../_services/index';

@Component({
  selector: 'member-profile',
  templateUrl: 'profile.component.html'
})

export class MemberProfileComponent implements OnInit {
  public profile: Profile;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private profileService: ProfileService
  ) { }

  public ngOnInit(): void {
      this.alertService.success('I\'m a cool success message');
  }
}
