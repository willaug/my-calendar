import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@views/home/home.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Dashboard' },
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'account',
    loadChildren: () => import('@views/account/account.module').then((module) => module.AccountModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('@views/settings/settings.module').then((module) => module.SettingsModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
