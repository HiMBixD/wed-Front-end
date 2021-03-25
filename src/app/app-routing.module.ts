import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuardService],
    // canLoad: [AuthGuardService],
    loadChildren: () => import('./auth-required-pages/auth-required-pages.module').then(m => m.AuthRequiredPagesModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
  },
  {
    path: 'other',
    loadChildren: () => import('./other-pages-da/other-pages-da.module').then(m => m.OtherPagesDaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
