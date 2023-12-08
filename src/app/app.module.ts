import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './mainModule/header/header.component'
import { FooterComponent } from './mainModule/footer/footer.component'
import { SignupComponent } from './loginModule/signup/signup.component'
import { SigninComponent } from './loginModule/signin/signin.component'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatTableModule } from '@angular/material/table'
import { CommonModule, registerLocaleData } from '@angular/common'
import { MatSliderModule } from '@angular/material/slider'
import { ForgetPasswordComponent } from './loginModule/forget-password/forget-password.component'
import { SetPasswordComponent } from './loginModule/set-password/set-password.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { DashboardComponent } from './dashboardModule/dashboard.component'
import { VerifyEmailComponent } from './loginModule/verify-email/verify-email.component'
import { SideNavigationComponent } from './mainModule/side-navigation/side-navigation.component'
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n'

import { NzAlertModule } from 'ng-zorro-antd/alert'
import { NzNotificationModule } from 'ng-zorro-antd/notification'
import { NgxSpinnerModule } from 'ngx-spinner'
import en from '@angular/common/locales/en'

registerLocaleData(en)

@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    ForgetPasswordComponent,
    SetPasswordComponent,
    SideNavigationComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    BrowserModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    NzNotificationModule,
    NzAlertModule,
    NgxSpinnerModule,
    CommonModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
