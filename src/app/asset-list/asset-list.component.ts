import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Asset, AssetregisterService } from '../assetregister.service';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asset-list.component.html',
  styleUrl: './asset-list.component.scss'
})
export class AssetListComponent implements OnInit {

  search: string = '';
  category: string = 'All';

  assets: Asset[] = []

  constructor(private assetService: AssetregisterService) {}

  ngOnInit(): void {
    this.assetService.assets$.subscribe(data => {
      this.assets = data;
    });
  }

  get filteredAssets(): Asset[] {
    return this.assets.filter(asset =>
      asset.name.toLowerCase().includes(this.search.toLowerCase()) &&
      (this.category === 'All' || asset.category === this.category)
    );
  }
}
