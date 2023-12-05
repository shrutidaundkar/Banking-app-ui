import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class LoginModuleService {
  constructor(private http: HttpClient, private readonly config: ConfigService) {}
  authListner = new Subject<boolean>();

  saveUser(user: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/save`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/login/`, user);
  }

  forgetPassword(data: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/forgot-password`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/reset-password`, data);
  }

  verifyEmail(data: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/verify/`, data);
  }

  getAuthListner() {
    return this.authListner;
  }

  getAuthListnerStatus() {
    return this.authListner.asObservable();
  }
}
