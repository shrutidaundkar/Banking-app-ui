import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { FundtransferService } from 'src/app/services/fundtransfer.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css'],
})
export class FundTransferComponent implements OnInit {
  fundTransferForm: FormGroup;
  checkZeroAmount: Boolean = false;
  accounts: any = [];

  constructor(
    fb: FormBuilder,
    private fundtransferService: FundtransferService,
    private router: Router,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.fundTransferForm = fb.group({
      fromAccount: new FormControl('', Validators.required),
      toAccount: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      otp: new FormControl('', [Validators.required]),
    });
  }
  get getAccountFormControls() {
    return this.fundTransferForm.controls;
  }

  ngOnInit(): void {
    this.getData();
  }

  changeFn(e: any) {
    this.checkZeroAmount = false;
  }

  submitForm() {
    var userId: number = Number(localStorage.getItem('userId'));

    const transferData = {
      userId: userId,
      toAccount: this.fundTransferForm.get('toAccount')?.value,
      amount: this.fundTransferForm.get('amount')?.value,
      description: this.fundTransferForm.get('description')?.value,
      fromAccount: this.fundTransferForm.get('fromAccount')?.value,
      otp: Number(this.fundTransferForm.get('otp')?.value),
    };

    if (this.fundTransferForm.get('amount')?.value == 0) {
      this.checkZeroAmount = true;
    } else {
      this.SpinnerService.show();
      this.fundtransferService.transfer(transferData).subscribe(
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
            setTimeout(() => {
              this.SpinnerService.hide();
              this.notificationService.createNotification(
                'error',
                'Error',
                response.message
              );
            }, 3000);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  cancelForm() {
    this.fundTransferForm.reset();
  }

  getOTP() {
    this.SpinnerService.show();
    var userId: number = Number(localStorage.getItem('userId'));

    this.fundtransferService.getOTP(userId).subscribe((response) => {
      this.SpinnerService.hide();
      if (response.statusCode == 201) {
        this.notificationService.createNotification(
          'success',
          'Success',
          response.message
        );
      } else if (response.statusCode == 400) {
        this.notificationService.createNotification(
          'error',
          'Error',
          response.message
        );
      }
    });
  }

  getData() {
    var userID: number = Number(localStorage.getItem('userId'));

    this.accountService.getAccounts(userID).subscribe((res) => {
      this.accounts = res;
    });
  }
}
