import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';
import { CountBeforePage } from './count-before.page';

const routes: Routes = [
  {
    path: '',
    component: CountBeforePage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CountBeforePage]
})
export class CountBeforePageModule {}
