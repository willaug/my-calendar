import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@core/shared/auth-guard/auth-guard.service';
import { AccountComponent } from './account.component';

const routes: Routes = [{
  path: '',
  component: AccountComponent,
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
export class AccountRoutingModule { }
