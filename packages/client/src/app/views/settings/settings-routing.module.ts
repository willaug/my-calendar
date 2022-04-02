import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@core/shared/auth-guard/auth-guard.service';
import { SettingsComponent } from './settings.component';

const routes: Routes = [{
  path: '',
  data: { title: 'MyCalendar - Settings' },
  component: SettingsComponent,
  canActivate: [AuthGuardService],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class SettingsRoutingModule { }
