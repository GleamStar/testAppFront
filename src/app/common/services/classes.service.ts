import {Injectable, Inject} from '@angular/core';
import { Class,UpsertClass } from '../models/index';
import {Observable} from 'rxjs/Observable';
import {ApiService} from './api.service'
import {HubConnection} from '@aspnet/signalr-client'
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import  'rxjs/add/operator/takeWhile'
import { Response } from '@angular/http';
import {BASE_URL} from "./app.tokens";

@Injectable()
export class ClassesService {
  private _data: BehaviorSubject<Class[]> = new BehaviorSubject(null);

  get data(): Observable<Class[]> {
    return this._data;
  }

  constructor(private apiService: ApiService, @Inject(BASE_URL) private baseURL: string) {
    this.signrl();
    apiService.get<Class[]>('classes')
      .subscribe(res => this._data.next(res))
  }
  addClass( body:UpsertClass ): Observable<Response> {
    return this.apiService.post<UpsertClass>('classes',body);
  }
  updateClass( classId: string, body:UpsertClass): Observable<Response>{
    return this.apiService.put<UpsertClass>(`classes/${classId}`,body);
  }
  deleteClass( classId: string): Observable<Response>{
    return this.apiService.delete(`classes/${classId}`);
  }
  signrl() {
    let connection = new HubConnection('http://testtaskback.azurewebsites.net/classes');

    connection.on('refresh', data => {
      console.log("yeafdadf");
      const subscription = this.apiService.get<Class[]>('classes')
        .subscribe(res => this._data.next(res));
    });

    connection.start()
      .then(() => console.log("ConnectionStarted"));

  }
}
