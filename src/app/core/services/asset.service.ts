import { Injectable, signal } from '@angular/core';
import { Asset } from '../models/asset.model';

@Injectable({ providedIn: 'root' })
export class AssetService {

  private _assets = signal<Asset[]>([
    { id: 1, name: 'Laptop - Dell', status: 'ACTIVE' },
    { id: 2, name: 'Mobile - Samsung', status: 'ACTIVE' },
    { id: 3, name: 'ID Card', status: 'INACTIVE' }
  ]);

  get assets() {
    return this._assets.asReadonly();
  }

  assignAsset(assetId: number, employeeId: number) {
    this.update(assetId, {
      status: 'ASSIGNED',
      assignedTo: employeeId
    });
  }

  changeStatus(assetId: number, status: Asset['status']) {
    this.update(assetId, { status });
  }

  deleteAsset(assetId: number) {
    this._assets.update(list =>
      list.filter(a => a.id !== assetId)
    );
  }

  private update(id: number, changes: Partial<Asset>) {
    this._assets.update(list =>
      list.map(asset =>
        asset.id === id ? { ...asset, ...changes } : asset
      )
    );
  }
}
