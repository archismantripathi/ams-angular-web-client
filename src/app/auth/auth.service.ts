import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri='http://127.0.0.1:3000/';
  constructor(private http: HttpClient, private router: Router) {}

  getIsAuth() {
    if(localStorage.getItem('auth-token')) {
      this.refreshUser();
      return true;
    } else {
      return false;
    }
  }

  refreshUser() {
    this.http.get<{data: {username: string, name: string, admin: any}}>(
      this.uri+'api/user/'+localStorage.getItem('username')
      ).subscribe(data=>{
        localStorage.setItem('username', data.data.username);
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('admin', data.data.admin);
    });
  }

  login(username: string, password: string) {
    this.http.post<{token: string}>(this.uri+'auth/signin',{
    username: username,
    password: password,
    }).subscribe(data=>{
      localStorage.setItem('username', username);
      localStorage.setItem('auth-token',data.token);
      this.refreshUser();
      this.router.navigate(['/dashboard']);
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

