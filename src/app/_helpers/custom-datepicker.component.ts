import { Component, Injectable, Input } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  fr: {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  }
};

// @Injectable()
// export class I18n {
//   public language = 'fr';
// }

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  @Input()
  public minDate;
  // constructor(private _i18n: I18n) {
  constructor() {
    super();
  }

  public getWeekdayShortName(weekday: number): string {
    return I18N_VALUES['fr'].weekdays[weekday - 1];
    // return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  public getMonthShortName(month: number): string {
    return I18N_VALUES['fr'].months[month - 1];
    // return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  public getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}
