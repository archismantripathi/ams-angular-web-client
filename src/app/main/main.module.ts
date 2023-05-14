import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { DevicesComponent } from './devices/devices.component';
import { RoutinesComponent } from './routines/routines.component';
import { ExtensionsComponent } from './extensions/extensions.component';
import { ServicesComponent } from './services/services.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    SidebarComponent,
    UsersComponent,
    DevicesComponent,
    RoutinesComponent,
    ExtensionsComponent,
    ServicesComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    AngularMaterialModule,
    SharedModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class MainModule { }
