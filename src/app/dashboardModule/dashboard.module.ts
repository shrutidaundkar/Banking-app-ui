import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { DashboardRouting } from './dashboard.routing'
import { AccountDetailsComponent } from './accountModule/account-details/account-details.component'
import { CreateAccountComponent } from './accountModule/create-account/create-account.component'
import { FundTransferComponent } from './accountModule/fund-transfer/fund-transfer.component'
import { ProfileComponent } from './profileModule/profile/profile.component'
import { HomeComponent } from './home/home.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AccountStatementComponent } from './accountModule/account-statement/account-statement.component'
import { UpdateProfileComponent } from './profileModule/update-profile/update-profile.component'
import { MatSliderModule } from '@angular/material/slider'
import { CommonModule } from '@angular/common'
import { AgGridModule } from 'ag-grid-angular'
import { NgxSpinnerModule } from 'ngx-spinner'
import { TableModule } from 'primeng/table'
import { CreateLoanComponent } from './loanModule/create-loan/create-loan.component'
import { LoanDetailsComponent } from './loanModule/loan-details/loan-details.component'

@NgModule({
  declarations: [
    AccountDetailsComponent,
    CreateAccountComponent,
    AccountStatementComponent,
    FundTransferComponent,
    ProfileComponent,
    HomeComponent,
    UpdateProfileComponent,
    LoanDetailsComponent,
    CreateLoanComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DashboardRouting,
    MatSliderModule,
    CommonModule,
    AgGridModule.withComponents([]),
    NgxSpinnerModule,
    TableModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
