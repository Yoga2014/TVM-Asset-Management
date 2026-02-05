import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  // Role-based signals
  isAdmin = computed(() => this.auth.user?.role === 'ADMIN');
  isEmployee = computed(() => this.auth.user?.role === 'EMPLOYEE');

  // Assets submenu toggle
  isAssetsOpen = signal(false);

  constructor(private auth: AuthService) {}

  toggleAssets() {
    this.isAssetsOpen.update(v => !v);
  }
}
