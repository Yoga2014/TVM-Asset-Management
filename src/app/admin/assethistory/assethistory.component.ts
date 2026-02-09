import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssetHistoryService } from '../../core/services/asset_history.service';

@Component({
  selector: 'app-asset-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assethistory.component.html',
  styleUrls: ['./assethistory.component.scss']
})
export class HistoryComponent {

  private assetHistoryService = inject(AssetHistoryService);

  assetHistory = this.assetHistoryService.history;

  searchText = signal('');
  selectedAssetId = signal<string | null>(null);

  // search
  filteredHistory = computed(() => {
    const term = this.searchText().toLowerCase();

    return this.assetHistory().filter(item =>
      item.assetId.toLowerCase().includes(term) ||
      item.assetName.toLowerCase().includes(term) ||
      item.imeiNumber.toLowerCase().includes(term) ||
      item.assignedTo?.toLowerCase().includes(term)
    );
  });

  // unique devices only
  uniqueAssets = computed(() => {
    const map = new Map();
    this.filteredHistory().forEach(a => map.set(a.assetId, a));
    return Array.from(map.values());
  });

  // history for selected
  selectedHistory = computed(() => {
    if (!this.selectedAssetId()) return [];
    return this.assetHistory().filter(h => h.assetId === this.selectedAssetId());
  });

  showHistory(id: string) {
    this.selectedAssetId.set(id);
  }

  closeHistory() {
    this.selectedAssetId.set(null);
  }
}