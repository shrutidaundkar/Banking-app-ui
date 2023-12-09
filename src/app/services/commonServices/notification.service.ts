import { Injectable } from '@angular/core'
import { NzNotificationService } from 'ng-zorro-antd/notification'

/**
 * Service for creating notifications using NgZorro Ant Design.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor (private readonly notification: NzNotificationService) {}

  /**
   * Create and display a notification.
   * @param type The type of the notification (e.g., 'success', 'error').
   * @param title The title of the notification.
   * @param message The message content of the notification.
   */
  createNotification (type: string, title: string, message: string): void {
    this.notification.create(type, title, message, {
      nzStyle: {
        marginTop: '50px'
      }
    })
  }
}
