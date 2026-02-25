import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { Employee } from '../../core/models/employee.model';
import { PerformanceChartComponent } from '../performance-chart.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    PerformanceChartComponent
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  employee!: Employee;
  profileForm!: FormGroup;

  performanceData = [
    { month: 'Jan', score: 72 },
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 85 }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Normally from API (logged-in user)
    this.employee = {
      id: 1,
      name: 'John Doe',
      email: 'john@company.com',
      department: 'IT',
      role: 'EMPLOYEE',
      joiningDate: '2022-03-01',
      status: 'ACTIVE'
    };

    this.profileForm = this.fb.group({
      name: [this.employee.name],
      email: [this.employee.email],
      department: [this.employee.department]
    });
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const updatedEmployee = {
        ...this.employee,
        ...this.profileForm.value
      };

      console.log('Updated Employee:', updatedEmployee);
      // call API here
    }
  }
}
