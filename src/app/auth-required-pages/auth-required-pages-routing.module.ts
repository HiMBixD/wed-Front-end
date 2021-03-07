import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Error404Component, HomepageComponent} from './containers';
import {AuthGuardService} from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
    component: HomepageComponent,
    children: [
      {
        path: '404', component: Error404Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRequiredPagesRoutingModule { }
