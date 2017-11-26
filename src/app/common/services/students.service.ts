import {Injectable} from '@angular/core';
import { Student,UpsertStudent } from '../models/index';
import {Observable} from 'rxjs/Observable';
import {ApiService} from './api.service'
import {HubConnection} from '@aspnet/signalr-client'
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import  'rxjs/add/operator/takeWhile'
import { Response } from '@angular/http';

@Injectable()
export class StudentsService {
  private _data: BehaviorSubject<Student[]> = new BehaviorSubject(null);
  public currentClassId: string;
  get data(): Observable<Student[]> {
    return this._data;
  }
  constructor(private apiService: ApiService) {
    this.signrl();

  }
  clear(){
    this._data.next(null);
  }
  change(classId: string){
    this.currentClassId = classId;
    this.apiService.get<Student[]>(`classes/${this.currentClassId}/students`)
      .subscribe(res => this._data.next(res))
  }
  addStudent( classId: string, body:UpsertStudent ): Observable<Response> {
    return this.apiService.post(`classes/${this.currentClassId}/students`,body);
  }
  updateStudent( classId: string,studentId: string, body:UpsertStudent): Observable<Response>{
    return this.apiService.put(`classes/${this.currentClassId}/students/${studentId}`,body);
  }
  deleteStudent( studentId: string): Observable<Response>{
    return this.apiService.delete(`students/${studentId}`);
  }
  signrl() {
    let connection = new HubConnection('http://testtaskback.azurewebsites.net/students');
    connection.on('refresh', data => {
      const subscription = this.apiService.get<Student[]>(`classes/${this.currentClassId}/students`)
        .subscribe(res => this._data.next(res));
    });

    connection.start()
      .then(() => console.log("ConnectionStarted students"));

  }
}
