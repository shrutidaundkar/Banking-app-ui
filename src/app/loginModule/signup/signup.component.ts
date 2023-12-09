import { Component } from '@angular/core'
import type { OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { NotificationService } from 'src/app/services/notification.service'
import { SignupService } from 'src/app/services/userServices/signup.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup

  constructor (
    private readonly fb: FormBuilder,
    private readonly signupService: SignupService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly SpinnerService: NgxSpinnerService
  ) {
    this.signupForm = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phoneno: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
      ]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ],
      dateofbirth: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(8)])
    })
  }

  get getSignupFormControls (): any {
    return this.signupForm.controls
  }

  ngOnInit (): void {
    console.log('Signup Component')
  }

  formatLabel (value: number): any {
    return value >= 1 ? value + 'yr' : value
  }

  getToday (): string {
    return new Date().toISOString().split('T')[0]
  }

  submitForm (): any {
    this.SpinnerService.show()
    const userSaveData = {
      firstname: this.signupForm.get('firstname')?.value,
      lastname: this.signupForm.get('lastname')?.value,
      mobile: this.signupForm.get('phoneno')?.value,
      gender: this.signupForm.get('gender')?.value,
      age: this.signupForm.get('age')?.value,
      email: this.signupForm.get('email')?.value,
      dateofbirth: this.signupForm.get('dateofbirth')?.value,
      password: this.signupForm.get('password')?.value
    }

    this.signupService.saveUser(userSaveData).subscribe(
      (response) => {
        this.SpinnerService.hide()
        if (response.statusCode === 201) {
          this.notificationService.createNotification(
            'success',
            'Success',
            response.message
          )
          this.router
            .navigate(['/login'])
            .then(() => {
              console.log('Registration Successful')
            })
            .catch(() => {
              console.log('Error Occured')
            })
        } else if (response.statusCode === 400) {
          this.notificationService.createNotification(
            'error',
            'Error',
            response.message
          )
          this.router
            .navigate(['/signup'])
            .then(() => {
              console.log('Registration successful')
            })
            .catch(() => {
              console.log('Error Occured!')
            })
        }
      },
      (error: any) => {
        console.log(error)
        this.SpinnerService.hide()
        this.notificationService.createNotification(
          'error',
          'Error',
          error.message
        )
      }
    )
  }

  cancelForm (): void {
    this.signupForm.reset()
  }
}
