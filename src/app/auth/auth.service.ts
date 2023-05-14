import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = localStorage.getItem('auth-token');
  uri='http://127.0.0.1:3000/';
  constructor(private http: HttpClient, private router: Router) {}

  getIsAuth() {
    if(this.token) {
      return true;
    } else {
      return false;
    }
  }

  login(username: string, password: string) {
    this.http.post<{token: string}>(this.uri+'auth/signin',{
    username: username,
    password: password,
    }).subscribe(data=>{
      localStorage.setItem('auth-token',data.token);
      this.token = data.token;
      this.router.navigate(['/']);
    });
  }
}

