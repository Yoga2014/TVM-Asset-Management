import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Asset {
  name: string;
  id: string;
  category: string;
  assignedDate: string;
  status: 'Excellent' | 'Good' | 'Damaged';
}

@Injectable({
  providedIn: 'root'
})
export class AssetregisterService {

  private assetsSubject = new BehaviorSubject<Asset[]>([]);
  assets$ = this.assetsSubject.asObservable();

  addAsset(asset: Asset) {
    const currentAssets = this.assetsSubject.value;
    this.assetsSubject.next([...currentAssets, asset]);
  }

  getAssets(): Asset[] {
    return this.assetsSubject.value;
  }
}
