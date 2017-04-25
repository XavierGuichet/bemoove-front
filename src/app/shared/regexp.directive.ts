import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function RegexpValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = nameRe.test(name);
    return no ? null : {regexpvalidatorphrase: {name}};
  };
}

@Directive({
  selector: '[Regexp]',
  providers: [{provide: NG_VALIDATORS, useExisting: RegexpValidatorDirective, multi: true}]
})

export class RegexpValidatorDirective implements Validator, OnChanges {
  @Input()
  public phrase: string;
  private valFn = Validators.nullValidator;

  public ngOnChanges(changes: SimpleChanges): void {
    const change = changes['phrase'];
    if (change) {
      const val: string | RegExp = change.currentValue;
      const re = val instanceof RegExp ? val : new RegExp(val, 'i');
      this.valFn = RegexpValidator(re);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  public validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
