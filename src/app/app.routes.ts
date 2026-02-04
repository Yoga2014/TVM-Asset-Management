import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LoginComponent } from './auth/login/login.component';

export const appRoutes: Routes = [
   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  { path: 'login', component:LoginComponent },

  {
    path: '',
    loadComponent: () => import('./layout/layout/layout.component').then(c => c.LayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        canActivate: [RoleGuard],
        data: { role: 'ADMIN' },
        loadChildren: () => import('./admin/admin.route').then(r => r.ADMIN_ROUTES)
      },
      {
        path: 'employee',
        canActivate: [RoleGuard],
        data: { role: 'EMPLOYEE' },
        loadChildren: () => import('./employee/employee.route').then(r => r.EMPLOYEE_ROUTES)
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];