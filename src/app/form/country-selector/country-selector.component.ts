import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { COUNTRIES } from './countries-data';

@Component({
  selector: 'country-selector',
  templateUrl: 'country-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CountrySelectorComponent {
    @Input()
    public parent: FormGroup;
    @Input()
    public parentFormControlName: any;

    public countries = COUNTRIES;

    get getParentFormControl() {
      return this.parent.get(this.parentFormControlName);
    }
}
