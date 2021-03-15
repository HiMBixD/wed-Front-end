import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { AuthRequiredPagesRoutingModule } from './auth-required-pages-routing.module';
import { NewAssignmentComponent } from './containers/new-assignment/new-assignment.component';
import { AccountSettingsComponent } from './containers/account-settings/account-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers,
    NewAssignmentComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    AuthRequiredPagesRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AuthRequiredPagesModule { }
