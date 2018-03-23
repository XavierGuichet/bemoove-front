import { FormControl } from '@angular/forms';

export function validateLuhn(c: FormControl) {
    const value = c.value;
      if (value === null || (value.length !== 14) || (isNaN(value))) {
        return false;
      }

      let sum = 0;
      let tmp;
      for (let pos = (value.length - 1); pos >= 0; pos--) {
        tmp = parseInt(value.charAt(pos), 10);
        if ((pos % 2) === 0) { // Les positions impaires : 1er, 3è, 5è, etc...
          tmp = tmp * 2; // On le multiplie par 2
          if (tmp > 9) {
            tmp -= 9; // Si le résultat est supérieur à 9, on lui soustrait 9
          }
        }
        sum += tmp;
      }
      if ((sum % 10) === 0) {
        return null;
      }
      return { validateLuhn: { value } };
}
