import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from '../../../services/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  standalone: false,
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent {

  taskForm!:FormGroup
  taskData!:any
   statusData!:any;
  priorityData!:any;

  constructor(private api:ApiServicesService,private route:Router,private fb:FormBuilder){

  }

  ngOnInit(){
    const data = localStorage.getItem('task')

    if(data){
      this.taskData = JSON.parse(data)
    }

    this.taskInitalForm();
    this.getData();
  }

  getData(){
        this.api.get('/task-status').subscribe((response:any) =>{
      this.statusData = response      
    })

    this.api.get('/task-priority').subscribe((response:any) =>{
      this.priorityData = response
    })
  }


  taskInitalForm(){
    this.taskForm = this.fb.group({
      name : new FormControl(this.taskData ? this.taskData?.name : '',[Validators.required]),
      task_status_id : new FormControl(this.taskData ? this.taskData?.task_status_id : '',[Validators.required]),
      task_priority_id : new FormControl(this.taskData ? this.taskData?.task_priority_id : '',[Validators.required]),
    })
  }

  updateTask(){
    if(this.taskForm.valid){
      this.api.updateData('update-task',this.taskData?.id,this.taskForm.value).subscribe((response:any)=>{
        if(response){
          this.route.navigate(['main/task/task-listing'])
        }
      })
    }
    
  }
}
