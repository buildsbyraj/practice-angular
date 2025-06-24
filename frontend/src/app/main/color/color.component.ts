import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ApiServicesService } from "../../services/api-services.service";


@Component({
  selector: 'app-color',
  standalone: false,
  templateUrl: './color.component.html',
})


export class ColorComponent{
  colorData!: any;

  constructor(private route: Router, private api: ApiServicesService) { }

  ngOnInit() {
    this.getColorData();
  }


  onChange(color: string) {
    let colorValue = color.toLowerCase();

    // Set color based on selection
    document.documentElement.style.setProperty('--primary-color', colorValue);

    // Optional: change background or text color based on the selected theme
    switch (colorValue) {
      case 'blue':
        document.documentElement.style.setProperty('--background-color', '#e0f0ff');
        document.documentElement.style.setProperty('--text-color', '#003366');
        break;
      case 'red':
        document.documentElement.style.setProperty('--background-color', '#ffe0e0');
        document.documentElement.style.setProperty('--text-color', '#660000');
        break;
      case 'yellow':
        document.documentElement.style.setProperty('--background-color', '#fffde0');
        document.documentElement.style.setProperty('--text-color', '#665500');
        break;
      default:
        break;
    }
  }


  getColorData() {
    this.api.getData('/color').subscribe((response: any) => {
      this.colorData = response
    })
  }

    
}