import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [

  // /employee → Dashboard / My Assets
  {
    path: '',
    loadComponent: () =>
      import('./employee-dashboard/employee-dashboard.component')
        .then(c => c.EmployeeDashboardComponent)
  },

  // /employee/history
  {
    path: 'history',
    loadComponent: () =>
      import('./employee-history/employee-history.component')
        .then(c => c.HistoryComponent)
  }
];
