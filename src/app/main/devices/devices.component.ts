import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { Device } from './models/device.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  uri: string ='http://127.0.0.1:3000/api/';
  devices: Device[]=[];

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  onClickAddDevice() {
    this.openSnackBar('Method not implemented.');
  }

  onClickConfigure(deviceId: string) {
    this.openSnackBar('Method not implemented.');
  }

  onClickRemove(deviceId: string) {
    this.onDeviceDelete(deviceId);
  }
  onDeviceDelete(deviceId: string) {
    this.http.delete<{message: string}>(this.uri+'device/'+deviceId).subscribe(data=>{
      this.openSnackBar(data.message);
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
    this.http.get<{data: Device[]}>(this.uri+'device').subscribe(data=>{
      this.devices = data.data;
    });
  }
}
