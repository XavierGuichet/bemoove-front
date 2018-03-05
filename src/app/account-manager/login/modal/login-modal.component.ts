import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { RegisterModalComponent } from '../../register/modal/register-modal.component';

@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: ['../../modal.component.scss']
})
export class LoginModalComponent {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private router: Router) {
  }

  public closeModal(success) {
      if (success) {
          this.dialogRef.close();
      }
  }

  public showRegisterModal() {
    this.dialogRef.close();
    let dialogRef = this.dialog.open(RegisterModalComponent);
  }
}
