import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { StatusComponent } from './status/status.component';
import { PingServerService } from "./ping-server.service";
import { JoinAPIService } from "./join-api.service";
import { Md5 } from 'ts-md5/dist/md5';
import { LoginService } from "./login.service";

import { RouterModule, Routes } from '@angular/router';

import { ActivityComponent } from './activity/activity.component';

import { MaterializeModule } from "angular2-materialize";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { RequestsComponent } from './requests/requests.component';
import { AccountComponent } from './account/account.component';

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
    path: 'requests',
    component: RequestsComponent
  },
  {
    path: 'account',
    component: AccountComponent
  }
  // {
  //   path: '',
  //   redirectTo: '/status',
  //   pathMatch: 'full'
  // }
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StatusComponent,
    ActivityComponent,
    ActivityDetailsComponent,
    RequestsComponent,
    AccountComponent
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
    InfiniteScrollModule
  ],
  exports: [MaterializeModule],
  providers: [PingServerService, JoinAPIService, Md5, LoginService],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
