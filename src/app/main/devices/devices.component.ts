import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { Device } from './models/device.model';
import { Extension } from '../extensions/models/extension.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  uri: string ='http://127.0.0.1:3000/api/';
  devices: Device[]=[];
  extensions: Extension[]=[];
  deviceTypes: string[]=["Terminal"];

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  addDeviceMode: boolean = false;
  selectedConnector: string = "";
  _newDeviceId: string = "";
  _newDeviceType: string = "Terminal";
  _newDeviceName: string = "";
  _newDeviceDescription: string = "";
  _newDeviceIp: string = "";
  onClickAddDevice() {
    this.http.get<{data: Extension[]}>(this.uri+'extension').subscribe(data=>{
      this.extensions = data.data;
    });
    if(this.extensions.length<1) {
      this.openSnackBar('❌ No Extension Installed.');
      return;
    }
    this.selectedConnector = this.extensions[0].extensionId;
    this._newDeviceId = ''+Date.now();
    this._newDeviceType = "Terminal";
    this._newDeviceName = "";
    this._newDeviceDescription = "";
    this._newDeviceIp = "";
    this.addDeviceMode = true;
  }
  onAddDevice() {
    if(this._newDeviceId == "" || this._newDeviceName == "" || this._newDeviceIp == "") {
      this.openSnackBar("❌ Fields can't be empty.");
      return;
    }
    this.http.post<{message: string}>(this.uri+'extension/'+this.selectedConnector+'/'+this._newDeviceType,{
      deviceId: this._newDeviceId,
      deviceName: this._newDeviceName,
      deviceDescription: this._newDeviceDescription,
      deviceType: this._newDeviceType,
      deviceIp: this._newDeviceIp,
    }).subscribe(data=>{
      this.ngOnInit();
      this.addDeviceMode = false;
      this.openSnackBar(data.message);
    });
  }

  editMode: boolean = false;
  _updateDeviceName: string = "";
  _updateDeviceIp: string = "";
  _updateDeviceDescription: string = "";
  onClickConfigure(device: Device) {
    this.selectedConnector = device.deviceConnector;
    this._newDeviceId = device.deviceId;
    this._newDeviceType = device.deviceType;
    this._updateDeviceName = device.deviceName;
    this._updateDeviceDescription = device.deviceDescription;
    this._updateDeviceIp = device.deviceIp;
    this.editMode = true;
  }
  onConfigure() {
    if(this._updateDeviceName == "" || this._updateDeviceIp == "") {
      this.openSnackBar("❌ Fields can't be empty.");
    }
    this.http.patch<{message: string}>(this.uri+'extension/'+this.selectedConnector+'/'+this._newDeviceId,{
      deviceName: this._updateDeviceName,
      deviceDescription: this._updateDeviceDescription,
      deviceIp: this._updateDeviceIp,
    }).subscribe(data=>{
      this.openSnackBar(data.message);
      this.editMode = false;
      this.ngOnInit();
    });
  }

  onClickRemove(deviceId: string, deviceConnector: string) {
    this.onDeviceDelete(deviceId, deviceConnector);
  }
  onDeviceDelete(deviceId: string, deviceConnector: string) {
    this.http.delete<{message: string}>(this.uri+'extension/'+deviceConnector+'/'+deviceId).subscribe(data=>{
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
    this.http.get<{data: Extension[]}>(this.uri+'extension').subscribe(data=>{
      this.extensions = data.data;
    });
  }
}
