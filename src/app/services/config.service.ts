import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly baseUrl = 'http://localhost:8080/server';

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
