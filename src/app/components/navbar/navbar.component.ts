import { Component, OnInit } from '@angular/core'; 
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
export class NavbarComponent implements OnInit {
  userEmail: string | null = ''; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('loggedInEmail'); 
  }

  logout() {
    localStorage.removeItem('authToken');       
    localStorage.removeItem('loggedInEmail');   
    this.router.navigate(['/login']);           
  }
}
