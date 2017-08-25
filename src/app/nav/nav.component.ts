import { Component, OnInit } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //account = '';

  constructor() { }

  ngOnInit() {
    // let userLoggedIn = localStorage.getItem('userid');
    // if (userLoggedIn == '' || userLoggedIn == undefined) {
    //   this.account = 'Login';
    // } else {
    //   this.account = userLoggedIn;
    // }
  }

}
