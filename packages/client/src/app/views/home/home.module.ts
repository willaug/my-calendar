import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
  ],
})
export class HomeModule { }
