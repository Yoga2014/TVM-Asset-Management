export interface Asset {
  id: number;
  name: string;
  status: 'ACTIVE' | 'ASSIGNED' | 'INACTIVE';
  assignedTo?: number;
}
