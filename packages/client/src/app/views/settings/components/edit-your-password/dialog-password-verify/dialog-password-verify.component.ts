import { lastValueFrom } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountPasswordInput } from '@interfaces/account';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingService } from '@core/shared/loading/loading.service';
import { SnackBarService } from '@core/shared/snack-bar/snack-bar.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-dialog-password-verify',
  templateUrl: './dialog-password-verify.component.html',
})
export class DialogPasswordVerifyComponent {
  public currentPassword: FormControl;
  public savingPassword: boolean;

  public constructor(
    private loadingService: LoadingService,
    private settingsService: SettingsService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<DialogPasswordVerifyComponent>,
    @Inject(MAT_DIALOG_DATA) private newPasswordData: AccountPasswordInput,
  ) {
    this.savingPassword = false;
    this.currentPassword = new FormControl(null, Validators.required);
  }

  public async savePassword(): Promise<void> {
    this.loadingService.setLoading();
    this.currentPassword.disable();
    this.savingPassword = true;

    const input = {
      ...this.newPasswordData,
      currentPassword: this.currentPassword.value,
    } as AccountPasswordInput;

    try {
      await lastValueFrom(this.settingsService.updateAccountPassword(input));
      this.snackBarService.open('Account successfully updated!', '<3');
      this.dialogRef.close();
    } catch (err) {
      this.currentPassword.enable();
      this.savingPassword = false;

      if (JSON.stringify(err).includes('CURRENT_PASSWORD_INCORRECT')) {
        this.currentPassword.setErrors({ passwordIncorrect: true });
        return;
      }

      this.snackBarService.openUnknownError();
      this.dialogRef.close();
    } finally {
      this.loadingService.resetLoading();
    }
  }
}
