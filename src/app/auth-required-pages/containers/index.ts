import { Error404Component } from './error404/error404.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewAssignmentComponent } from './new-assignment/new-assignment.component';
import { UserManagementComponent } from './user-management/user-management.component';

export const containers: any[] = [
  Error404Component,
  HomepageComponent,
  UserManagementComponent,
  NewAssignmentComponent,
];

export * from './error404/error404.component';
export * from './homepage/homepage.component';
export * from './user-management/user-management.component';
export * from './new-assignment/new-assignment.component';