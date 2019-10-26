import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'register-success', loadChildren: './pages/register-success/register-success.module#RegisterSuccessPageModule' },
  { path: 'count-before', loadChildren: './pages/count-before/count-before.module#CountBeforePageModule' },
  { path: 'count-config', loadChildren: './pages/count-config/count-config.module#CountConfigPageModule' },
  { path: 'count', loadChildren: './pages/count/count.module#CountPageModule' },
  { path: 'chart', loadChildren: './pages/chart/chart.module#ChartPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
