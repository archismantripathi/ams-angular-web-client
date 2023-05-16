import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/users-lagacy.model';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  uri: string ='http://127.0.0.1:3000/api/';
  users: User[]=[];
  loggedInUser = { name: '', username: '', type: ''}

  constructor(private http: HttpClient, public authService: AuthService, private _snackBar: MatSnackBar) {}

  onUserDelete(username: string) {
    this.http.delete<{message: string}>(this.uri+'user/'+username).subscribe(data=>{
      this.openSnackBar(data.message);
      this.ngOnInit();
    });
  }
  beforeConfirmDelete() {}

  editMode: boolean = false;
  editUsername: string = 'fff';
  _editedUsername: string = '';
  _editedName: string = '';
  _editedAdmin: boolean = false;
  onClickUserEdit(username: string) {
    this.http.get<{data: User}>(this.uri+'user/'+username).subscribe(data=>{
      this.editUsername = username;
      this._editedUsername = data.data.username;
      this._editedName = data.data.name;
      this._editedAdmin = data.data.admin;
      this.editMode = true;
    });
  }
  onUserEdit() {
    this.http.patch<{message: string}>(this.uri+'user/'+this.editUsername,{
      username: this._editedUsername,
      name: this._editedName,
      admin: this._editedAdmin,
    }).subscribe(data=>{
      this.openSnackBar(data.message);
      this.ngOnInit();
    });
    this.editMode=false;
  }

  yourProfileEditMode: boolean = false;
  changePassword: boolean = false;
  _editedPassword: string = '';
  _editedPasswordConfirm: string = '';
  onClickYourProfileEdit() {
    this._editedUsername = this.loggedInUser.username;
    this._editedName = this.loggedInUser.name;
    if(this.loggedInUser.type=='ADMIN')
      this._editedAdmin = true;
    else
      this._editedAdmin = false;
    this.yourProfileEditMode = true;
    this._editedPasswordConfirm = this._editedPassword = '';
  }
  onYourProfileEdit() {
    if(this.changePassword) {
      if(this._editedPassword!=this._editedPasswordConfirm || this._editedPassword==''){
        this.openSnackBar('❌ Passwords did not match or are empty!');
        this._editedPasswordConfirm = this._editedPassword = ''
        return;
      }
      this.http.patch<{message: string}>(this.uri+'user/'+this.loggedInUser.username,{
        username: this._editedUsername,
        name: this._editedName,
        password: this._editedPassword,
        admin: this._editedAdmin,
      }).subscribe(data=>{
        localStorage.setItem('username',this._editedUsername);
        this.openSnackBar(data.message);
        this.authService.refreshUser();
        this.ngOnInit();
      });
    } else {
      this.http.patch<{message: string}>(this.uri+'user/'+this.loggedInUser.username,{
        username: this._editedUsername,
        name: this._editedName,
        admin: this._editedAdmin,
      }).subscribe(data=>{
        localStorage.setItem('username',this._editedUsername);
        this.openSnackBar(data.message);
        this.authService.refreshUser();
        this.ngOnInit();
      });
    }
    this.changePassword = false;
    this.yourProfileEditMode = false;
  }

  addUserMode = false;
  _newUserUsername = '';
  _newUserName = '';
  _newUserAdmin = false;
  _newUserPassword = '';
  _newUserPasswordConfirm = '';
  onClickAddUser() {
    this._newUserUsername = ''+Date.now();
    this._newUserName = '';
    this._newUserAdmin = false;
    this._newUserPassword = '';
    this._newUserPasswordConfirm = '';
    this.addUserMode = true;
  }
  onAddUser() {
    if(this._newUserName == '') {
      this.openSnackBar('❌ Name can\'t be empty.');
      return;
    }
    if(this._newUserPassword!=this._newUserPasswordConfirm || this._newUserPassword==''){
      this.openSnackBar('❌ Passwords did not match or are empty!');
      this._newUserPasswordConfirm = this._newUserPassword = ''
      return;
    }
    this.http.post<{message: string}>(this.uri+'user',{
      username: this._newUserUsername,
      name: this._newUserName,
      password: this._newUserPassword,
      admin: this._newUserAdmin,
    }).subscribe(data=>{
      this.openSnackBar(data.message);
      this.addUserMode = false;
      this.ngOnInit();
    });
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 3;
  openSnackBar(subjectText: string) {
    this._snackBar.open(subjectText, '🫧 Got it!', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user=>this.loggedInUser=user);
    this.http.get<{data: User[]}>(this.uri+'user').subscribe(data=>{
      this.users=data.data;
    });
  }
}
