import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginModuleService {
  constructor(private http: HttpClient) {}
  authListner = new Subject<boolean>();

  url = "http://localhost:8080/server"

  saveUser(user: any): Observable<any> {
    return this.http.post(this.url+'/save', user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(this.url+'/login/', user);
  }

  forgetPassword(data: any): Observable<any> {
    return this.http.post(this.url+'/forgot-password', data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(this.url+'/reset-password', data);
  }

  verifyEmail(data: any): Observable<any> {
    return this.http.post(this.url+'/verify/', data);
  }

  getAuthListner() {
    return this.authListner;
  }

  getAuthListnerStatus() {
    return this.authListner.asObservable();
  }
}
