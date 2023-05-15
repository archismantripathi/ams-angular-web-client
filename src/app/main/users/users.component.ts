import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  uri='http://127.0.0.1:3000/';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.uri+'api/user').subscribe(data=>{
      console.log(data);
    });
  }
}
