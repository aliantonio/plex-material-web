import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
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
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('username') username;
  @ViewChild('confirmusername') confirmusername;
  @ViewChild('password') password;
  modalMsg: string;
  modalTitle: string;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private md5: Md5, private http: Http, private router: Router, private loader: LoaderService) { }

  ngOnInit() {
  }

  register() {
    let user = this.username.nativeElement.value;
    let confirmuser = this.confirmusername.nativeElement.value;
    let pass = this.password.nativeElement.value;

    if (user == '' || confirmuser == '' || pass == '' || user == undefined || confirmuser == undefined || pass == undefined) {
      console.log('username or password is blank');
      this.openModal('Error', 'The username and/or password fields cannot be empty.');
      return;
    } else if (user !== confirmuser) {
      console.log('email or confirm email input is left blank');
      this.openModal('Error', 'Your email addresses do not match.');
      return;
    } else {
      this.loader.show();
      let encryptPass = Md5.hashStr(pass || '');
      console.log("unencryped : " + pass + ", encrypted : " + encryptPass);

      let urlSearchParams = new URLSearchParams();
      urlSearchParams.set('name', user);
      urlSearchParams.set('userpassword', encryptPass.toString());
      let body = urlSearchParams.toString();   

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'}); 
      let options = new RequestOptions({ headers: headers });

      this.callRegister(body, options)
      .subscribe(
        data => {
          console.log(data._body);
          let response = data._body;
          if (response.substring(0,21) == "Error: Duplicate entry") {
            this.openModal('Error', 'You are already registered.');
            this.loader.hide();
            return;
          } else if (response == null || response.substring(0, 5) == "Error") {
            console.error(response);
            this.openModal('Oops!', 'Something went wrong. Try again later or ask Anthony to look into it. \n\n\nGive him this error: ' + response);
            this.loader.hide();
            return;
          } else {
            console.log('new user registered and successfully logged in');
            console.log('localStorage auth', user);
            localStorage.setItem('userid', user);
            toast("Success. You are now registered.", 4000, 'rounded');
            this.router.navigateByUrl('/account');
          }
          this.loader.hide();
        },
        err => {
          console.error(err);
          this.loader.hide();
          this.openModal('Oops!', 'Something went wrong. Try again later or ask Anthony to look into it.');
        }
      );

    }

  }

  private callRegister(body, options) {
    return this.http.post('https://asliantonio.com/plex/php/register.php', body.toString(), options)
//      .timeout(10000)
      .do(this.logResponse)
  //    .map(this.extractData)
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
