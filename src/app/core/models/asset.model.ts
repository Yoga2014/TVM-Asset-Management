export interface Asset {
  id: number;
  name: string;
  status: 'ACTIVE' | 'ASSIGNED' | 'INACTIVE';
  assignedTo?: number;
}

export interface AssetHistory {
  id: string;
  assetId: string;

  assetName: string;
  imeiNumber: string;

  assignedTo?: string;

  assignedFrom?: Date;
  assignedToDate?: Date;

  isAssigned: boolean;

  action: string;

  updatedBy: string;
  updatedAt: Date;

  remarks?: string;
}


export interface EmployeeAssetHistory {
  id: number;
  employeeName: string;
  employeeId: string;
  assetName: string;
  assetTag: string;
  assignedDate: string;
  returnedDate?: string;
  status: 'ASSIGNED' | 'RETURNED';
}