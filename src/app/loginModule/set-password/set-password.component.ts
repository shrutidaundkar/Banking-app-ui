import { Component } from '@angular/core'
import type { OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CustomValidator } from '../../custom.validator'
import { NotificationService } from 'src/app/services/notification.service'
import { LoginService } from 'src/app/services/userServices/login.service'

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  setPasswordForm: FormGroup

  constructor (
    fb: FormBuilder,
    private readonly loginModuleService: LoginService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notificationService: NotificationService
  ) {
    this.setPasswordForm = fb.group(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        confirmPassword: new FormControl('', [Validators.required])
      },
      {
        validator: CustomValidator('newPassword', 'confirmPassword')
      }
    )
  }

  get getsetPasswordFormControls (): FormGroup['controls'] {
    return this.setPasswordForm.controls
  }

  ngOnInit (): void {
    console.log('Password Component')
  }

  submitForm (): void {
    const token = this.route.snapshot.paramMap.get('token')
    const setPasswordData = {
      token,
      newPassword: this.setPasswordForm.get('newPassword')?.value
    }

    this.loginModuleService.resetPassword(setPasswordData).subscribe(
      (response) => {
        if (response.statusCode === 201) {
          this.notificationService.createNotification(
            'success',
            'Success',
            response.message
          )
          this.router.navigate(['/login']).then(() => {
            console.log('Registration Successful')
          }).catch(() => {
            console.log('Error Occured')
          })
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
      }
    )
  }

  cancelForm (): void {
    this.setPasswordForm.reset()
  }
}
