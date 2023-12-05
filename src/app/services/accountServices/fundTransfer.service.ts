import { Injectable } from '@angular/core'
import  { Observable } from 'rxjs'
import  { HttpClient } from '@angular/common/http'
import { ConfigService } from '../config.service'

/**
 * Service for handling fund transfer-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class FundTransferService {
  constructor (private readonly http: HttpClient, private readonly config: ConfigService) {}

  /**
   * Initiate a fund transfer.
   * @param data The fund transfer data.
   * @returns An observable with the response.
   */
  transfer (data: any): Observable<any> {
    return this.http.put(`${this.config.getBaseUrl()}/transfer`, data)
  }

  /**
   * Get a one-time password (OTP) for a specific user.
   * @param userId The ID of the user.
   * @returns An observable with the OTP data.
   */
  getOTP (userId: any): Observable<any> {
    return this.http.get(`${this.config.getBaseUrl()}/otp/${userId}`)
  }
}
