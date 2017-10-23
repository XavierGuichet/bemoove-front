import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bm-react-form'
})

export class BMReactFormComponent  {
    public formResult: any;
    public formReady: boolean = false;
    public loading: boolean = false;

    public formErrors = {};

    public validationMessages = {};

    public hideFormResult() {
        this.formResult = false;
    }

    public showFormResult(type: string, title: string, content: string = '') {
        this.formResult = { type, title, content};
    }

    public onValueChanged(form, data?: any): void {
      const formErrors = this.formErrors;
      this.formErrors = this.recursiveCheck(form, formErrors);
    }

    public recursiveCheck(form, formErrors, validationprefix = '') {
      if (validationprefix !== '') {
        validationprefix += '.';
      }
      for (const field in formErrors) {
        if (typeof formErrors[field] === 'string') {
          const control = form.get(validationprefix + field);
          formErrors[field] = this.checkControlError(control, validationprefix + field);
        } else if (typeof this.formErrors[field] === 'object') {
          let prefix = validationprefix + field;
          formErrors[field] = this.recursiveCheck(this.formErrors[field], prefix);
        }
      }
      return formErrors;
    }

    public checkControlError(control, field) {
      let errorMessages = '';
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorMessages += messages[key] + ' ';
          }
        }
      }
      return errorMessages;
    }

    public handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
