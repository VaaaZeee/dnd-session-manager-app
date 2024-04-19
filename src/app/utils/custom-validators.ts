import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  public static passwordConfirming(control: AbstractControl): {
    invalid?: boolean;
  } {
    return {
      ...(control.get('password')?.value !==
        control.get('confirmPassword')?.value && { invalid: true }),
    };
  }
}
