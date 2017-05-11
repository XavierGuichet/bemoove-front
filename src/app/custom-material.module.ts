import { NgModule } from '@angular/core';
import { MdDialogModule, MdToolbarModule, MdCardModule, MdIconModule, MdInputModule, MdButtonModule, MdCheckboxModule } from '@angular/material';

@NgModule({
  imports: [MdDialogModule, MdToolbarModule, MdCardModule, MdIconModule, MdInputModule, MdButtonModule, MdCheckboxModule],
  exports: [MdDialogModule, MdToolbarModule, MdCardModule, MdIconModule, MdInputModule, MdButtonModule, MdCheckboxModule],
})
export class CustomMaterialModule { }
