import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BASE_URL } from './app.tokens';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {
  private apiHost: string;
  constructor(private http: Http, @Inject(BASE_URL) private baseURL: string) {
    this.apiHost = baseURL;
  }

  public get<T>(path: string): Observable<T> {
    const newOptions = new RequestOptions();
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Access-Control-Allow-Origin',this.baseURL);
    headers.append('Access-Control-Allow-Methods', 'GET');
    return this.http.get(`${this.apiHost}${path}`, headers)
      .share()
      .map((res: Response) => <T>res.json())
  }

  public post<T>(path: string, body: T): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Methods', 'POST');
    console.log(`${this.apiHost}${path}`);
    return this.http.post(`${this.apiHost}${path}`, body, headers)
      .map((res: Response) => res)
  }

  public put<T>(path: string, body: T): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Methods', 'PUT');
    console.log(`${this.apiHost}${path}`);
    return this.http.put(`${this.apiHost}${path}`,body, headers)
      .map((res: Response) => res)
  }

  public delete(path: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Methods', 'DELETE');
    console.log(`${this.apiHost}${path}`);
    return this.http.delete(`${this.apiHost}${path}`, headers)
      .map((res: Response) => res)
  }
}



