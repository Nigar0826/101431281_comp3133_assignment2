import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },             // default route
  { path: 'login', component: LoginComponent },                     // login page
  { path: 'signup', component: SignupComponent },                   // signup page
  { path: 'employees', component: EmployeeListComponent },          // view all employees
  { path: 'add-employee', component: EmployeeAddComponent },        // add employee
  { path: 'update/:id', component: EmployeeUpdateComponent },       // update employee
  { path: 'view/:id', component: EmployeeDetailsComponent },        // view details
  { path: '**', redirectTo: 'login' }                               // fallback route
];
