import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserappRoutingModule } from './userapp-routing.module';
import { UserappComponent } from './userapp.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';


@NgModule({
  declarations: [UserappComponent, UserdashboardComponent],
  imports: [
    CommonModule,
    UserappRoutingModule
  ]
})
export class UserappModule { }
