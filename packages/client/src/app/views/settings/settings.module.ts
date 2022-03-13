import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { EditYourNameComponent } from './components/edit-your-name/edit-your-name.component';
import { SettingsExpansionPanelComponent } from './components/settings-expansion-panel/settings-expansion-panel.component';
import { EditYourEmailComponent } from './components/edit-your-email/edit-your-email.component';

@NgModule({
  declarations: [
    SettingsComponent,
    EditYourNameComponent,
    SettingsExpansionPanelComponent,
    EditYourEmailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
  ],
})
export class SettingsModule { }
