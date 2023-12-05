import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/accountServices/account.service';
import { LoanService } from 'src/app/services/accountServices/loan.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css'],
})
export class LoanDetailsComponent implements OnInit {
  accounts: any = [];

  constructor(
    private loanService: LoanService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    var userId: number = Number(localStorage.getItem('userId'));

    this.accountService.getAccounts(userId).subscribe((res) => {
      this.accounts = res;
    });
  }
}
