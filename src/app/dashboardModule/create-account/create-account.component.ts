import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;
  iscreated: Boolean = false;
  message: String = '';

  constructor(
    fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.createAccountForm = fb.group({
      accountType: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required]),
    });
  }

  get getaccountFormControls() {
    return this.createAccountForm.controls;
  }

  ngOnInit(): void {
    console.log("Account Component")
  }

  submitForm() {
    var userId: number = Number(localStorage.getItem('userId'));

    const accountData = {
      accountType: this.createAccountForm.get('accountType')?.value,
      balance: this.createAccountForm.get('balance')?.value,
      userId: userId,
    };
    this.SpinnerService.show();
    this.accountService.saveAccount(accountData).subscribe(
      (response: any) => {
        if (response.statusCode == 201) {
          this.SpinnerService.hide();
          this.notificationService.createNotification(
            'success',
            'Success',
            response.message
          );
          this.router.navigate(['/dashboard/account-details']);
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
    this.createAccountForm.reset();
  }
}
