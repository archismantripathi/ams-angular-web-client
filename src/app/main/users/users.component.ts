import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './users.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  uri: string ='http://127.0.0.1:3000/';
  users: User[]=[];
  loggedInUser = { name: '', username: '', type: ''}

  constructor(private http: HttpClient, public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user=>this.loggedInUser=user);
    this.http.get<{data: User[]}>(this.uri+'api/user').subscribe(data=>{
      this.users=data.data;
    });
  }
}
