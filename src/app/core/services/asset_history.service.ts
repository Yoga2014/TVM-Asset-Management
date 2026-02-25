import { Injectable, signal, computed } from '@angular/core';
import { AssetHistory } from '../models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetHistoryService {

  private _history = signal<AssetHistory[]>([]);

  history = this._history.asReadonly();

  totalCount = computed(() => this._history().length);

  constructor() {
    this.seedDummyData();
  }

  private seedDummyData() {
    this._history.set([
      {
        id: '1',
        assetId: 'AST01',
        assetName: 'Laptop',
        imeiNumber: 'LPT10001',
        assignedTo: 'Arun',
        assignedFrom: new Date('2022-01-01'),
        assignedToDate: new Date('2023-01-01'),
        isAssigned: false,
        action: 'ASSIGNED',
        updatedBy: 'Admin',
        updatedAt: new Date(),
        remarks: 'Returned'
      },
      {
        id: '2',
        assetId: 'AST01',
        assetName: 'Laptop',
        imeiNumber: 'LPT10001',
        assignedTo: 'Ganesh',
        assignedFrom: new Date('2023-02-01'),
        isAssigned: true,
        action: 'ASSIGNED',
        updatedBy: 'Manager',
        updatedAt: new Date(),
        remarks: 'Current'
      },

      {
        id: '3',
        assetId: 'AST02',
        assetName: 'Mobile',
        imeiNumber: 'IMEI900001',
        assignedTo: 'Aiswariya',
        assignedFrom: new Date('2023-03-10'),
        assignedToDate: new Date('2024-01-10'),
        isAssigned: false,
        action: 'ASSIGNED',
        updatedBy: 'Admin',
        updatedAt: new Date(),
        remarks: 'Replaced'
      },
      {
        id: '4',
        assetId: 'AST02',
        assetName: 'Mobile',
        imeiNumber: 'IMEI900001',
        assignedTo: 'Ravi',
        assignedFrom: new Date('2024-02-01'),
        isAssigned: true,
        action: 'ASSIGNED',
        updatedBy: 'Manager',
        updatedAt: new Date(),
        remarks: 'Active'
      },

      {
        id: '5',
        assetId: 'AST03',
        assetName: 'Tablet',
        imeiNumber: 'TAB880022',
        assignedTo: 'Priya',
        assignedFrom: new Date('2022-06-01'),
        assignedToDate: new Date('2023-05-01'),
        isAssigned: false,
        action: 'ASSIGNED',
        updatedBy: 'Admin',
        updatedAt: new Date(),
        remarks: 'Returned'
      },
      {
        id: '6',
        assetId: 'AST03',
        assetName: 'Tablet',
        imeiNumber: 'TAB880022',
        assignedTo: 'Suresh',
        assignedFrom: new Date('2023-06-01'),
        isAssigned: true,
        action: 'ASSIGNED',
        updatedBy: 'Admin',
        updatedAt: new Date(),
        remarks: 'Current'
      },

      {
        id: '7',
        assetId: 'AST04',
        assetName: 'Laptop',
        imeiNumber: 'LPT50055',
        assignedTo: 'Meena',
        assignedFrom: new Date('2024-01-01'),
        isAssigned: true,
        action: 'ASSIGNED',
        updatedBy: 'Admin',
        updatedAt: new Date(),
        remarks: 'Development use'
      },

      {
        id: '8',
        assetId: 'AST05',
        assetName: 'Mobile',
        imeiNumber: 'IMEI223344',
        assignedTo: 'Karthik',
        assignedFrom: new Date('2024-02-10'),
        isAssigned: true,
        action: 'ASSIGNED',
        updatedBy: 'Manager',
        updatedAt: new Date(),
        remarks: 'Field team'
      },

      {
        id: '9',
        assetId: 'AST06',
        assetName: 'Laptop',
        imeiNumber: 'LPT660066',
        assignedTo: 'Divya',
        assignedFrom: new Date('2022-09-01'),
        assignedToDate: new Date('2023-12-31'),
        isAssigned: false,
        action: 'ASSIGNED',
        updatedBy: 'Admin',
        updatedAt: new Date(),
        remarks: 'Completed'
      },
      {
        id: '10',
        assetId: 'AST06',
        assetName: 'Laptop',
        imeiNumber: 'LPT660066',
        assignedTo: 'Rahul',
        assignedFrom: new Date('2024-01-01'),
        isAssigned: true,
        action: 'ASSIGNED',
        updatedBy: 'Manager',
        updatedAt: new Date(),
        remarks: 'Current'
      }
    ]);
  }
}