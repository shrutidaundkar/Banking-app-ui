import { Injectable } from '@angular/core'
import { ConfigService } from '../commonServices/config.service'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
/**
 * Service for handling user sign-up related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  /**
   * Constructor to inject dependencies.
   * @param http The HttpClient for making HTTP requests.
   * @param config The ConfigService to access application configuration settings.
   */
  constructor (
    private readonly http: HttpClient,
    private readonly config: ConfigService
  ) {}

  /**
   * Saves a new user to the server.
   * @param user The user data to be saved.
   * @returns An Observable of the HTTP response.
   */
  saveUser (user: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/save`, user)
  }

  /**
   * Verifies the user's email.
   * @param data The data required for email verification.
   * @returns An Observable of the HTTP response.
   */
  verifyEmail (data: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/verify/`, data)
  }
}
