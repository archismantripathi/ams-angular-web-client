import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';


import { MainComponent } from './main/main.component';

import { DashboardComponent } from './main/dashboard/dashboard.component';
import { UsersComponent } from './main/users/users.component';
import { DevicesComponent } from './main/devices/devices.component';
import { RoutinesComponent } from './main/routines/routines.component';
import { ExtensionsComponent } from './main/extensions/extensions.component';
import { ServicesComponent } from './main/services/services.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',
    component: MainComponent,
    children: [
      { path: 'dashboard',  component: DashboardComponent  },
      { path: 'users',      component: UsersComponent      },
      { path: 'devices',    component: DevicesComponent    },
      { path: 'routines',   component: RoutinesComponent   },
      { path: 'extensions', component: ExtensionsComponent },
      { path: 'services',   component: ServicesComponent   },
      { path: '**', redirectTo: '/dashboard' }
  ]},
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
