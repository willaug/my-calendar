import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { EditYourDataComponent } from './components/edit-your-data/edit-your-data.component';
import { EditYourPasswordComponent } from './components/edit-your-password/edit-your-password.component';
import { SettingsExpansionPanelComponent } from './components/settings-expansion-panel/settings-expansion-panel.component';
import { DialogPasswordVerifyComponent } from './components/edit-your-password/dialog-password-verify/dialog-password-verify.component';
import { EditYourPictureComponent } from './components/edit-your-picture/edit-your-picture.component';
import { DialogUploadPictureComponent } from './components/edit-your-picture/dialog-upload-picture/dialog-upload-picture.component';

@NgModule({
  declarations: [
    SettingsComponent,
    EditYourDataComponent,
    EditYourPasswordComponent,
    SettingsExpansionPanelComponent,
    DialogPasswordVerifyComponent,
    EditYourPictureComponent,
    DialogUploadPictureComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    ImageCropperModule,
    FlexLayoutModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class SettingsModule { }
