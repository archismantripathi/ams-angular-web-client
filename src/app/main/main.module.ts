import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    SidebarComponent,
    UsersComponent,
    DevicesComponent,
    RoutinesComponent,
    ExtensionsComponent,
    ServicesComponent,
    TopbarComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class MainModule { }
