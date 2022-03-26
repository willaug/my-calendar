import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SamePasswordValidation } from './validators/same-password.validation';
import { DialogPasswordVerifyComponent } from './dialog-password-verify/dialog-password-verify.component';

@Component({
  selector: 'app-edit-your-password',
  templateUrl: './edit-your-password.component.html',
  styleUrls: ['./edit-your-password.component.scss'],
})
export class EditYourPasswordComponent {
  @Output() public closeAccordion: EventEmitter<boolean>;
  @Input() public email?: string;

  public newPasswordFormGroup: FormGroup;
  public hidePassword: boolean;

  public constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
  ) {
    this.hidePassword = true;
    this.closeAccordion = new EventEmitter();
    this.newPasswordFormGroup = this.formBuilder.group({
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: [null, [Validators.required]],
    });

    this.newPasswordFormGroup.addValidators(SamePasswordValidation.validate);
  }

  public closePanel(): void {
    this.closeAccordion.emit(true);
  }

  public resetNewPasswordForm(): void {
    this.newPasswordFormGroup.reset();
  }

  public saveNewPassword(): void {
    const dialogPasswordVerify = this.matDialog.open(DialogPasswordVerifyComponent, {
      width: '80%',
      maxWidth: '450px',
      data: this.newPasswordFormGroup.value,
    });

    dialogPasswordVerify.afterClosed().subscribe(() => {
      this.resetNewPasswordForm();
      this.closePanel();
    });
  }
}
