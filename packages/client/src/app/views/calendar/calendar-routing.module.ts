import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@core/shared/auth-guard/auth-guard.service';
import { CalendarComponent } from './calendar.component';

const routes: Routes = [{
  path: '',
  data: { title: 'MyCalendar - Calendar' },
  component: CalendarComponent,
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
export class CalendarRoutingModule { }
