import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    AppRoutingModule
  ],
  exports:
  [
    LoginComponent
  ]
})
export class AuthModule { }
