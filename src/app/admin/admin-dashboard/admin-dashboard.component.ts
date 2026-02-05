import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTableModule,CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  // Sample Data
  summary = [
    { title: 'Total Assets', value: 1250 },
    { title: 'Assets in Use', value: 430 },
    { title: 'Available Assets', value: 720 },
    { title: 'Maintenance Required', value: 25 },
    { title: 'Total Users', value: 150 }
  ];

  recentActivities = [
    { asset: 'Laptop A123', employee: 'John Smith', action: 'Assigned', date: '2024-04-20' },
    { asset: 'Printer X200', employee: 'Emily Clark', action: 'Returned', date: '2024-04-18' },
    { asset: 'Projector P45', employee: 'David Lee', action: 'Maintenance', date: '2024-04-17' },
    { asset: 'Tablet T789', employee: 'Sarah Miller', action: 'Checked In', date: '2024-04-16' }
  ];

  displayedColumns: string[] = ['asset', 'employee', 'action', 'date'];
}
