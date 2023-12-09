import { Injectable } from '@angular/core'

/**
 * Service providing application-wide configuration values.
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly baseUrl = 'http://localhost:8080/server'

  /**
   * Retrieves the base URL for the server.
   * @returns Base URL as a string.
   */
  getBaseUrl (): string {
    return this.baseUrl
  }
}
