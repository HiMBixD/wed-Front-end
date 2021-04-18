import { Error404Component } from './error404/error404.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewAssignmentComponent } from './closure-management/new-assignment/new-assignment.component';
import { NewSubmissionComponent } from './new-submission/new-submission.component';
import { UserManagementComponent } from './user-management/user-management.component';

export const containers: any[] = [
  Error404Component,
  HomepageComponent,
  UserManagementComponent,
  NewAssignmentComponent,
  NewSubmissionComponent
];

export * from './error404/error404.component';
export * from './homepage/homepage.component';
export * from './user-management/user-management.component';
export * from './closure-management/new-assignment/new-assignment.component';
export * from './user-management/user-management.component'