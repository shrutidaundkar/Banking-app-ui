import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreateLoanComponent } from './create-loan/create-loan.component';
import { DashboardComponent } from './dashboard.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { HomeComponent } from './home/home.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-profile',
        component: UpdateProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'account-details',
        component: AccountDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create-account',
        component: CreateAccountComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'fund-transfer',
        component: FundTransferComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'account-statement',
        component: AccountStatementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create-loan',
        component: CreateLoanComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'loan-details',
        component: LoanDetailsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class DashboardRouting {}
