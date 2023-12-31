import { Component } from '@angular/core'
import type { OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NotificationService } from 'src/app/services/commonServices/notification.service'
import { SignupService } from 'src/app/services/userServices/signup.service'

/**
 * Component for displaying the Verify Email Page
 */
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  constructor (
    private readonly route: ActivatedRoute,
    private readonly signupService: SignupService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit (): void {
    this.verifyEmail()
  }

  /**
   * Verifies the email using the token from the URL parameter.
   */
  verifyEmail (): void {
    const token = this.route.snapshot.paramMap.get('token')
    const data = {
      emailVerificationCode: token
    }
    this.signupService.verifyEmail(data).subscribe(
      (response) => {
        console.log(response)
        if (response.statusCode === 201) {
          this.notificationService.createNotification(
            'success',
            'Success',
            response.message
          )
        } else if (response.statusCode === 400) {
          this.notificationService.createNotification(
            'error',
            'Error',
            response.message
          )
        }
      },
      (error: any) => {
        console.log(error)
        this.notificationService.createNotification(
          'error',
          'Error',
          'Could not verify your Email address! Please try again!'
        )
      }
    )
  }
}
