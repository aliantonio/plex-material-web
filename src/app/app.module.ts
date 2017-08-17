import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { StatusComponent } from './status/status.component';
import { PingServerService } from "./ping-server.service";
import { DialogService } from "./dialog.service";
import { JoinAPIService } from "./join-api.service";

import { RouterModule, Routes } from '@angular/router';

import { MdToolbarModule, MdButtonModule, MdDialogModule } from '@angular/material';
import { ActivityComponent } from './activity/activity.component';
import { DialogComponent } from './dialog/dialog.component';

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
    ActivityComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash:true}),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    MdToolbarModule,
    MdButtonModule,
    ReCaptchaModule,
    MdDialogModule
  ],
  exports: [DialogComponent],
  providers: [PingServerService, DialogService, JoinAPIService],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
