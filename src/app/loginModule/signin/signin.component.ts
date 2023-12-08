import { Component } from '@angular/core'
import type { OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { LoginService } from 'src/app/services/userServices/login.service'
import { NotificationService } from 'src/app/services/notification.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup
  message: string = ''
  authListner = new Subject<boolean>()
  inputType: string = 'password'

  constructor (
    fb: FormBuilder,
    private readonly loginModuleService: LoginService,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {
    this.signinForm = fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  showPassword (event: any): void {
    event.target.checked === true
      ? (this.inputType = 'text')
      : (this.inputType = 'password')
  }

  get getSigninFormControls (): any {
    return this.signinForm.controls
  }

  ngOnInit (): void {
    this.authListner = this.loginModuleService.getAuthListner()
  }

  submitForm (): void {
    const userLoginData = {
      email: this.signinForm.get('email')?.value,
      password: this.signinForm.get('password')?.value
    }

    this.loginModuleService.loginUser(userLoginData).subscribe(
      (response) => {
        if (response.message === 'Login Successful') {
          localStorage.setItem('userId', response.statusCode)
          this.router.navigate(['/dashboard/home']).then(() => {
            console.log('Registration Successful')
          }).catch(() => {
            console.log('Error Occured')
          })
          this.authListner.next(true)
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
      }
    )
  }

  cancelForm (): void {
    this.signinForm.reset()
  }
}
