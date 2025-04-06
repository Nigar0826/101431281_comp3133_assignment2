import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GET_EMPLOYEE_BY_ID } from '../../graphql/queries';
import { UPDATE_EMPLOYEE } from '../../graphql/mutations';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ]
})
export class EmployeeUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  errorMessage = '';
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', Validators.required],
      department: ['', Validators.required]
    });

    if (this.id) {
      this.apollo
        .watchQuery<any>({
          query: GET_EMPLOYEE_BY_ID,
          variables: { id: this.id }
        })
        .valueChanges.subscribe({
          next: ({ data }) => {
            const emp = data?.getEmployee;
            if (emp) {
              this.updateForm.patchValue(emp);
            }
          },
          error: (err) => {
            this.errorMessage = 'Failed to load employee.';
            console.error(err);
          }
        });
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid && this.id) {
      const { firstName, lastName, email, salary, department } = this.updateForm.value;

      this.apollo
        .mutate({
          mutation: UPDATE_EMPLOYEE,
          variables: {
            id: this.id,
            firstName,
            lastName,
            email,
            salary: Number(salary),
            department
          },
          refetchQueries: ['GetAllEmployees']
        })
        .subscribe({
          next: () => this.router.navigate(['/employees']),
          error: (err) => {
            this.errorMessage = 'Update failed.';
            console.error(err);
          }
        });
    }
  }
}
