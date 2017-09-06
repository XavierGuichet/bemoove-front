import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Profile, Address } from '../../models/index';

import { AlertService, ProfileService, SpaceService } from '../../_services/index';

@Component({
  selector: 'member-profile',
  templateUrl: 'profile.component.html'
})

export class MemberProfileComponent implements OnInit {
  public profile: Profile;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private profileService: ProfileService,
    private spaceService: SpaceService
  ) { }

  public ngOnInit(): void {
    // TODO
    // this.profileService.getByOwnerId(this.spaceService.getUserId())
    //   .then((profile) => {
    //     if (profile.length > 0) {
    //       this.profile = profile[0];
    //     } else {
    //       this.profile = new Profile();
    //     }
    //     if (!this.profile.address) {
    //         this.profile.address = new Address();
    //     }
    //     console.log('from profileComponent');
    //     console.log(this.profile);
    //   });
      this.alertService.success('I\'m a cool success message');
  }
}
