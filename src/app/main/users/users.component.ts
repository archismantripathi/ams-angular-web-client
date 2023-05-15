import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  uri: string ='http://127.0.0.1:3000/';
  users: User[]=[];
  loggedInUser = {
    username: localStorage.getItem('username'),
    name: localStorage.getItem('name'),
    type: this.getUserTypeText(),
  }
  constructor(private http: HttpClient) {}

  getUserTypeText(): string{
    if (localStorage.getItem('admin')=='true'){
      return 'ADMIN';
    }
    return 'USER';
  }

  ngOnInit(): void {

    this.http.get<{data: User[]}>(this.uri+'api/user').subscribe(data=>{
      this.users=data.data;
    });
  }
}
