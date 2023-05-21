import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Extension } from './models/extension.model';

@Component({
  selector: 'app-extensions',
  templateUrl: './extensions.component.html',
  styleUrls: ['./extensions.component.scss']
})
export class ExtensionsComponent implements OnInit {
  uri: string ='http://127.0.0.1:3000/api/extension';
  extensions: Extension[]=[];

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  onClickConfigure(deviceId: string) {
    this.openSnackBar('Method not implemented.');
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
    this.http.get<{data: Extension[]}>(this.uri).subscribe(data=>{
      this.extensions = data.data;
    });
  }
}
