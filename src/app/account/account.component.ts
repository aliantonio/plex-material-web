import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { LoginService } from "../login.service";
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @ViewChild('username') username;
  @ViewChild('password') password;
  modalActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(private md5: Md5, private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    let user = this.username.nativeElement.value;
    let pass = this.password.nativeElement.value;

    if (user == '' || pass == '' || user == undefined || pass == undefined) {
      console.log('empty credentials');
      this.openModal();
      return;
    }

    let encryptPass = Md5.hashStr(pass || '');
    console.log("unencryped : " + pass + ", encrypted : " + encryptPass);

  }

  openModal() {
    this.modalActions.emit({ action: "modal", params: ["open"] });
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ["close"] });
  }

}
