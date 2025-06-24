import { Component } from '@angular/core';
import { ApiServicesService } from '../../services/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  userData!:any;
  constructor (private api:ApiServicesService,private route:Router){}

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.api.getData().subscribe((res:any) =>{
      this.userData = res?.userList      
    })
  }

  task(){
    console.log('fadfadfasf');
    
    this.route.navigate(['main/task/task-listing'])
  }
}
