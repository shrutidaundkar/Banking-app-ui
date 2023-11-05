import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/server';

  getUserProfile(userId: any): Observable<any> {
    return this.http.get(this.url + `/profile/${userId}`);
  }

  updateUserProfile(data: any): Observable<any> {
    return this.http.put(this.url + '/profile/update', data);
  }

  getUserFile(userId: any): Observable<any> {
    return this.http.get(this.url + `/downloadFile/${userId}`);
  }
}
