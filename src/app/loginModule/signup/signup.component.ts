import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { LoginModuleService } from '../../services/login-module.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginModuleService: LoginModuleService,
    private router: Router,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.signupForm = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phoneno: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      dateofbirth: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get getSignupFormControls() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {
    console.log("Signup Component")
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return value + 'yr';
    }
    return value;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  submitForm() {
    this.SpinnerService.show();
    const userSaveData = {
      firstname: this.signupForm.get('firstname')?.value,
      lastname: this.signupForm.get('lastname')?.value,
      mobile: this.signupForm.get('phoneno')?.value,
      gender: this.signupForm.get('gender')?.value,
      age: this.signupForm.get('age')?.value,
      email: this.signupForm.get('email')?.value,
      dateofbirth: this.signupForm.get('dateofbirth')?.value,
      password: this.signupForm.get('password')?.value,
    };

    console.log(userSaveData);

    this.loginModuleService.saveUser(userSaveData).subscribe(
      (response) => {
        this.SpinnerService.hide();
        if (response.statusCode == 201) {
          this.notificationService.createNotification(
            'success',
            'Success',
            response.message
          );
          this.router.navigate(['/login']);
        } else if (response.statusCode == 400) {
          this.notificationService.createNotification(
            'error',
            'Error',
            response.message
          );
          this.router.navigate(['/signup']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancelForm() {
    this.signupForm.reset();
  }
}
