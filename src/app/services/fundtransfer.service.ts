import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FundtransferService {
  constructor(private http: HttpClient) {}

  url = "http://localhost:8080/server"

  transfer(data: any): Observable<any> {
    return this.http.put(this.url+'/transfer', data);
  }

  getOTP(userId: any): Observable<any> {
    return this.http.get(this.url+`/otp/${userId}`);
  }
}
