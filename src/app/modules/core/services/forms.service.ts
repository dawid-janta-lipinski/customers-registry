import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor() {}

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if (control.hasError('minLength')) {
      return 'This field should have min 5 characters';
    }
    if (control.hasError('maxLength')) {
      return 'This field should have max 50 characters';
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  }
}
