import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginResponse } from '../../../core/interfaces/login';
import { DialogLoginService } from './service/dialog-login.service';

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
    private formBuilder: FormBuilder,
    private loginService: DialogLoginService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogLoginComponent>,
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  public sendForm(): void {
    this.sendingForm = true;
    this.emailOrPasswordIncorrect = false;

    const loginForm = this.loginForm.getRawValue();
    this.loginService.login(loginForm).subscribe({
      next: (data: LoginResponse): void => {
        this.loginService.setToken(data.token);

        this.dialogRef.close();
        this.snackBar.open('Welcome back!', 'Thanks', {
          duration: 4000,
        });
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
        this.snackBar.open('An error ocurred, please try again later!', 'Ok', {
          duration: 4000,
        });
      },
    });
  }
}
