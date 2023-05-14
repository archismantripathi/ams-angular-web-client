import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './auth/login/login.component';


import { MainComponent } from './main/main.component';

import { DashboardComponent } from './main/dashboard/dashboard.component';
import { UsersComponent } from './main/users/users.component';
import { DevicesComponent } from './main/devices/devices.component';
import { RoutinesComponent } from './main/routines/routines.component';
import { ExtensionsComponent } from './main/extensions/extensions.component';
import { ServicesComponent } from './main/services/services.component';
import { LoginGuard } from './auth/login/login.guard';

const routes: Routes = [
  { path: 'login',
    component: LoginComponent,
    canActivate:[LoginGuard]
  },
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
    ],
      canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoginGuard]
})
export class AppRoutingModule { }
