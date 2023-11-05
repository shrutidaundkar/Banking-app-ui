import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/server';

  createLoan(data: any): Observable<any> {
    return this.http.post(this.url + '/create-loan', data);
  }
  getAllLoans(userId: any): Observable<any> {
    return this.http.get(this.url + `/all-loans/${userId}`);
  }

  checkAccountNo(userId: any, accountId: any): Observable<any> {
    return this.http.get(this.url + `/check-account-no/${userId}/${accountId}`);
  }
}
