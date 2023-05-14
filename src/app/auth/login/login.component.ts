import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login } from './login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string ='';
  password: string ='';

  constructor(
    private http: HttpClient,
    private router: Router ) {}

  async onLogin(){
    this.http.post<login>('http://127.0.0.1:3000/auth/signin',{
      username: this.username,
      password: this.password
    }).subscribe(data=>{
      localStorage.setItem('auth-token',data.token);
      this.router.navigate(['/']);
    });
  }
}
