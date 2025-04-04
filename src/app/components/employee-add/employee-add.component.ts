import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { ADD_EMPLOYEE } from '../../graphql/mutations';
import { GET_ALL_EMPLOYEES } from '../../graphql/queries';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class EmployeeAddComponent {
  addForm: FormGroup;
  errorMessage = '';
  selectedImageBase64: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {
    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

pictureBase64: string = '';
imageReady: boolean = false;

onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.pictureBase64 = reader.result as string;
      this.imageReady = true;  
    };
    reader.readAsDataURL(file);
  }
}

onSubmit(): void {
  if (this.addForm.valid) {
    if (!this.imageReady && this.pictureBase64 === '') {
      this.errorMessage = 'Please wait for image to finish uploading.';
      return;
    }

    const { firstName, lastName, email, salary, department } = this.addForm.value;

    console.log('Base64 picture string:', this.pictureBase64);

    this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: {
        firstName,
        lastName,
        email,
        salary: Number(salary),
        department,
        picture: this.pictureBase64  
      },
      refetchQueries: [{ query: GET_ALL_EMPLOYEES }]
    }).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Add employee failed', err);
        this.errorMessage = 'Failed to add employee. Try again.';
      }
    });
  } else {
    this.errorMessage = 'Please fill out the form correctly.';
  }
}
}