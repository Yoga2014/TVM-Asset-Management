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
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
=======
>>>>>>> origin/main
  },

  {
    path: 'submission-list',
    loadComponent: () =>
      import('./../submission-list/submission-list/submission-list.component')
        .then(c => c.SubmissionListComponent)
  },
  {
    path:'raise-ticket',
    loadComponent: ()=>
    import('../raise-tickets/raise-tickets.component')
    .then(c=>c.RaiseTicketsComponent)
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> origin/main
  }
];
