import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundAnimationComponent } from './background-animation/background-animation.component';



@NgModule({
  declarations: [
    BackgroundAnimationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackgroundAnimationComponent
  ]
})
export class SharedModule { }
