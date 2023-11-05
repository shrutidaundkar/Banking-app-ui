import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message, {
      nzStyle: {
        marginTop: '50px',
      },
    });
  }
}
