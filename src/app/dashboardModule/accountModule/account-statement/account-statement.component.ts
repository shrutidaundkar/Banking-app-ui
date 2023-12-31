import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { StatementService } from 'src/app/services/accountServices/statement.service'
import { AccountService } from 'src/app/services/accountServices/account.service'
import { NotificationService } from 'src/app/services/commonServices/notification.service'

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent implements OnInit {
  statementForm: FormGroup
  iscreated: boolean = false
  message: string = ''
  accounts: any = []
  statements: any = []
  fromAccountId: number = 0
  isShown: boolean = false
  loading: boolean = false
  cols: any[] | undefined
  exportColumns: any[] | undefined
  products1: any[] | undefined

  constructor (
    fb: FormBuilder,
    private readonly statementService: StatementService,
    private readonly accountService: AccountService,
    private readonly notificationService: NotificationService
  ) {
    this.statementForm = fb.group({
      fromAccount: new FormControl('', [Validators.required])
    })
  }

  get getaccountFormControls (): FormGroup['controls'] {
    return this.statementForm.controls
  }

  ngOnInit (): void {
    this.getData()
  }

  /**
   * Submits the statement form and retrieves account statements.
   */
  submitForm (): void {
    this.fromAccountId = this.statementForm.get('fromAccount')?.value
    this.statementService.getStatements(this.fromAccountId).subscribe(
      (response: any) => {
        this.statements = response
        this.loading = false
        if (Object.keys(response).length !== 0) {
          this.isShown = true
          this.statements.forEach(
            (i: { transactionDate: string | number | Date }) => {
              i.transactionDate = new Date(i.transactionDate)
            }
          )
          console.log('statement data', this.statements)
        } else {
          this.notificationService.createNotification(
            'error',
            'Error',
            'No transactions found!'
          )
        }
      },
      (error) => {
        console.log('statement data', error.message)
        this.notificationService.createNotification(
          'error',
          'Error',
          'Statement could not be loaded! Try again.'
        )
      }
    )
  }

  columns = [
    { title: 'Transaction Id', dataKey: 'transactionId' },
    { title: 'Sender Account', dataKey: 'fromAccount' },
    { title: 'Receiver Account', dataKey: 'toAccount' },
    { title: 'Amount', dataKey: 'amount' },
    { title: 'Status', dataKey: 'transactionStatus' },
    { title: 'Date', dataKey: 'transactionDate' },
    { title: 'Time', dataKey: 'transactionTime' },
    { title: 'Description', dataKey: 'description' }
  ]

  /**
   * Custom sorting logic for statement data.
   */
  customSort (event: {
    data: any[]
    field: string | number
    order: number
  }): any {
    event.data?.sort((data1, data2) => {
      const value1 = data1[event.field]
      const value2 = data2[event.field]
      let result = null
      if (value1 === null && value2 !== null) result = -1
      else if (value1 !== null && value2 === null) result = 1
      else if (value1 === null && value2 === null) result = 0
      else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2)
      } else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0
      return event.order * result
    })
  }

  /**
   * Fetches account data for the user.
   */
  getData (): void {
    const userId: number = Number(localStorage.getItem('userId'))

    this.accountService.getAccounts(userId).subscribe(
      (res) => {
        this.accounts = res
      },
      (error) => {
        console.log('Account Data could not be retrieved', error)
      }
    )
  }

  /**
   * Resets the statement form.
   */
  cancelForm (): void {
    this.statementForm.reset()
  }
}
