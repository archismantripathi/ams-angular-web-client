import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../main/users/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri='http://127.0.0.1:3000/';
  _user = new BehaviorSubject<any>({
    username: localStorage.getItem('username'),
    name: localStorage.getItem('name'),
    type: localStorage.getItem('admin'),
  });
  user = this._user.asObservable();
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
        let userTypeString: string = 'USER';
        if(data.data.admin)
          userTypeString='ADMIN';
        localStorage.setItem('admin', userTypeString);

        this._user.next({
          username: data.data.username,
          name: data.data.name,
          type: userTypeString,
        });
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
    this._user.next({
      username: '',
      name: '',
      type: '',
    });
  }
}

