import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from '../../../services/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {


  taskForm!:FormGroup;
  statusData!:any;
  priorityData!:any;

  constructor(private api:ApiServicesService,private fb:FormBuilder,private route:Router){}


  ngOnInit(){
    this.taskInitalForm();
    this.getData();
  }

  getData(){
    this.api.get('/task-status').subscribe((response:any) =>{
      this.statusData = response

      console.log(this.statusData);
      
    })

    this.api.get('/task-priority').subscribe((response:any) =>{
      this.priorityData = response
    })
  }

  taskInitalForm(){
    this.taskForm = this.fb.group({
      name:new FormControl('',[Validators.required]),
      task_status_id:new FormControl('',[Validators.required]),
      task_priority_id:new FormControl('',[Validators.required]),
    })
  }



  taskApi(){
    console.log(this.taskForm.value);
    if(this.taskForm.valid){
      this.api.addData('/add-task',this.taskForm.value).subscribe((response:any) =>{
        if(response){
          this.route.navigate(['main/task/task-listing'])
        }
      })
    }
    
  }

}
