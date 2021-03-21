import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { AuthRequiredPagesRoutingModule } from './auth-required-pages-routing.module';
import { NewAssignmentComponent } from './containers/new-assignment/new-assignment.component';
import { AccountSettingsComponent } from './containers/account-settings/account-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FrontPageComponent } from './containers/front-page/front-page.component';
import { YourActivitiesComponent } from './containers/your-activities/your-activities.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers,
    NewAssignmentComponent,
    AccountSettingsComponent,
    FrontPageComponent,
    YourActivitiesComponent
  ],
  imports: [
    CommonModule,
    AuthRequiredPagesRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDropzoneModule
  ]
})
export class AuthRequiredPagesModule { }
