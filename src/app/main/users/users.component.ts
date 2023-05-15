import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './users.model';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  uri: string ='http://127.0.0.1:3000/';
  users: User[]=[];
  loggedInUser = { name: '', username: '', type: ''}
  constructor(private http: HttpClient, public authService: AuthService, private _snackBar: MatSnackBar) {}

  onUserDelete(username: string) {
    this.http.delete<any>(this.uri+'api/user/'+username).subscribe(data=>{
      this.openSnackBar(data.message);
      this.ngOnInit();
    });
  }

  onUserEdit(username: string) {
    console.log('edit works!');
    this.openSnackBar('edit works');
  }

  openSnackBar(subjectText: string) {
    this._snackBar.open(subjectText, '🫧 Got it!', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user=>this.loggedInUser=user);
    this.http.get<{data: User[]}>(this.uri+'api/user').subscribe(data=>{
      this.users=data.data;
    });
  }
}
