import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

import { Account, Login } from '@interfaces/index';
import { TokenService } from '@core/shared/token/token.service';
import { SnackBarService } from '@core/shared/snack-bar/snack-bar.service';
import { DialogLoginService } from './services/dialog-login.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
})
export class DialogLoginComponent {
  public loginForm: FormGroup;
  public sendingForm: boolean;
  public hidePassword: boolean;
  public emailOrPasswordIsIncorrect: boolean;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: Account,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private loginService: DialogLoginService,
    private snackBarService: SnackBarService,
    private dialogRef: MatDialogRef<DialogLoginComponent>,
  ) {
    this.hidePassword = true;
    this.sendingForm = false;
    this.emailOrPasswordIsIncorrect = false;
    this.loginForm = this.formBuilder.group({
      email: [data.email, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  public async sendForm(): Promise<void> {
    this.sendingForm = true;
    this.emailOrPasswordIsIncorrect = false;

    try {
      const loginForm = this.loginForm.getRawValue() as Login;
      const data = await lastValueFrom(this.loginService.login(loginForm));

      this.dialogRef.close(true);
      this.tokenService.setToken(data.token);
      this.snackBarService.open('Welcome back!', '<3', 4000);
    } catch (err: any) {
      this.sendingForm = false;

      if (JSON.stringify(err).includes('EMAIL_OR_PASSWORD_INCORRECT')) {
        this.emailOrPasswordIsIncorrect = true;
        return;
      }

      if (JSON.stringify(err).includes('BAD_USER_INPUT')) {
        this.loginForm.get('email')?.setErrors({ email: true });
        return;
      }

      this.dialogRef.close();
      this.snackBarService.openUnknownError();
    }
  }
}
