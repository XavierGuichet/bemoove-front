import { FormControl } from '@angular/forms';

export function validateLuhn(c: FormControl) {
  let EMAIL_REGEXP = /[0-9]*/;

  return EMAIL_REGEXP.test(c.value) ? null : {
    validateEmail: {
      valid: false
    }
  };
}
