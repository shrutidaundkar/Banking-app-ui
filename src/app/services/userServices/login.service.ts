import { Injectable } from '@angular/core'
import type { Observable } from 'rxjs'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { ConfigService } from '../config.service'

/**
 * Service to handle login and authentication related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /**
   * Subject to broadcast authentication status changes.
   */
  authListner = new Subject<boolean>()

  /**
   * Constructor to inject dependencies.
   *
   * @param http The HttpClient for making HTTP requests.
   * @param config The ConfigService to access application configuration settings.
   */
  constructor (
    private readonly http: HttpClient,
    private readonly config: ConfigService
  ) {}

  /**
   * Logs in a user.
   * @param user The user credentials for login.
   * @returns An Observable of the HTTP response.
   */
  loginUser (user: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/login/`, user)
  }

  /**
   * Initiates the forgot password process for a user.
   * @param data The user data for password recovery.
   * @returns An Observable of the HTTP response.
   */
  forgetPassword (data: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/forgot-password`, data)
  }

  /**
   * Resets the password for a user.
   * @param data The data required for password reset.
   * @returns An Observable of the HTTP response.
   */
  resetPassword (data: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/reset-password`, data)
  }

  /**
   * Verifies the user's email address.
   * @param data The data required for email verification.
   * @returns An Observable of the HTTP response.
   */
  verifyEmail (data: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/verify/`, data)
  }

  /**
   * Retrieves the authentication listener.
   * @returns The authentication listener Subject.
   */
  getAuthListner (): any {
    return this.authListner
  }

  /**
   * Retrieves the observable for the authentication listener.
   * Useful for subscribing to authentication status changes.
   * @returns An Observable of the authentication status.
   */
  getAuthListnerStatus (): any {
    return this.authListner.asObservable()
  }
}
