import { AbstractControl } from '@angular/forms';

export class SamePasswordValidation {
  public static validate(formGroup: AbstractControl): null {
    const { newPassword, confirmNewPassword } = formGroup.value;

    if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
      formGroup.get('confirmNewPassword')?.setErrors({ samePassword: true });
    }

    return null;
  }
}
