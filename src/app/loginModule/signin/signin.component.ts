import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/services/userServices/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  message: String = '';
  authListner: Subject<boolean> = new Subject();
  inputType: String = 'password';

  constructor(
    fb: FormBuilder,
    private loginModuleService: LoginService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.signinForm = fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  showPassword(event: any): void {
    event.target.checked
      ? (this.inputType = 'text')
      : (this.inputType = 'password');
  }

  get getSigninFormControls() {
    return this.signinForm.controls;
  }

  ngOnInit(): void {
    this.authListner = this.loginModuleService.getAuthListner();
  }

  submitForm() {
    const userLoginData = {
      email: this.signinForm.get('email')?.value,
      password: this.signinForm.get('password')?.value,
    };

    this.loginModuleService.loginUser(userLoginData).subscribe(
      (response) => {
        if (response.message == 'Login Successful') {
          localStorage.setItem('userId', response.statusCode);
          this.router.navigate(['/dashboard/home']);
          this.authListner.next(true);
          this.notificationService.createNotification(
            'success',
            'Success',
            response.message,
          );
        } else if (response.statusCode == 400) {
          this.notificationService.createNotification(
            'error',
            'Error',
            response.message,
          );
        }
      },
      (error: any) => {
        console.log(error);
      },
    );
  }

  cancelForm() {
    this.signinForm.reset();
  }
}
