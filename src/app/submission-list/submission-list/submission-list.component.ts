import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Submission {
  employeeId: number;
  employeeName: string;
  assetName: string;
  submittedDate: string;
}


@Component({
  selector: 'app-submission-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './submission-list.component.html',
  styleUrls: ['./submission-list.component.scss']
})
export class SubmissionListComponent implements OnInit {

  displayedColumns: string[] = ['employee', 'asset', 'date'];

  searchText: string = '';
  fromDate: string = '';
  toDate: string = '';

  sortAsc: boolean = false;

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  allSubmissions: Submission[] = [];
  filteredSubmissions: Submission[] = [];
  paginatedData: Submission[] = [];

  loggedInRole: string = '';
  loggedInEmployeeId: number | null = null;
  role: 'ADMIN' | 'EMPLOYEE' = 'EMPLOYEE'; 


  ngOnInit(): void {

    this.loggedInRole = localStorage.getItem("role") || "";
    const empId = localStorage.getItem("employeeId");

    this.loggedInEmployeeId = empId ? Number(empId) : null;

    this.allSubmissions = [
      { employeeId: 101, employeeName: 'Ravi', assetName: 'Keyboard', submittedDate: '2024-04-25' },
      { employeeId: 102, employeeName: 'Priya', assetName: 'Monitor', submittedDate: '2024-04-20' },
      { employeeId: 103, employeeName: 'Sharmila J', assetName: 'Access Card', submittedDate: '2024-04-15' },
      { employeeId: 104, employeeName: 'David Kumar', assetName: 'Laptop', submittedDate: '2024-04-10' },
      { employeeId: 105, employeeName: 'Michael Lee', assetName: 'Mobile Phone', submittedDate: '2024-04-05' },
      { employeeId: 101, employeeName: 'Ravi', assetName: 'Mouse', submittedDate: '2024-04-01' }
    ];

    this.applyFilters();
  }

  applyFilters(): void {

    const search = this.searchText.trim().toLowerCase();

    let roleFilteredData = [...this.allSubmissions];

    if (this.loggedInRole === "EMPLOYEE" && this.loggedInEmployeeId) {
      roleFilteredData = roleFilteredData.filter(
        (item) => item.employeeId === this.loggedInEmployeeId
      );
    }

    this.filteredSubmissions = roleFilteredData.filter((item) => {

      const matchSearch =
        !search ||
        item.employeeName.toLowerCase().includes(search) ||
        item.assetName.toLowerCase().includes(search);

      const submittedDate = new Date(item.submittedDate).getTime();
      const from = this.fromDate ? new Date(this.fromDate).getTime() : null;
      const to = this.toDate ? new Date(this.toDate).getTime() : null;

      const matchFrom = !from || submittedDate >= from;
      const matchTo = !to || submittedDate <= to;

      return matchSearch && matchFrom && matchTo;
    });

    this.sortFiltered();
    this.currentPage = 1;
    this.updatePagination();
  }

  sortFiltered(): void {
    this.filteredSubmissions.sort((a, b) => {
      const da = new Date(a.submittedDate).getTime();
      const db = new Date(b.submittedDate).getTime();
      return this.sortAsc ? da - db : db - da;
    });
  }

  toggleSort(): void {
    this.sortAsc = !this.sortAsc;
    this.sortFiltered();
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filteredSubmissions.length / this.pageSize));

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.filteredSubmissions.slice(startIndex, startIndex + this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  clearFilters(): void {
    this.searchText = '';
    this.fromDate = '';
    this.toDate = '';
    this.sortAsc = false;
    this.applyFilters();
  }

  exportToCSV(): void {
    const rows = [
      ['Employee', 'Asset', 'Submitted Date'],
      ...this.filteredSubmissions.map(x => [x.employeeName, x.assetName, x.submittedDate])
    ];

    const csvContent = rows
      .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `submission_list_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  clearSearch(): void {
    this.searchText = '';
    this.applyFilters();
  }
}

