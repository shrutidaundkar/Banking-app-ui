import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/userServices/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userId: any;
  loggedIn: boolean = false;
  authStatusSub: Subscription = new Subscription();
  authListner = new Subject<boolean>();

  constructor(
    private readonly router: Router,
    private readonly loginModuleService: LoginService,
    private readonly notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.authListner = this.loginModuleService.getAuthListner();
    this.userId = localStorage.getItem('userId');
    this.authStatusSub = this.loginModuleService
      .getAuthListnerStatus()
      .subscribe((status) => {
        this.loggedIn = status;
        console.log(this.loggedIn);
      });
  }

  async logout(): Promise<void> {
    localStorage.removeItem('userId');
    this.authListner.next(false);
    await this.router.navigate(['/login']);
    this.createNotification('success', 'Success', 'Logout SuccessFul');
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message, {
      nzStyle: {
        marginTop: '50px',
      },
    });
  }
}
