import { Injectable } from '@angular/core'
import  { Observable } from 'rxjs'
import  { HttpClient } from '@angular/common/http'
import { ConfigService } from './config.service'

/**
 * Service for handling loan-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor (private readonly http: HttpClient, private readonly config: ConfigService) { }

  /**
   * Create a new loan.
   * @param data The loan data to be created.
   * @returns An observable with the response.
   */
  createLoan (data: any): Observable<any> {
    return this.http.post(`${this.config.getBaseUrl()}/create-loan`, data)
  }

  /**
   * Get all loans for a specific user.
   * @param userId The ID of the user.
   * @returns An observable with the loan data.
   */
  getAllLoans (userId: any): Observable<any> {
    return this.http.get(`${this.config.getBaseUrl()}/all-loans/${userId}`)
  }

  /**
   * Check if an account number exists for a specific user.
   * @param userId The ID of the user.
   * @param accountId The account ID to check.
   * @returns An observable with the check result.
   */
  checkAccountNo (userId: any, accountId: any): Observable<any> {
    return this.http.get(`${this.config.getBaseUrl()}/check-account-no/${userId}/${accountId}`)
  }
}
