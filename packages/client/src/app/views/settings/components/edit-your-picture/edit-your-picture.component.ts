import {
  Input,
  Output,
  OnChanges,
  Component,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

import { AccountService } from '@core/shared/account/account.service';
import { SnackBarService } from '@core/shared/snack-bar/snack-bar.service';
import { LoadingService } from '@core/shared/loading/loading.service';
import { SettingsService } from '../../services/settings.service';
import { DialogUploadPictureComponent } from './dialog-upload-picture/dialog-upload-picture.component';

@Component({
  selector: 'app-edit-your-picture',
  templateUrl: './edit-your-picture.component.html',
  styleUrls: ['./edit-your-picture.component.scss'],
})
export class EditYourPictureComponent implements OnChanges {
  @Output() public closeAccordion: EventEmitter<boolean>;
  @Input() public photoPath?: string;
  public isUpdate: boolean;
  public sendingChanges: boolean;

  public constructor(
    private matDialog: MatDialog,
    private loadingService: LoadingService,
    private settingsService: SettingsService,
    private accountService: AccountService,
    private snackBarService: SnackBarService,
  ) {
    this.closeAccordion = new EventEmitter();
    this.sendingChanges = false;
    this.isUpdate = true;
  }

  public ngOnChanges(): void {
    this.isUpdate = !this.photoPath?.includes('ui-avatars');
  }

  public openUploadPictureDialog(): void {
    const dialogUploadPicture = this.matDialog.open(DialogUploadPictureComponent, {
      width: '80%',
      maxWidth: '450px',
    });

    dialogUploadPicture.afterClosed().subscribe(async (afterClosedValue) => {
      if (afterClosedValue.selectedImage) {
        await this.savePicture(afterClosedValue.selectedImage);
      }
    });
  }

  public async deletePicture(): Promise<void> {
    return this.savePicture();
  }

  private async savePicture(picture?: Blob): Promise<void> {
    this.loadingService.setLoading();
    this.closeAccordion.emit(true);
    this.sendingChanges = true;

    try {
      if (picture) {
        await lastValueFrom(this.settingsService.uploadPhotoAccount(picture));
      } else {
        await lastValueFrom(this.settingsService.deletePhotoAccount());
      }

      await this.accountService.setAccount();
      this.snackBarService.open('Account successfully updated!', '<3');
    } catch {
      this.snackBarService.openUnknownError();
    } finally {
      this.loadingService.resetLoading();
      this.sendingChanges = false;
    }
  }
}
