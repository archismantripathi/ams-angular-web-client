import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { Routine } from './models/routine.model';
import { Device } from '../devices/models/device.model';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.scss']
})
export class RoutinesComponent implements OnInit{
  uri: string ='http://127.0.0.1:3000/api/';
  routines: Routine[] = [];
  devices: Device[]=[];

  hh: string[] = ['01','02','04','05','06','07','08','09'];
  mm: string[] = ['00','01','02','04','05','06','07','08','09'];
  a: string[] = ['AM','PM'];
  selectedDevice: string = '';
  _routineId: string = '';
  _routineName: string = '';
  _routineDescription: string = '';
  _routineStartTimeHH: string = '';
  _routineStartTimeMM: string = '';
  _routineStartTimeA: string = '';
  _routineEndTimeHH: string = '';
  _routineEndTimeMM: string = '';
  _routineEndTimeA: string = '';
  _routineDeviceState: boolean = true;
  _routineDeviceIntensity: Number = 100;
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    for (let i = 10; i < 60; i++) {
      this.mm.push(''+i);
    }
    for (let i = 10; i < 13; i++) {
      this.hh.push(''+i);
    }
  }

  addMode: boolean = false;
  onClickAdd() {
    this.selectedDevice = '';
    this._routineId = ''+Date.now();
    this._routineName = '';
    this._routineDescription = '';
    this.selectedDevice = '';
    this._routineStartTimeHH = '';
    this._routineStartTimeMM = '';
    this._routineStartTimeA = '';
    this._routineEndTimeHH = '';
    this._routineEndTimeMM = '';
    this._routineEndTimeA = '';
    this._routineDeviceState = true;
    this._routineDeviceIntensity = 100;
    this.addMode = true;
  }
  onAdd() {
    if(
      this._routineId == "" ||
      this._routineName == "" ||
      this.selectedDevice == "" ||
      this._routineStartTimeHH == "" ||
      this._routineStartTimeMM == "" ||
      this._routineStartTimeA == "" ||
      this._routineEndTimeHH == "" ||
      this._routineEndTimeMM == "" ||
      this._routineEndTimeA == "" ||
      this._routineDeviceIntensity
    ) {
      this.openSnackBar("❌ Fields can't be empty.");
    }

    this.http.patch<{message: string}>(this.uri+'routine/'+this._routineId,{

      routineId: this._routineId,
      routineName: this._routineName,
      routineDescription: this._routineDescription,
      routineDevice: this.selectedDevice,

      startTime:  this._routineStartTimeHH+':'+
                  this._routineStartTimeMM+' '+
                  this._routineStartTimeA,

      endTime:    this._routineEndTimeHH+':'+
                  this._routineEndTimeMM+' '+
                  this._routineEndTimeA,

      state: this._routineDeviceState,
      intensity: this._routineDeviceIntensity

    }).subscribe(data=>{
      this.openSnackBar(data.message);
      this.editMode = false;
      this.ngOnInit();
    });
  }

  editMode: boolean = false;
  onClickEdit(routineId: string) {
    this.http.get<{data: Routine}>(this.uri+'routine/'+routineId).subscribe(data=>{
      this.selectedDevice = data.data.routineDevice;
      this._routineId = data.data.routineId;
      this._routineName = data.data.routineName;
      this.selectedDevice = data.data.routineDevice;
      this._routineDescription = data.data.routineDescription;
      this._routineStartTimeHH = data.data.startTime.split(':')[0];
      this._routineStartTimeMM = data.data.startTime.split(':')[1].split(' ')[0];
      this._routineStartTimeA = data.data.startTime.split(':')[1].split(' ')[1];
      this._routineEndTimeHH = data.data.endTime.split(':')[0];
      this._routineEndTimeMM = data.data.endTime.split(':')[1].split(' ')[0];
      this._routineEndTimeA = data.data.endTime.split(':')[1].split(' ')[1];
      this._routineDeviceState = data.data.state;
      this._routineDeviceIntensity = data.data.intensity;
      this.editMode = true;
    });
  }
  onEdit() {
    if(
        this._routineName == "" ||
        this._routineStartTimeHH == "" ||
        this._routineStartTimeMM == "" ||
        this._routineStartTimeA == "" ||
        this._routineEndTimeHH == "" ||
        this._routineEndTimeMM == "" ||
        this._routineEndTimeA == "" ||
        this._routineDeviceIntensity
      ) {
      this.openSnackBar("❌ Fields can't be empty.");
    }

    this.http.patch<{message: string}>(this.uri+'routine/'+this._routineId,{

      routineName: this._routineName,
      routineDescription: this._routineDescription,

      startTime:  this._routineStartTimeHH+':'+
                  this._routineStartTimeMM+' '+
                  this._routineStartTimeA,

      endTime:    this._routineEndTimeHH+':'+
                  this._routineEndTimeMM+' '+
                  this._routineEndTimeA,

      state: this._routineDeviceState,
      intensity: this._routineDeviceIntensity

    }).subscribe(data=>{
      this.openSnackBar(data.message);
      this.editMode = false;
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

  ngOnInit() {
    this.http.get<{data: Routine[]}>(this.uri+'routine').subscribe(data=>{
      this.routines = data.data;
    });
    this.http.get<{data: Device[]}>(this.uri+'device').subscribe(data=>{
      this.devices = data.data;
    });
  }
}
