import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';
import { CountConfigPage } from './count-config.page';

const routes: Routes = [
  {
    path: '',
    component: CountConfigPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [CountConfigPage]
})
export class CountConfigPageModule {}
