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

import { RouterModule, Routes } from '@angular/router';

import { ActivityComponent } from './activity/activity.component';

import { MaterializeModule } from "angular2-materialize";

const appRoutes: Routes = [
  {
    path: '',
    component: StatusComponent
  },
  {
    path: 'activity',
    component: ActivityComponent
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
    ActivityComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash:true}),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    ReCaptchaModule,
    JsonpModule,
    MaterializeModule
  ],
  exports: [MaterializeModule],
  providers: [PingServerService, JoinAPIService],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
