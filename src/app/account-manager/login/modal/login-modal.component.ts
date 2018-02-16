import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { RegisterModalComponent } from '../../register/modal/register-modal.component';

// import { SpaceService } from '../../../_services/index';

@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: ['../../modal.component.scss']
})
export class LoginModalComponent {
  public showpassword: boolean = false;
  public loading = false;
  public model: any = {};

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginModalComponent>,
    public snackBar: MatSnackBar,
    // public spaceService: SpaceService,
    private router: Router) {
  }

  public redirectAfterLogin(): boolean {
    // let zone = this.spaceService.getZone();
    // if (zone === 'ROLE_PARTNER') {
    //   this.router.navigate(['/partner']);
    //   return true;
    // }
    // if (zone === 'ROLE_USER') {
    //   this.router.navigate(['/member/mon-profil']);
    //   return true;
    // } else {
    //   this.router.navigate(['/workouts/view']);
    //   return true;
    // }
    return true;
  }

  public closeModal(success) {
      if (success) {
          this.dialogRef.close();
      }
  }

  public showRegisterModal() {
    this.dialogRef.close();
    let dialogRef = this.dialog.open(RegisterModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      //   this.selectedOption = result;
    });
  }
}
