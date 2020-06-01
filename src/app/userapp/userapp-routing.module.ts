import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserappComponent } from './userapp.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';

const routes: Routes = 
[
{path:'userdashboard/:username',component:UserdashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserappRoutingModule { }
