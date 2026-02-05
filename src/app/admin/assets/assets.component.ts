import { Component } from '@angular/core';
import { AssetregisterComponent } from "../../assetregister/assetregister/assetregister.component";

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [AssetregisterComponent],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss'
})
export class AssetsComponent {

}
