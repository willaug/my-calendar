import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observer } from 'rxjs';

import { Account, Login, LoginResponse } from '@interfaces/index';
import { TokenService } from '@core/shared/token/token.service';
import { SnackBarService } from '@core/shared/snack-bar/snack-bar.service';
import { DialogLoginService } from './services/dialog-login.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
})
export class DialogLoginComponent {
  public loginForm: FormGroup;
  public hide: boolean = true;
  public sendingForm: boolean = false;
  public emailOrPasswordIncorrect: boolean = false;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: Account,
    private formBuilder: FormBuilder,
    private loginService: DialogLoginService,
    private tokenService: TokenService,
    private snackBarService: SnackBarService,
    private dialogRef: MatDialogRef<DialogLoginComponent>,
  ) {
    this.loginForm = this.formBuilder.group({
      email: [data.email, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  public sendForm(): void {
    this.sendingForm = true;
    this.emailOrPasswordIncorrect = false;

    const loginForm = this.loginForm.getRawValue() as Login;
    this.loginService.login(loginForm).subscribe(this.loginSubscribeActions());
  }

  private loginSubscribeActions(): Partial<Observer<any>> {
    return {
      next: (data: LoginResponse): void => {
        this.tokenService.setToken(data.token);
        this.dialogRef.close(true);
        this.snackBarService.open('Welcome back!', '<3', 4000);
      },
      error: (err: any): void => {
        this.sendingForm = false;

        if (JSON.stringify(err).includes('EMAIL_OR_PASSWORD_INCORRECT')) {
          this.emailOrPasswordIncorrect = true;
          return;
        }

        if (JSON.stringify(err).includes('BAD_USER_INPUT')) {
          this.loginForm.get('email')?.setErrors({ email: true });
          return;
        }

        this.dialogRef.close();
        this.snackBarService.openUnknownError();
      },
    };
  }
}
