import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})

export class TopbarComponent implements OnInit {
  name: string = '';
  constructor(public authService: AuthService) {}
  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user=>this.name=user.name);
  }
}
