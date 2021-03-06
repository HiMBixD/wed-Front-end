import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component, HomepageComponent, NewAssignmentComponent, UserManagementComponent } from './containers';
import { AuthGuardService } from '../core/guards/auth.guard';
import { NewSubmissionComponent } from './containers/new-submission/new-submission.component';
import { AccountSettingsComponent } from './containers/account-settings/account-settings.component';
import { FrontPageComponent } from './containers/front-page/front-page.component';
import { YourActivitiesComponent } from './containers/your-activities/your-activities.component';
import { Error403Component } from './containers/error403/error403.component';
import { ManagementDashboardComponent } from './containers/management-dashboard/management-dashboard.component';
import { DefaultComponentComponent } from './containers/your-activities/default-component/default-component.component';
import { ClosureManagementComponent } from './containers/closure-management/closure-management.component';
import { SelectedSubmissionBrowserComponent } from './containers/selected-submission-browser/selected-submission-browser.component';
import { AssignmentListComponent } from './containers/assignment-management/assignment-list/assignment-list.component';
import { SubmissionPortalComponent } from './containers/submission-portal/submission-portal.component';
import { SubmissionHomeComponent } from './containers/submission-portal/submission-home/submission-home.component';
import { GuestPortalComponent } from './containers/guest-portal/guest-portal.component';
import { SubmissionsEvaluationComponent } from './containers/assignment-management/submissions-evaluation/submissions-evaluation.component';
import { AssignmentManagementComponent } from './containers/assignment-management/assignment-management.component';

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
      },
      {
        path: '403', component: Error403Component,
      },
      {
        path: 'yourActivities',
        component: YourActivitiesComponent,
        children: [
          {
            path: 'userManagement', component: UserManagementComponent,
          },
          {
            path: '', component: DefaultComponentComponent,
          },
          {
            path: 'yourActivities', redirectTo: '/yourActivities', pathMatch: 'full'
          },
          {
            path: 'frontPage', redirectTo: '/frontPage', pathMatch: 'full'
          },
          {
            path: 'accountSettings', redirectTo: '/accountSettings', pathMatch: 'full'
          },
          {
            path: 'dashboard', component: ManagementDashboardComponent,
          },
          {
            path: 'closureManagement', component: ClosureManagementComponent,
          },
          {
            path: 'selectedSubmissions', component: SelectedSubmissionBrowserComponent,
          },
          {
            path: 'assignmentManagement', component: AssignmentManagementComponent,
            children: [
              {
                path: '', component: AssignmentListComponent
              },
              {
                path: 'submissionEvaluation/:asmId', component: SubmissionsEvaluationComponent
              }
            ]
          },
          {
            path: 'assignmentList', component: AssignmentListComponent,
            children: [
              {
                path: 'submissionEvaluation', component: SubmissionsEvaluationComponent
              }
            ]
          },
          {
            path: 'newAssignment', component: NewAssignmentComponent,
          },
          {
            path: 'submissionPortal', component: SubmissionPortalComponent,
            children: [
              {
                path: '',
                component: SubmissionHomeComponent
              },
              {
                path: 'mySubmission/:asmId', component: NewSubmissionComponent,
              },
            ]
          },
          {
            path: 'guestPortal', component: GuestPortalComponent
          },
          {
            path: '**', component: Error404Component
          },
        ]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRequiredPagesRoutingModule { }
