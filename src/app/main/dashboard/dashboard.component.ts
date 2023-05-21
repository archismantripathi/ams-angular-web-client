import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  today = Date.now();
  constructor(){
    setInterval(() => {
      this.today = Date.now();
    }, 100);
  }
}
