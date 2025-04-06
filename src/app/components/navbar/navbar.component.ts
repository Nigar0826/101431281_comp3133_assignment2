import { Component, OnInit, DoCheck } from '@angular/core'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  userEmail: string | null = ''; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('loggedInEmail'); 
  }

  // Keep checking for changes (e.g., after login or logout)
  ngDoCheck(): void {
    this.userEmail = localStorage.getItem('loggedInEmail');
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInEmail');
    this.userEmail = null;
    this.router.navigate(['/login']);
  }
}
