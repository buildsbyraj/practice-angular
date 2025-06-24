import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-frontend';

  constructor(private routes:Router){}

  routeUserList(){
    this.routes.navigate(['main/user'])
  }

   routeColor(){
    this.routes.navigate(['main/color'])
  }
}
