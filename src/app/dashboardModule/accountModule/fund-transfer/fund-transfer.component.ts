import { Component } from '@angular/core'
import type { OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AccountService } from 'src/app/services/accountServices/account.service'
import { Router } from '@angular/router'
import { NotificationService } from 'src/app/services/commonServices/notification.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { FundTransferService } from 'src/app/services/accountServices/fundTransfer.service'
import { timeout, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

/**
 * Component for handling fund transfer operations.
 */
@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  fundTransferForm: FormGroup
  checkZeroAmount: boolean = false
  accounts: any = []

  constructor (
    fb: FormBuilder,
    private readonly fundTransferService: FundTransferService,
    private readonly router: Router,
    private readonly accountService: AccountService,
    private readonly notificationService: NotificationService,
    private readonly SpinnerService: NgxSpinnerService
  ) {
    this.fundTransferForm = fb.group({
      fromAccount: new FormControl('', Validators.required),
      toAccount: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      otp: new FormControl('', [Validators.required])
    })
  }

  get getAccountFormControls (): FormGroup['controls'] {
    return this.fundTransferForm.controls
  }

  ngOnInit (): void {
    this.getData()
  }

  changeFn (e: any): void {
    this.checkZeroAmount = false
  }

  /**
   * Submits the fund transfer form.
   */
  submitForm (): void {
    const userId: number = Number(localStorage.getItem('userId'))

    const transferData = {
      userId,
      toAccount: this.fundTransferForm.get('toAccount')?.value,
      amount: this.fundTransferForm.get('amount')?.value,
      description: this.fundTransferForm.get('description')?.value,
      fromAccount: this.fundTransferForm.get('fromAccount')?.value,
      otp: Number(this.fundTransferForm.get('otp')?.value)
    }

    if (this.fundTransferForm.get('amount')?.value === 0) {
      this.checkZeroAmount = true
    } else {
      this.SpinnerService.show()
      this.fundTransferService.transfer(transferData).subscribe(
        (response: any) => {
          if (response.statusCode === 201) {
            this.SpinnerService.hide()
            this.notificationService.createNotification(
              'success',
              'Success',
              response.message
            )
            this.router
              .navigate(['/dashboard/account-details'])
              .then(() => {
                console.log('Registration Successful')
              })
              .catch(() => {
                console.log('Error Occured')
              })
          } else if (response.statusCode === 400) {
            setTimeout(() => {
              this.SpinnerService.hide()
              this.notificationService.createNotification(
                'error',
                'Error',
                response.message
              )
            }, 3000)
          }
        },
        (error: any) => {
          console.log(error)
          this.SpinnerService.hide()
          this.notificationService.createNotification(
            'error',
            'Error',
            'Error Occured!'
          )
        }
      )
    }
  }

  cancelForm (): void {
    this.fundTransferForm.reset()
  }

  // This method will not work as Backend does not have any Mailing Account set-up to do so.
  // Use 100 as a workaround OTP to send funds
  getOTP (): void {
    this.SpinnerService.show()
    const userId: number = Number(localStorage.getItem('userId'))

    this.fundTransferService
      .getOTP(userId)
      .pipe(
        timeout(3000),
        catchError(() => {
          this.SpinnerService.hide()
          this.notificationService.createNotification(
            'error',
            'Error',
            'Request Timed out!'
          )
          return of(null)
        })
      )
      .subscribe(
        (response) => {
          this.SpinnerService.hide()
          if (response.statusCode === 201) {
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
          this.SpinnerService.hide()
          this.notificationService.createNotification(
            'error',
            'Error',
            'Could not transfer funds, try again!'
          )
        }
      )
  }

  /**
   * Resets the fund transfer form.
   */
  getData (): void {
    const userID: number = Number(localStorage.getItem('userId'))

    this.accountService.getAccounts(userID).subscribe((res) => {
      this.accounts = res
    })
  }
}
