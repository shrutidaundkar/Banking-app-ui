import { Injectable } from '@angular/core'
import type { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { ConfigService } from '../config.service'

/**
 * Service for handling statement-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class StatementService {
  constructor (
    private readonly http: HttpClient,
    private readonly config: ConfigService
  ) {}

  /**
   * Get statements for a specific account.
   * @param fromAccountId The ID of the account to fetch statements for.
   * @returns An observable with the statement data.
   */
  getStatements (fromAccountId: any): Observable<any> {
    return this.http.get(
      `${this.config.getBaseUrl()}/history/${fromAccountId}`
    )
  }
}
