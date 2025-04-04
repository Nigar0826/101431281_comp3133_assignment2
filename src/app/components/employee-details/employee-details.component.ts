import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID } from '../../graphql/queries';
import { CommonModule } from '@angular/common'; 

@Component({
  standalone: true,
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  imports: [CommonModule]
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;
  loading = true;
  error: any;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apollo
        .watchQuery({
          query: GET_EMPLOYEE_BY_ID,
          variables: { id },
        })
        .valueChanges.subscribe({
          next: (result: any) => {
            this.employee = result?.data?.getEmployee;
            this.loading = result.loading;
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
          },
        });
    }
  }
}
