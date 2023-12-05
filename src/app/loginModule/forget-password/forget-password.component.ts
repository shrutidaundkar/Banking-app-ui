import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/userServices/login.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetpassForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private loginModuleService: LoginService,
    private router: Router,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.forgetpassForm = fb.group({
      email: new FormControl('', [Validators.required]),
    });
  }

  get getformControl() {
    return this.forgetpassForm.controls;
  }

  ngOnInit(): void {
    console.log("Forget-password module")
  }

  submitForm() {
    this.SpinnerService.show();
    const data = {
      email: this.forgetpassForm.get('email')?.value,
    };

    this.loginModuleService.forgetPassword(data).subscribe(
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
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancelForm() {
    this.forgetpassForm.reset();
  }
}
