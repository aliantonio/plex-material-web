// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// custom components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { StatusComponent } from './status/status.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { RequestsComponent } from './requests/requests.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';

// custom services
import { PingServerService } from './ping-server.service';
import { JoinAPIService } from './join-api.service';
import { LoginService } from './login.service';
import { LoaderService } from './loader.service';
import { DataStoreService } from './data-store.service';

// node modules
import { MaterializeModule } from 'angular2-materialize';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Md5 } from 'ts-md5/dist/md5';
import { StarRatingModule } from 'angular-star-rating';
import { DateFormatPipe } from './date-format.pipe';
import { EmailNotifComponent } from './email-notif/email-notif.component';
import { componentFactoryName } from '@angular/compiler';
import { RegisterComponent } from './register/register.component';
import { FaqComponent } from './faq/faq.component';

const appRoutes: Routes = [
  {
    path: '',
    component: StatusComponent
  },
  {
    path: 'activity',
    component: ActivityComponent
  },
  {
    path: 'activity/:name/:dtls',
    component: ActivityDetailsComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'requests',
    component: RequestsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    resolve: {
      resolve: AccountComponent
    }
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'email-notif',
    component: EmailNotifComponent
  },
  {
    path: '',
    redirectTo: 'status',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StatusComponent,
    ActivityComponent,
    ActivityDetailsComponent,
    RequestsComponent,
    LoginComponent,
    AccountComponent,
    DateFormatPipe,
    EmailNotifComponent,
    RegisterComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash:true}),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    ReCaptchaModule,
    JsonpModule,
    MaterializeModule,
    InfiniteScrollModule,
    StarRatingModule.forRoot()
  ],
  exports: [MaterializeModule],
  providers: [PingServerService, JoinAPIService, Md5, LoginService, AccountComponent, LoaderService, DataStoreService],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
