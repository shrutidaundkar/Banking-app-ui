import { Component, OnInit } from '@angular/core'
import { AccountService } from 'src/app/services/accountServices/account.service'
import { StatementService } from 'src/app/services/accountServices/statement.service'
import { NotificationService } from 'src/app/services/commonServices/notification.service'

/**
 * Component for displaying account details and statements.
 */
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  userId: number | undefined
  accounts: any = []
  statements: any = []
  isShown: boolean = false
  fromId: any
  accId: any

  defaultColDef = {
    sortable: true,
    filter: true
  }

  constructor (
    private readonly accountService: AccountService,
    private readonly stmtService: StatementService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit (): void {
    this.loadData()
  }

  /**
   * Downloads the account statement as a PDF.
   */
  downloadPDF (): void {
    const userId: number = Number(localStorage.getItem('userId'))

    this.accountService.getAccountPDF(userId).subscribe(
      (data: Blob) => {
        const file = new Blob([data], { type: 'application/pdf' })
        const fileURL = URL.createObjectURL(file)

        window.open(fileURL)
        const a = document.createElement('a')
        a.href = fileURL
        a.target = '_blank'
        a.download = 'accounts.pdf'
        document.body.appendChild(a)
        a.click()
      },
      (error) => {
        console.log('getPDF error: ', error)
        this.notificationService.createNotification(
          'error',
          'Error',
          'Error Occured, please contact support!'
        )
      }
    )
  }

  /**
   * Loads account data for the user.
   */
  loadData (): void {
    const userId: number = Number(localStorage.getItem('userId'))
    this.accountService.getAccounts(userId).subscribe(
      (res) => {
        this.accounts = res
      },
      (error) => {
        console.log('Account Data could not be retrieved', error)
        this.notificationService.createNotification(
          'error',
          'Error',
          'No Accounts Found, please add a new account using "Add Account" button!'
        )
      }
    )
  }

  /**
   * Retrieves and displays statements for a given account.
   */
  submitForm (accountId: any): void {
    this.isShown = false
    this.stmtService.getStatements(accountId).subscribe(
      (response: any) => {
        this.statements = response
      },
      (error) => {
        console.log('Statement Data could not be retrieved', error)
        this.notificationService.createNotification(
          'error',
          'Error',
          'Statement Data could not be retrieved! Please contact support if the issur persists.'
        )
      }
    )
    this.isShown = true
    this.accId = accountId
  }
}
