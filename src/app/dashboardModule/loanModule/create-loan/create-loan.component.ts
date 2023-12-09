import { Component } from '@angular/core'
import type { OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NotificationService } from 'src/app/services/commonServices/notification.service'
import { LoanService } from 'src/app/services/accountServices/loan.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { AccountService } from 'src/app/services/accountServices/account.service'

/**
 * Component for creating a new loan application.
 */
@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})
export class CreateLoanComponent implements OnInit {
  createLoanForm: FormGroup
  interestRate: number = 0
  tenure: number = 0
  amount: number = 0
  monthlyEMI: number = 0
  interestAmount: number = 0
  totalAmount: number = 0
  accounts: any = []

  constructor (
    fb: FormBuilder,
    private readonly loanService: LoanService,
    private readonly router: Router,
    private readonly accountService: AccountService,
    private readonly notificationService: NotificationService,
    private readonly SpinnerService: NgxSpinnerService
  ) {
    this.createLoanForm = new FormGroup({
      loanPurpose: new FormControl('', [Validators.required]),
      loanAmount: new FormControl('', [Validators.required]),
      tenureInMonths: new FormControl('', [Validators.required]),
      accountId: new FormControl('', [Validators.required])
    })
  }

  ngOnInit (): void {
    this.getData()
    this.interestRate = 7
    this.createLoanForm.controls.loanPurpose.setValue('Home')
    this.createLoanForm.controls.loanAmount.setValue(1000000)
    this.createLoanForm.controls.tenureInMonths.setValue(240)
    this.calculateEMI()
    this.calculateInterestAmount()
  }

  get getLoanFormControls (): FormGroup['controls'] {
    return this.createLoanForm.controls
  }

  formatAmount (value: number): number {
    return value >= 1 ? value / 100000 : value
  }

  formatTenure (value: number): any {
    return value >= 1 ? value : 0.5
  }

  updateInterestRate (): void {
    const loanReason = this.createLoanForm.get('loanPurpose')?.value
    this.interestRate = (loanReason === 'Personal') ? 12 : (loanReason === 'Home') ? 7 : 9
  }

  calculateEMI (): void {
    this.amount = this.createLoanForm.get('loanAmount')?.value
    this.tenure = this.createLoanForm.get('tenureInMonths')?.value
    console.log(this.tenure)
    const intr = this.interestRate / 12 / 100
    const n = Math.pow(intr + 1, this.tenure)
    this.monthlyEMI = (this.amount * intr * n) / (n - 1)
    this.totalAmount = this.monthlyEMI * this.tenure
    this.monthlyEMI =
      Math.round((this.monthlyEMI + Number.EPSILON) * 100) / 100
  }

  calculateInterestAmount (): void {
    this.interestAmount = this.totalAmount - this.amount
    this.interestAmount =
      Math.round((this.interestAmount + Number.EPSILON) * 100) / 100
  }

  /**
   * Submits the loan application form data.
   */
  createLoan (): void {
    const userId: number = Number(localStorage.getItem('userId'))

    const loanData = {
      userId,
      accountId: this.createLoanForm.get('accountId')?.value,
      loanAmount: this.createLoanForm.get('loanAmount')?.value,
      remainingAmount:
        this.createLoanForm.get('loanAmount')?.value +
        this.interestRate * this.tenure,
      loanPurpose: this.createLoanForm.get('loanPurpose')?.value,
      interest: this.interestRate,
      tenureInMonths: this.tenure,
      monthlyEMI: this.monthlyEMI
    }

    this.SpinnerService.show()

    this.loanService
      .checkAccountNo(userId, this.createLoanForm.get('accountId')?.value)
      .subscribe(
        (response: any) => {
          if (response.statusCode === 201) {
            this.loanService.createLoan(loanData).subscribe(
              (response: any) => {
                if (response.statusCode === 201) {
                  this.SpinnerService.hide()
                  this.notificationService.createNotification(
                    'success',
                    'Success',
                    response.message
                  )
                  this.router
                    .navigate(['/dashboard/loan-details'])
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
                    .navigate(['/create-loan'])
                    .then(() => {
                      console.log('Registration Successful')
                    })
                    .catch(() => {
                      console.log('Error Occured')
                    })
                }
              },
              (error: any) => {
                console.log(error)
                this.notificationService.createNotification(
                  'error',
                  'Error',
                  'Problem occured while applying for Loan.'
                )
              }
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
            error.message
          )
        }
      )
  }

  /**
   * Fetches account data for the user.
   */
  getData (): void {
    const userID: number = Number(localStorage.getItem('userId'))

    this.accountService.getAccounts(userID).subscribe((res) => {
      this.accounts = res
    })
  }
}
