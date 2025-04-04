import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { SIGNUP_MUTATION } from '../../graphql/mutations';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Debug form status (optional)
    this.signupForm.statusChanges.subscribe(status => {
      console.log('Form status:', status);
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
  
      this.apollo.mutate({
        mutation: SIGNUP_MUTATION,
        variables: { email, password }
      }).subscribe({
        next: (result: any) => {
          const token = result?.data?.signup?.token;
  
          if (token) {
            localStorage.setItem('authToken', token);         
            this.router.navigate(['/login']);              
          } else {
            this.errorMessage = 'Signup failed: No token received.';
          }
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.errorMessage = 'Signup failed. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}  
