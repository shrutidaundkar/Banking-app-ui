import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/accountServices/account.service';
import { StatementService } from 'src/app/services/accountServices/statement.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  userId: number | undefined;
  accounts: any = [];
  statements: any = [];
  isShown: boolean = false;
  fromId: any;
  accId: any;

  defaultColDef = {
    sortable: true,
    filter: true,
  };

  constructor(
    private accountService: AccountService,
    private stmtService: StatementService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  downloadPDF() {
    var userId: number = Number(localStorage.getItem('userId'));

    this.accountService.getAccountPDF(userId).subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);

        window.open(fileURL);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = 'accounts.pdf';
        document.body.appendChild(a);
        a.click();
      },
      (error) => {
        console.log('getPDF error: ', error);
      }
    );
  }

  getData() {
    var userId: number = Number(localStorage.getItem('userId'));

    this.accountService.getAccounts(userId).subscribe((res) => {
      this.accounts = res;
    });
  }
  submitForm(accountId: any) {
    this.isShown = false;
    this.stmtService.getStatements(accountId).subscribe((response: any) => {
      this.statements = response;
    });
    this.isShown = true;
    this.accId = accountId;
  }
}
