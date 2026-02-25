import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { EmployeeAssetHistory } from '../models/asset.model'

@Injectable({ providedIn: 'root' })
export class EmployeeHistoryService {

  private mockData: EmployeeAssetHistory[] = [
  {
    id: 1,
    employeeName: 'Ravi Kumar',
    employeeId: 'EMP001',
    assetName: 'Dell Laptop',
    assetTag: 'DL-1001',
    assignedDate: '10-01-2025',
    status: 'ASSIGNED'
  },
  {
    id: 2,
    employeeName: 'Suresh',
    employeeId: 'EMP002',
    assetName: 'HP Monitor',
    assetTag: 'HP-2001',
    assignedDate: '2025-01-01',
    returnedDate: '2025-02-01',
    status: 'RETURNED'
  },
  {
    id: 3,
    employeeName: 'Priya Sharma',
    employeeId: 'EMP003',
    assetName: 'Lenovo ThinkPad',
    assetTag: 'LT-3001',
    assignedDate: '2025-02-15',
    status: 'ASSIGNED'
  },
  {
    id: 4,
    employeeName: 'Arun Kumar',
    employeeId: 'EMP004',
    assetName: 'iPhone 14',
    assetTag: 'IP-4001',
    assignedDate: '2025-01-20',
    returnedDate: '2025-02-10',
    status: 'RETURNED'
  },
  {
    id: 5,
    employeeName: 'Meena Lakshmi',
    employeeId: 'EMP005',
    assetName: 'Samsung Tablet',
    assetTag: 'ST-5001',
    assignedDate: '2025-03-01',
    status: 'ASSIGNED'
  },
  {
    id: 6,
    employeeName: 'Vikram Singh',
    employeeId: 'EMP006',
    assetName: 'MacBook Pro',
    assetTag: 'MB-6001',
    assignedDate: '2025-02-05',
    returnedDate: '2025-02-25',
    status: 'RETURNED'
  },
  {
    id: 7,
    employeeName: 'Anita Roy',
    employeeId: 'EMP007',
    assetName: 'Acer Laptop',
    assetTag: 'AL-7001',
    assignedDate: '2025-03-10',
    status: 'ASSIGNED'
  },
  {
    id: 8,
    employeeName: 'Karthik Raj',
    employeeId: 'EMP008',
    assetName: 'Logitech Keyboard',
    assetTag: 'LK-8001',
    assignedDate: '2025-01-18',
    returnedDate: '2025-02-05',
    status: 'RETURNED'
  },
  {
    id: 9,
    employeeName: 'Divya Nair',
    employeeId: 'EMP009',
    assetName: 'Dell Monitor',
    assetTag: 'DM-9001',
    assignedDate: '2025-02-28',
    status: 'ASSIGNED'
  },
  {
    id: 10,
    employeeName: 'Rahul Verma',
    employeeId: 'EMP010',
    assetName: 'HP Laptop',
    assetTag: 'HL-1010',
    assignedDate: '2025-03-12',
    status: 'ASSIGNED'
  }
];
private formatDate(date: string | Date): string {
  const parsedDate = new Date(date);

  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = parsedDate.getFullYear();

  return `${day}-${month}-${year}`;
}
  getHistory(
  page: number,
  pageSize: number,
  search: string,
  sortField: string,
  sortDirection: 'asc' | 'desc'
): Observable<{ data: any[]; total: number }> {

  let filtered = [...this.mockData];

  if (search) {
    filtered = filtered.filter(item =>
      item.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      item.assetName.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sortField) {
    filtered.sort((a: any, b: any) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      return sortDirection === 'asc'
        ? valueA > valueB ? 1 : -1
        : valueA < valueB ? 1 : -1;
    });
  }

  const total = filtered.length;

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const formatted = paginated.map(item => ({
    ...item,
    assignedDate: this.formatDate(item.assignedDate),
    returnedDate: item.returnedDate
      ? this.formatDate(item.returnedDate)
      : undefined
  }));

  return of({ data: formatted, total }).pipe(delay(500));
}

}