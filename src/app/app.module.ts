import{NgModule}from'@angular/core';
import {BrowserModule }from '@angular/platform-browser';
import {environment}from 'src/environments/environment';
import {AngularFireModule}from '@angular/fire/compat';
import {AngularFireAuthModule}from '@angular/fire/compat/auth';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFirestoreModule}from '@angular/fire/compat/firestore';
import {AngularFireDatabaseModule}from '@angular/fire/compat/database';
import {AppRoutingModule }from './app-routing.module';
import {AppComponent}from './app.component';
import {DashboardComponent}from './components/dashboard/dashboard.component';
import {SignInComponent}from './components/sign-in/sign-in.component';
import {SignUpComponent}from './components/sign-up/sign-up.component';
import {ForgotPasswordComponent}from './components/forgot-password/forgot-password.component';
import {VerifyEmailComponent }from './components/verify-email/verify-email.component';
import {AuthService}from './shared/services/auth.service';
import {HttpClientModule}from '@angular/common/http';
import { IgxRadialGaugeModule}from 'igniteui-angular-gauges';
import { FormsModule}from '@angular/forms';
import {DragDropModule}from '@angular/cdk/drag-drop';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSliderModule}from '@angular-slider/ngx-slider';

@NgModule({
declarations: [
AppComponent,
DashboardComponent,
SignInComponent,
SignUpComponent,
ForgotPasswordComponent,
VerifyEmailComponent
],
imports: [
BrowserModule,
AppRoutingModule,
AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    IgxRadialGaugeModule,
    FormsModule,
    DragDropModule,
    NgxSliderModule,
    BrowserAnimationsModule



  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
