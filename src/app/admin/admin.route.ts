import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./admin-dashboard/admin-dashboard.component')
        .then(c => c.AdminDashboardComponent)
  },

 
  {
    path: 'assets',
    loadComponent: () =>
      import('./assets/assets.component')
        .then(c => c.AssetsComponent)
  },

 
  {
    path: 'assign',
    loadComponent: () =>
      import('./assignasset/assignasset.component')
        .then(c => c.AssignComponent)
  },

  
  {
    path: 'history',
    loadComponent: () =>
      import('./assethistory/assethistory.component')
        .then(c => c.HistoryComponent)
  },
    {
    path: 'asset-register',
    loadComponent: () =>
      import('../assetregister/assetregister/assetregister.component')
        .then(c => c.AssetregisterComponent)
  },
  {
    path:'asset-list',
    loadComponent: ()=>
    import('../asset-list/asset-list.component')
    .then(c=>c.AssetListComponent)
  }
];
