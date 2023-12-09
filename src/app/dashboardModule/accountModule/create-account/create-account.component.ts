import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AccountService } from 'src/app/services/accountServices/account.service'
import { Router } from '@angular/router'
import { NotificationService } from 'src/app/services/commonServices/notification.service'
import { NgxSpinnerService } from 'ngx-spinner'

/**
 * Component for creating a new bank account.
 */
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup
  iscreated: boolean = false
  message: string = ''

  constructor (
    fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly SpinnerService: NgxSpinnerService
  ) {
    this.createAccountForm = fb.group({
      accountType: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required])
    })
  }

  get getaccountFormControls (): FormGroup['controls'] {
    return this.createAccountForm.controls
  }

  ngOnInit (): void {
    console.log('Account Component')
  }

  /**
   * Submits the account creation form.
   */
  submitForm (): void {
    const userId: number = Number(localStorage.getItem('userId'))

    const accountData = {
      accountType: this.createAccountForm.get('accountType')?.value,
      balance: this.createAccountForm.get('balance')?.value,
      userId
    }
    this.SpinnerService.show()
    this.accountService.saveAccount(accountData).subscribe(
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
          this.notificationService.createNotification(
            'error',
            'Error',
            'Account could not be created!'
          )
        }
      },
      (error: any) => {
        console.log(error)
        this.SpinnerService.hide()
        this.notificationService.createNotification(
          'error',
          'Error',
          'Account could not be created! Please try again!'
        )
      }
    )
  }

  /**
   * Resets the account creation form.
   */
  cancelForm (): void {
    this.createAccountForm.reset()
  }
}
