import { Component, OnInit } from '@angular/core'
import { AccountService } from 'src/app/services/accountServices/account.service'
import { StatementService } from 'src/app/services/accountServices/statement.service'

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
    private readonly stmtService: StatementService
  ) {}

  ngOnInit (): void {
    this.getData()
  }

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
      }
    )
  }

  getData (): void {
    const userId: number = Number(localStorage.getItem('userId'))

    this.accountService.getAccounts(userId).subscribe((res) => {
      this.accounts = res
    })
  }

  submitForm (accountId: any): void {
    this.isShown = false
    this.stmtService.getStatements(accountId).subscribe((response: any) => {
      this.statements = response
    })
    this.isShown = true
    this.accId = accountId
  }
}
