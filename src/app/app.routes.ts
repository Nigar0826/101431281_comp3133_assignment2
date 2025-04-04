import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AuthGuard } from './auth.guard'; 

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'add-employee',
    component: EmployeeAddComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'update/:id',
    component: EmployeeUpdateComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'view/:id',
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard]  
  },
  { path: '**', redirectTo: 'login' }
];
