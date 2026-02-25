import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EmployeeHistoryService } from '../../core/services/employee-history.service';
import { EmployeeAssetHistory } from '../../core/models/asset.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-history.component.html',
  styleUrl: './employee-history.component.scss'
})
export class HistoryComponent implements OnInit {

  data: EmployeeAssetHistory[] = [];
  totalRecords = 0;
  loading = false;

  searchText = '';

  private page$ = new BehaviorSubject<number>(1);
  private pageSize$ = new BehaviorSubject<number>(5);
  private search$ = new BehaviorSubject<string>('');
  private sortField$ = new BehaviorSubject<string>('assignedDate');
  private sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('desc');

  constructor(private service: EmployeeHistoryService) {}

  ngOnInit(): void {
    combineLatest([
      this.page$,
      this.pageSize$,
      this.search$,
      this.sortField$,
      this.sortDirection$
    ])
    .pipe(
      switchMap(([page, pageSize, search, sortField, sortDirection]) => {
        this.loading = true;
        return this.service.getHistory(
          page,
          pageSize,
          search?.trim(),   // ✅ trim spaces
          sortField,
          sortDirection
        );
      })
    )
    .subscribe({
      next: response => {
        this.data = response.data;
        this.totalRecords = response.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.page$.next(1);
    this.search$.next(this.searchText);
  }

  onSort(field: string) {
    const current = this.sortDirection$.value;
    this.sortField$.next(field);
    this.sortDirection$.next(current === 'asc' ? 'desc' : 'asc');
  }

  onPageChange(page: number) {
    this.page$.next(page);
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize$.value);
  }
}