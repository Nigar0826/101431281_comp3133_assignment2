import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_EMPLOYEES } from '../../graphql/queries';
import { DELETE_EMPLOYEE } from '../../graphql/mutations';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';         
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,     
    RouterModule,
    FormsModule
  ]
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  loading = true;
  error: any;
  searchTerm: string = '';
  successMessage: string = '';

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.apollo
      .watchQuery<any>({
        query: GET_ALL_EMPLOYEES
      })
      .valueChanges.subscribe({
        next: ({ data, loading }) => {
          this.loading = loading;
          this.employees = data?.employees || [];
        },
        error: (error) => {
          this.error = error;
          console.error('Error loading employees:', error);
        }
      });
  }

  get filteredEmployees() {
    if (!this.searchTerm.trim()) return this.employees;

    return this.employees.filter(emp =>
      emp.department.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  view(emp: any) {
    console.log('View clicked', emp);
    this.router.navigate(['/view', emp._id]); 
  }

  edit(emp: any) {
    console.log('Edit clicked', emp);
    this.router.navigate(['/update', emp._id]); 
  }

  // Already Exists: Delete
  delete(emp: any) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.apollo
        .mutate({
          mutation: DELETE_EMPLOYEE,
          variables: { id: emp._id },
          refetchQueries: [{ query: GET_ALL_EMPLOYEES }]
        })
        .subscribe({
          next: () => {
            alert('Employee Deleted Successfully'); 
          },
          error: (err) => {
            console.error('Delete failed:', err);
            alert('Failed to delete employee');
          }
        });
    }
  }
}  