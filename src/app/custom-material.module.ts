import { NgModule } from '@angular/core';
import { MatDialogModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
      MatDialogModule,
      MatToolbarModule,
      MatCardModule,
      MatIconModule,
      MatInputModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCheckboxModule,
      MatExpansionModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      MatTabsModule,
      MatSnackBarModule
  ],
  exports: [
      MatDialogModule,
      MatToolbarModule,
      MatCardModule,
      MatIconModule,
      MatInputModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCheckboxModule,
      MatExpansionModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      MatTabsModule,
      MatSnackBarModule
  ],
})
export class CustomMaterialModule { }
