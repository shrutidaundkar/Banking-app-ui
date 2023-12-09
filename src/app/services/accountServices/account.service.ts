import { Injectable } from '@angular/core'
import type { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ConfigService } from '../commonServices/config.service'

/**
 * Service for handling account-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor (
    private readonly http: HttpClient,
    private readonly config: ConfigService
  ) {}

  /**
   * Save an account.
   * @param data The account data to be saved.
   * @returns An observable with the response.
   */
  saveAccount (data: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/create-account/`, data)
  }

  /**
   * Get all accounts for a specific user.
   * @param userId The ID of the user.
   * @returns An observable with the account data.
   */
  getAccounts (userId: any): Observable<any> {
    return this.http.get(`${this.config.getBaseUrl()}/all-accounts/${userId}`)
  }

  /**
   * Get an account's PDF for a specific user.
   * @param userId The ID of the user.
   * @returns An observable with the account PDF data.
   */
  getAccountPDF (userId: number): Observable<any> {
    // Authorization header with access token from session storage.
    const authorization = 'Bearer ' + sessionStorage.getItem('access_token')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: authorization,
      responseType: 'blob'
    })

    // Fetch the PDF data.
    return this.http.get<Blob>(
      `${this.config.getBaseUrl()}/account/exportPdf/${userId}`,
      {
        headers,
        responseType: 'blob' as 'json'
      }
    )
  }
}
