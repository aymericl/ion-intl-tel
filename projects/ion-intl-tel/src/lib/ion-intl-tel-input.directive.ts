import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {parsePhoneNumber, isValidPhoneNumber, PhoneNumber} from 'libphonenumber-js';

export class IonIntlTelInputValidators {
  static phone(control: AbstractControl): ValidationErrors | null {
    const error = { phone: true };
    let phoneNumber: PhoneNumber;
    if (!control.value) {
      return error;
    }

    try {
      phoneNumber = parsePhoneNumber(
        control.value.nationalNumber,
        control.value.isoCode.toUpperCase()
      );
    } catch (e) {
      return error;
    }

    if (!phoneNumber) {
      return error;
    } else {
      if (
        !isValidPhoneNumber(
          phoneNumber.nationalNumber,
          control.value.isoCode.toUpperCase()
        )
      ) {
        return error;
      }
    }
  }
}


@Directive({
  selector: '[ionIntlTelInputValid]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IonIntlTelInputValidatorDirective,
      multi: true,
    },
  ],
})
export class IonIntlTelInputValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return IonIntlTelInputValidators.phone(control);
  }
}
