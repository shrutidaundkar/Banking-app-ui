import { Component } from '@angular/core'
import type { OnInit } from '@angular/core'
import { AccountService } from 'src/app/services/accountServices/account.service'
import { NotificationService } from 'src/app/services/commonServices/notification.service'

/**
 * Component for displaying loan details of the user.
 */
@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {
  accounts: any = []
  isShown: boolean = false
  constructor (
    private readonly accountService: AccountService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit (): void {
    this.getData()
  }

  /**
   * Fetches loan account data for the user.
   */
  getData (): void {
    const userId: number = Number(localStorage.getItem('userId'))

    this.accountService.getAccounts(userId).subscribe(
      (response) => {
        if (
          Object.keys(response).length !== 0 &&
          response.some((res: any) => res.loan !== null) === true
        ) {
          console.log(response)
          this.accounts = response
          this.isShown = true
        } else {
          this.notificationService.createNotification(
            'error',
            'Error',
            'No Loan Accounts found!'
          )
        }
      },
      () => {
        console.log('Error occured while retrieving Accounts!')
        this.notificationService.createNotification(
          'error',
          'Error',
          'Error occured while retrieving Accounts'
        )
      }
    )
  }
}
