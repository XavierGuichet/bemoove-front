import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bm-react-form'
})

export abstract class BMReactFormComponent  {
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

    public recursiveCheck(form, formErrors, validationprefix = '', force = false): any {
      if (validationprefix !== '') {
        validationprefix += '.';
      }
      for (const field in formErrors) {
        if (typeof formErrors[field] === 'string') {
          const control = form.get(validationprefix + field);
          formErrors[field] = this.checkControlError(control, validationprefix + field, force);
        } else if (typeof this.formErrors[field] === 'object') {
          let prefix = validationprefix + field;
          formErrors[field] = this.recursiveCheck(form, this.formErrors[field], prefix, force);
        }
      }
      return formErrors;
    }

    public checkControlError(control, field, force = false) {
      let errorMessages = '';
      if (control && (control.dirty || control.touched || force) && !control.valid) {
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

    public createOrUpdate(service: any, model: any): Promise<any> {
        if (!model.id) {
          return service.create(model)
                .then( (newModel) => newModel )
                .catch( this.handleError );
        } else {
          service.update(model)
                .then( (updatedModel) => updatedModel )
                .catch( this.handleError );
        }
    }

    protected abstract buildForm();

    protected abstract createObjectFromModel();

    protected abstract createNestedEntities(model: any): Promise<any>;
}
