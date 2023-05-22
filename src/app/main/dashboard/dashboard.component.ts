import { Component, OnInit } from '@angular/core';
import { Device } from '../devices/models/device.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar,
         MatSnackBarHorizontalPosition,
         MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { C0001Data } from './models/c0001.model';
import { Widget } from './models/widget.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  uri: string ='http://127.0.0.1:3000/api/';
  sync: boolean = true;
  devices: Device[] = [];
  widgets: Widget[] = [];

  state=true;
  today = Date.now();
  constructor(private http: HttpClient, private _snackBar: MatSnackBar){
    setInterval(() => {
      this.today = Date.now();
    }, 100);
    setInterval(() => {
      this.syncData();
    }, 9000);
  }

  setState(deviceId: string, deviceConnector: string, deviceIntensity: number, deviceState: boolean) {
    this.http.patch<{message: string}>(
      this.uri+'extension/'+deviceConnector+'/set/'+deviceId,{
        state: deviceState,
        intensity: deviceIntensity
    }).subscribe(data=>{
      // this.openSnackBar(data.message);
      this.syncData();
    });
  }

  async updateWidgets() {
    for (let i = 0; i < this.devices.length; i++) {
      const device = this.devices[i];
      let dataC0001: C0001Data;
      await this.http.get<{data: C0001Data}>(
        this.uri+'extension/'+device.deviceConnector+'/'+device.deviceId
      ).subscribe(data=>{
        dataC0001 = data.data;
        this.widgets[i] = {
          deviceId:          device.deviceId ,
          deviceName:        device.deviceName ,
          deviceConnector:   device.deviceConnector ,
          deviceStatus:      device.deviceStatus,
          state:             dataC0001.state,
          intensity:         dataC0001.intensity
        }
      })
    }
    this.sync = false;
  }
  async syncData() {
    this.sync = true;
    this.http.get<{ data: Device[] }>(this.uri+'device')
    .subscribe(data=>{
      this.devices = data.data;
      this.updateWidgets();
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

  ngOnInit(){
    this.syncData();
  }
}
