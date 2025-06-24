import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorComponent } from './color/color.component';


const routes:Routes = [
  {
    path:"user" , component:UserComponent
  },
    {
    path:"color" , component:ColorComponent
  },
  {
    path:'task',loadChildren :() => import('./task-managment/task-managment.module').then(m => m.TaskManagmentModule)
  },
  {
    path:"mood",loadChildren : () => import('./mood-detector/mood-detector.module').then(m => m.MoodDetectorModule)
  }
]

@NgModule({
  declarations: [UserComponent,ColorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgFor,
  ]
})
export class MainModule { }
