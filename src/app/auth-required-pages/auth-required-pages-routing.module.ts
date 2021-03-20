import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Error404Component, HomepageComponent, UserManagementComponent} from './containers';
import {AuthGuardService} from '../core/guards/auth.guard';
import { NewSubmissionComponent } from './containers/new-submission/new-submission.component';
import { AccountSettingsComponent } from './containers/account-settings/account-settings.component';
import { FrontPageComponent } from './containers/front-page/front-page.component';
import { YourActivitiesComponent } from './containers/your-activities/your-activities.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
    component: HomepageComponent,
    children: [
      {
        path: '404', component: Error404Component
      },
      {
        path: 'newSubmission', component: NewSubmissionComponent,
      },
      {
        path: 'userManagement', component: UserManagementComponent,
      },
      {
        path: 'accountSettings', component: AccountSettingsComponent,
      },
      {
        path: 'frontPage', component: FrontPageComponent
      },
      {
        path: 'yourActivities', redirectTo: 'yourActivities'
      },
      {
        path: '', redirectTo: '/frontPage', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'yourActivities',
    component: YourActivitiesComponent,
    children: [
      {
        path: 'userManagement', component: UserManagementComponent,
      },
      {
        path: '', redirectTo: '/yourActivities', pathMatch: 'full'
      },
      {
        path:'frontPage', redirectTo: '/frontPage', pathMatch: 'full'
      },
      {
        path: 'accountSettings', redirectTo: '/accountSettings', pathMatch: 'full'
      },
      {
        path: '**', component: Error404Component
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRequiredPagesRoutingModule { }
