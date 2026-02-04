import { CommonModule } from '@angular/common';
import { Component, computed} from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isAdmin = computed(() => this.auth.user?.role === 'ADMIN');
  isEmployee = computed(() => this.auth.user?.role === 'EMPLOYEE');

  constructor(private auth: AuthService) {}
   
}
