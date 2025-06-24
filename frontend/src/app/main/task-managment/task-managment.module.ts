import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskListingComponent } from './task-listing/task-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';


const routes:Routes = [
  {path:"task-listing",component:TaskListingComponent},
  {path:"add-task",component:AddTaskComponent},
  {path:"update-task",component:UpdateTaskComponent},

]

@NgModule({
  declarations: [TaskListingComponent,AddTaskComponent,UpdateTaskComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgFor,
    FormsModule,
    
  ]
})
export class TaskManagmentModule { }
