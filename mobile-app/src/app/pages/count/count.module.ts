import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';
import { CountPage } from './count.page';

const routes: Routes = [
  {
    path: '',
    component: CountPage,
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
  declarations: [CountPage]
})
export class CountPageModule {}
