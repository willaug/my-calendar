import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trimAndReplaceSpacesFromObject } from '@core/functions/trim-and-replace-spaces-from-object';
import { SignUp, SignUpResponse } from '@src/app/core/interfaces';
import { Observer } from 'rxjs';

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
    const signUpFormValue = this.signUpForm.getRawValue() as SignUp;
    this.signUpForm.setValue(trimAndReplaceSpacesFromObject(signUpFormValue));
  }

  public sendSignUpFormByEnterKey(): void {
    if (this.signUpForm.valid) {
      this.sendSignUpForm();
    }
  }

  public sendSignUpForm(): void {
    this.trimAndRemoveTwoOrMoreSpacesInForm();
    if (this.signUpForm.invalid) {
      return;
    }

    this.sendingForm = true;

    const signUpForm = this.signUpForm.getRawValue() as SignUp;
    this.signUpService.signUp(signUpForm).subscribe(this.signUpSubscribeActions());
  }

  private signUpSubscribeActions(): Partial<Observer<any>> {
    return {
      next: (data: SignUpResponse): void => {
        this.dialogRef.close(data.email);
      },
      error: (err: any): void => {
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
      },
    };
  }
}
