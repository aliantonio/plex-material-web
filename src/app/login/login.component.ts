import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { LoginService } from "../login.service";
import { MaterializeAction } from 'angular2-materialize';
import { Http, Jsonp, Response, RequestOptions, Headers  } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username;
  @ViewChild('password') password;
  modalMsg: string;
  modalTitle: string;
  modalActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(private md5: Md5, private loginService: LoginService, private http: Http,
      private router: Router, private loader: LoaderService, private dataStore: DataStoreService) { }

  ngOnInit() {
  }

  login() {
    let user = this.username.nativeElement.value;
    let pass = this.password.nativeElement.value;

    if (user == '' || pass == '' || user == undefined || pass == undefined) {
      console.log('username or password is blank');
      this.openModal('Error', 'The username and password fields cannot be empty.');
      return;
    } else {

      this.loader.show();
      let encryptPass = Md5.hashStr(pass || '');
      //console.log("unencryped : " + pass + ", encrypted : " + encryptPass);

      let urlSearchParams = new URLSearchParams();
      urlSearchParams.set('name', user);
      urlSearchParams.set('password', encryptPass.toString());
      let body = urlSearchParams.toString();   

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'}); 
      let options = new RequestOptions({ headers: headers });

      this.callLogin(body, options)
      .subscribe(
        data => {
          console.log(data);
          if (data == null) {
            console.error('invalid credentials');
            this.openModal('Oops!', 'Your username and/or password do not match. Please try again.')
          } else {
            console.log('successfully logged in');
            console.log('localStorage auth', user);
            localStorage.setItem('userid', user);
            console.log(this.dataStore.getRedirectUrl());
            if (this.dataStore.getRedirectUrl() == undefined) {
              this.router.navigateByUrl('/account');
            } else {
              this.router.navigateByUrl(this.dataStore.getRedirectUrl());
            }
            
          }
          this.loader.hide();
        },
        err => {
          console.error(err);
          this.loader.hide();
        }
      );
    }
  }

  private callLogin(body, options) {
    return this.http.post('https://asliantonio.com/plex/php/login.php', body, options)
      .timeout(10000)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  private logResponse(res: Response) {
    console.log(res);
  }

  private extractData(res: Response) {
    return res.json();
  }
  
  private catchError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Server error.");
  }

  private openModal(title, message) {
    this.modalTitle = title;
    this.modalMsg = message;
    this.modalActions.emit({ action: "modal", params: ["open"] });
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ["close"] });
  }

}
