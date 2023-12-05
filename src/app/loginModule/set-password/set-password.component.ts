import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidator } from '../../custom.validator';
import { NotificationService } from 'src/app/services/notification.service';
import { LoginService } from 'src/app/services/userServices/login.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css'],
})
export class SetPasswordComponent implements OnInit {
  setPasswordForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private loginModuleService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.setPasswordForm = fb.group(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validator: CustomValidator('newPassword', 'confirmPassword'),
      }
    );
  }

  get getsetPasswordFormControls() {
    return this.setPasswordForm.controls;
  }

  ngOnInit() {
    console.log("Password Component")
  }

  submitForm() {
    const token = this.route.snapshot.paramMap.get('token');
    const setPasswordData = {
      token: token,
      newPassword: this.setPasswordForm.get('newPassword')?.value,
    };

    this.loginModuleService.resetPassword(setPasswordData).subscribe(
      (response) => {
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
    this.setPasswordForm.reset();
  }
}
