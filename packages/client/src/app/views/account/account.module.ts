import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    AccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AccountModule { }
