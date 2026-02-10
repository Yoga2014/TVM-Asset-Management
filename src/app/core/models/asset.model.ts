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
