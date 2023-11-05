import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './loginModule/forget-password/forget-password.component';
import { SetPasswordComponent } from './loginModule/set-password/set-password.component';
import { SigninComponent } from './loginModule/signin/signin.component';
import { SignupComponent } from './loginModule/signup/signup.component';
import { VerifyEmailComponent } from './loginModule/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'login', component: SigninComponent },
  { path: 'verify/:token', component: VerifyEmailComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password/:token', component: SetPasswordComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import(`src/app/dashboardModule/dashboard.module`).then(
        (m) => m.DashboardModule
      ),
  },
  { path: '**', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
