import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trimAndReplaceSpacesFromObject } from '@core/functions/trim-and-replace-spaces-from-object';
import { SignUp } from '@src/app/core/interfaces';
import { lastValueFrom } from 'rxjs';

import { SnackBarService } from '@core/shared/snack-bar/snack-bar.service';
import { DialogSignUpService } from './services/dialog-sign-up.service';

@Component({
  selector: 'app-dialog-sign-up',
  templateUrl: './dialog-sign-up.component.html',
})
export class DialogSignUpComponent {
  public signUpForm: FormGroup;
  public sendingForm: boolean;
  public hide: boolean;

  public constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private signUpService: DialogSignUpService,
    private dialogRef: MatDialogRef<DialogSignUpComponent>,
  ) {
    this.hide = true;
    this.sendingForm = false;
    this.signUpForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  private trimAndRemoveTwoOrMoreSpacesInForm(): void {
    const signUpFormValue = this.signUpForm.getRawValue();
    const signUpFormValueWithTrim = trimAndReplaceSpacesFromObject(signUpFormValue);
    this.signUpForm.setValue(signUpFormValueWithTrim);
  }

  public async sendSignUpForm(): Promise<void> {
    this.trimAndRemoveTwoOrMoreSpacesInForm();
    if (this.signUpForm.invalid) return;

    this.sendingForm = true;

    try {
      const signUpForm = this.signUpForm.getRawValue() as SignUp;
      const data = await lastValueFrom(this.signUpService.signUp(signUpForm));

      this.dialogRef.close(data.email);
    } catch (err: any) {
      this.sendingForm = false;

      if (JSON.stringify(err).includes('BAD_USER_INPUT')) {
        this.signUpForm.get('email')?.setErrors({ email: true });
        return;
      }

      if (JSON.stringify(err).includes('ACCOUNTS_EMAIL_UNIQUE')) {
        this.signUpForm.get('email')?.setErrors({ emailUnique: true });
        return;
      }

      this.dialogRef.close();
      this.snackBarService.openUnknownError();
    }
  }
}
