import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from '../core/guards/auth.guard';
import {TestFilePageComponent} from './containers';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
    children: [
      {
        path: 'test-file',
        component: TestFilePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherPagesDaRoutingModule { }
