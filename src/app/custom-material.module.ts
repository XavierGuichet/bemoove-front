import { NgModule } from '@angular/core';
import { MdDialogModule,
    MdToolbarModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCheckboxModule,
    MdProgressSpinnerModule,
    MdSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
      MdDialogModule,
      MdToolbarModule,
      MdCardModule,
      MdIconModule,
      MdInputModule,
      MdButtonModule,
      MdButtonToggleModule,
      MdCheckboxModule,
      MdProgressSpinnerModule,
      MdSnackBarModule
  ],
  exports: [
      MdDialogModule,
      MdToolbarModule,
      MdCardModule,
      MdIconModule,
      MdInputModule,
      MdButtonModule,
      MdButtonToggleModule,
      MdCheckboxModule,
      MdProgressSpinnerModule,
      MdSnackBarModule
  ],
})
export class CustomMaterialModule { }
