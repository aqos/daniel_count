import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CountConfigResolverService } from './services/count-config-resolver.service';
import { CountResolverService } from './services/count-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'register-success', loadChildren: './pages/register-success/register-success.module#RegisterSuccessPageModule' },
  { path: 'count-config', loadChildren: './pages/count-config/count-config.module#CountConfigPageModule',
    resolve: {
      data: CountConfigResolverService
    }
  },
  { path: 'count', loadChildren: './pages/count/count.module#CountPageModule',
    resolve: {
      data: CountResolverService
    }
  },
  {
    path: 'count-success', loadChildren: './pages/count-success/count-success.module#CountSuccessPageModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
