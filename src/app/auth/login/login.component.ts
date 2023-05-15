import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent{
  username: string ='';
  password: string ='';
  invalidUsername: boolean = false;
  invalidPassword: boolean = false;

  constructor(public authService: AuthService) {}

  async onLogin(){
    this.onInputUsername();
    this.onInputPassword();
    if(!this.invalidPassword&&!this.invalidUsername) {
      this.authService.login(this.username, this.password);
    }
  }
  async onInputUsername(){
    this.invalidUsername=(this.username == "");
  }
  async onInputPassword(){
    this.invalidPassword=(this.password == "");
  }
}
