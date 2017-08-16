import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { StatusComponent } from './status/status.component';

import { RouterModule, Routes } from '@angular/router';

import { MdSidenavModule, MdToolbarModule, MdTabsModule, MdButtonModule } from '@angular/material';



const appRoutes: Routes = [
  {
    path: '',
    component: StatusComponent
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
    StatusComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash:true}),
    BrowserAnimationsModule,
    HttpClientModule,
    MdSidenavModule,
    MdToolbarModule,
    MdTabsModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
