import { Component } from '@angular/core'
import type { OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { NotificationService } from 'src/app/services/notification.service'
import { LoginService } from 'src/app/services/userServices/login.service'

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetpassForm: FormGroup

  constructor (
    fb: FormBuilder,
    private readonly loginModuleService: LoginService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly SpinnerService: NgxSpinnerService
  ) {
    this.forgetpassForm = fb.group({
      email: new FormControl('', [Validators.required])
    })
  }

  get getformControl (): FormGroup['controls'] {
    return this.forgetpassForm.controls
  }

  ngOnInit (): void {
    console.log('Forget-password module')
  }

  submitForm (): void {
    this.SpinnerService.show()
    const data = {
      email: this.forgetpassForm.get('email')?.value
    }

    this.loginModuleService.forgetPassword(data).subscribe(
      (response) => {
        this.SpinnerService.hide()
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
    this.forgetpassForm.reset()
  }
}
