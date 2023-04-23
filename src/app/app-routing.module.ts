import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'login',     component: LoginComponent},
  { path: 'home',      component: MainComponent },
  { path: '**',        redirectTo: '/home'      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
