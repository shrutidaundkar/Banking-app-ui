import  { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import  { Observable } from 'rxjs'
import { ConfigService } from './config.service'

/**
 * Service for managing user profiles and related data.
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor (private readonly http: HttpClient, private readonly config: ConfigService) { }

  /**
   * Get the user's profile information.
   * @param userId The ID of the user.
   * @returns An observable with the user's profile data.
   */
  getUserProfile (userId: any): Observable<any> {
    return this.http.get(`${this.config.getBaseUrl()}/profile/${userId}`)
  }

  /**
   * Update the user's profile.
   * @param data The updated profile data.
   * @returns An observable with the response.
   */
  updateUserProfile (data: any): Observable<any> {
    return this.http.put(`${this.config.getBaseUrl()}/profile/update`, data)
  }

  /**
   * Get a user's file for download.
   * @param userId The ID of the user.
   * @returns An observable with the file data.
   */
  getUserFile (userId: any): Observable<any> {
    return this.http.get(`${this.config.getBaseUrl()}/downloadFile/${userId}`)
  }
}
