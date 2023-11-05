import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/server';

  saveAccount(data: any): Observable<any> {
    return this.http.post(this.url + '/create-account/', data);
  }

  getAccounts(userId: any): Observable<any> {
    return this.http.get(this.url + `/all-accounts/${userId}`);
  }

  getAccountPDF(userId: number): Observable<any> {
    var authorization = 'Bearer ' + sessionStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: authorization,
      responseType: 'blob',
    });

    return this.http.get<Blob>(this.url + '/account/exportPdf/' + userId, {
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }
}
