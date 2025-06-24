import { Component } from '@angular/core';
import { ApiServicesService } from '../../../services/api-services.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-listing',
  standalone: false,
  templateUrl: './task-listing.component.html',
  styleUrl: './task-listing.component.scss'
})
export class TaskListingComponent {

  taskList:any[] = []
  currentPage:number = 1;
  totalPage:number = 1;
  pageSize:number = 5;
  sortBy:string = 'name'
  sortOrder:string = 'asc' 

  filterForm!:FormGroup;
  searchText:string = ''


  constructor(private api:ApiServicesService,private fb:FormBuilder,private route:Router){}


  ngOnInit(){
    this.taskData();
    this.filter();
  }

  filter(){
    this.filterForm = this.fb.group({
      name:new FormControl(''),
      status:new FormControl(''),
      priority:new FormControl('')
    })
  }


  taskData(){
    
      this.api.get('task',{searchText:this.searchText,filter:this.filterForm?.value,limit:this.pageSize,page:this.currentPage,sortBy:this.sortBy,sortOrder:this.sortOrder}).subscribe(
      (res: any) => {
        this.taskList = res?.taskList;
        this.totalPage = res.totalPages 
        

      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  prevPage(){
    if(this.currentPage > 1){
      this.currentPage--;
      this.taskData()
    }
  }

  nextPage(){
    if(this.currentPage < this.totalPage){
      this.currentPage++;
      this.taskData()
    }
  }

  sortData(field:any){
    if(this.sortBy == field){
      this.sortOrder = this.sortOrder === 'asc' ?  "desc" :"asc"
    }else{
      this.sortBy = field
      this.sortOrder = 'asc'
    }

    this.taskData();
  }

  applyFilter(){
    this.currentPage = 1
    this.taskData()
  }

  clearFilter(){
    this.filterForm.reset();
    this.taskData();
  }

  searchFunction(){
    this.taskData()
  }

  addTask(){
    this.route.navigate(['main/task/add-task'])
  }

  updateTask(data:any){
    localStorage.removeItem('task')
    localStorage.setItem('task',JSON.stringify(data))

    this.route.navigate(['main/task/update-task'])
  }


}
