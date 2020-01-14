import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { JoinAPIService } from '../join-api.service';
import { MaterializeAction } from 'angular2-materialize';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-email-notif',
  templateUrl: './email-notif.component.html',
  styleUrls: ['./email-notif.component.css']
})
export class EmailNotifComponent implements OnInit {

  @ViewChild('email') email;
  @ViewChild('confirmemail') confirmemail;
  @ViewChild('moviecheckbox') moviecheckbox;
  @ViewChild('tvcheckbox') tvcheckbox;
  @ViewChild('unsubscribe') unsubscribe;
  modalMsg: string;
  modalTitle: string;
  modalActions = new EventEmitter<string | MaterializeAction>();
  disabled: boolean;

  constructor(private joinAPI: JoinAPIService, private loader: LoaderService) { }

  ngOnInit() {
    this.disabled = false;
  }

  submitRequest() {

    let email = this.email.nativeElement.value;
    let confirmemail = this.confirmemail.nativeElement.value;
    let moviecheckbox = this.moviecheckbox.nativeElement.checked;
    let tvcheckbox = this.tvcheckbox.nativeElement.checked;
    let unsubscribe = this.unsubscribe.nativeElement.checked;

    if (email == "" || email == "undefined" || confirmemail == "" || confirmemail == "undefined") {
      console.log('email or confirm email input field is empty');
      this.openModal('Error', 'Please enter and confirm your email.');
      return;

    } else if (email !== confirmemail) {
      console.log('email addresses do not match');
      console.log("Email address: " + this.email.nativeElement.value);
      console.log("Confirm email: " + this.confirmemail.nativeElement.value);
      this.openModal('Error', 'Email addresses do not match.');
      return;

    } else if (moviecheckbox == false && tvcheckbox == false && unsubscribe == false ) {
      console.log("Movie request: " + this.moviecheckbox.nativeElement.checked);
      console.log("TV request: " + this.tvcheckbox.nativeElement.checked);
      this.openModal('Error', 'Please select what you would like to subscribe to.')
      return;

    }
     
    this.loader.show();
    if (unsubscribe == true) {
      console.log("remove=:=" + email + "=:=" + moviecheckbox + "=:=" + tvcheckbox);
      this.joinAPI.push("remove", "=:=" + email + "=:=" + moviecheckbox + "=:=" + tvcheckbox);
    } else {
      console.log("subscribe=:=" + email + "=:=" + moviecheckbox + "=:=" + tvcheckbox);
      this.joinAPI.push("subscribe", "=:=" + email + "=:=" + moviecheckbox + "=:=" + tvcheckbox);
    }


  }

  toggleUnsub() {
    let unsubscribe = this.unsubscribe.nativeElement.checked;
    unsubscribe == true ? this.disabled = true : this.disabled = false;
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
