import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { AuthRequiredPagesRoutingModule } from './auth-required-pages-routing.module';
import { NewAssignmentComponent } from './containers/new-assignment/new-assignment.component';
import { AccountSettingsComponent } from './containers/account-settings/account-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FrontPageComponent } from './containers/front-page/front-page.component';
import { YourActivitiesComponent } from './containers/your-activities/your-activities.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ManagementDashboardComponent } from './containers/management-dashboard/management-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { SelectedSubmissionBrowserComponent } from './containers/selected-submission-browser/selected-submission-browser.component';
import { Error403Component } from './containers/error403/error403.component';
import { ClosureManagementComponent } from './containers/closure-management/closure-management.component';
import { AllSubmissionsComponent } from './containers/all-submissions/all-submissions.component';
import { AssignmentListComponent } from './containers/assignment-list/assignment-list.component';
import { DefaultComponentComponent } from './containers/default-component/default-component.component';
import { MySubmissionComponent } from './containers/my-submission/my-submission.component';
import { SubmissionPortalComponent } from './containers/submission-portal/submission-portal.component';
import { SubmissionHomeComponent } from './containers/submission-home/submission-home.component';
import { GuestPortalComponent } from './containers/guest-portal/guest-portal.component';


@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers,
    NewAssignmentComponent,
    AccountSettingsComponent,
    FrontPageComponent,
    YourActivitiesComponent,
    ManagementDashboardComponent,
    SelectedSubmissionBrowserComponent,
    Error403Component,
    ClosureManagementComponent,
    AllSubmissionsComponent,
    AssignmentListComponent,
    DefaultComponentComponent,
    MySubmissionComponent,
    SubmissionPortalComponent,
    SubmissionHomeComponent,
    GuestPortalComponent
  ],
  imports: [
    CommonModule,
    AuthRequiredPagesRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDropzoneModule,
    ChartsModule,
    FormsModule
  ]
})
export class AuthRequiredPagesModule { }
