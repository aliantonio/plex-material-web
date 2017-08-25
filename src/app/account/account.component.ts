import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username = localStorage.getItem('userid');

  constructor(private router: Router) { }

  ngOnInit() {
  }

  resolve() {
    console.log('resolving state of authentication');
    if (localStorage.getItem('userid') === null) {
      console.log('user not signed in, redirecting to login page');
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    localStorage.clear();
    console.log('local storage cleared, user logged out');
    this.router.navigateByUrl('/login');
  }

  // $scope.logout = function () {
  //   $window.localStorage.clear();
  //   console.log('local storage cleared');
  //   $scope.username = "";
  //   $scope.password = "";
  //   $state.go('login', {});
  // }  

}
