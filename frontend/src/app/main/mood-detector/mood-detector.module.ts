import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MoodDetectorComponent } from './mood-detector/mood-detector.component';



const routes:Routes = [
  {path:'mood-listing',component:MoodDetectorComponent}
] 

@NgModule({
  declarations: [MoodDetectorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MoodDetectorModule { }
