import { ValidatorFn } from '@angular/forms';
import { postcodeValidator } from './postcode.validators';

export class ClientValidators {
  static postcode(): ValidatorFn {
    return postcodeValidator();
  }
}
