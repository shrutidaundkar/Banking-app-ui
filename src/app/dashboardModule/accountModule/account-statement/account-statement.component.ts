import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { StatementService } from 'src/app/services/accountServices/statement.service'
import { AccountService } from 'src/app/services/accountServices/account.service'

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
    private readonly accountService: AccountService
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

  submitForm (): void {
    this.fromAccountId = this.statementForm.get('fromAccount')?.value
    this.statementService
      .getStatements(this.fromAccountId)
      .subscribe((response: any) => {
        this.statements = response
        this.loading = false
        this.isShown = true
        this.statements.forEach(
          (i: { transactionDate: string | number | Date }) => {
            i.transactionDate = new Date(i.transactionDate)
          }
        )
        console.log('statement data', this.statements)
      })
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

  customSort (event: { data: any[], field: string | number, order: number }): any {
    event.data?.sort((data1, data2) => {
      const value1 = data1[event.field]
      const value2 = data2[event.field]
      let result = null
      if (value1 == null && value2 != null) result = -1
      else if (value1 != null && value2 == null) result = 1
      else if (value1 == null && value2 == null) result = 0
      else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2)
      } else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0
      return event.order * result
    })
  }

  getData (): void {
    const userId: number = Number(localStorage.getItem('userId'))

    this.accountService.getAccounts(userId).subscribe((res) => {
      this.accounts = res
    })
  }

  cancelForm (): void {
    this.statementForm.reset()
  }
}
