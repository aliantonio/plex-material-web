import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { PingServerService } from "../ping-server.service";
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { JoinAPIService } from '../join-api.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  private alive: boolean;
  private isPoweredOn: boolean;
  private requestSent: boolean;
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  constructor(private http: Http, private pingServer: PingServerService,
    private joinAPI: JoinAPIService, private jsonp: Jsonp, private loader: LoaderService) {
    this.alive = true;
    this.requestSent = false;
  }

  ngOnInit() {
    this.alive = true;
    this.loader.show();
    this.checkStatus();
  }

  checkStatus() {
    Observable.timer(0, 5000)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.pingServer.ping()
        .subscribe((data) => {
          console.log(data);
          this.isPoweredOn = true;
          this.loader.hide();
        },
        err => {
          this.ngOnDestroy();
          console.error(err);
          this.isPoweredOn = false;
          this.loader.hide();
      });
    });
  }

  ngOnDestroy() {
    console.log('destroying http requests');
    this.alive = false;
  }

  powerOn() {
    console.log('power button clicked');
    let token = this.captcha.getResponse();
    if (token == "" || token == undefined) {
      console.log('captcha token not generated, triggering modal.');
      //this.dialog.show('Are you a robot?', 'Click the captcha before turning on Plex.');
    } else {
      console.log('power button triggered');
      this.requestSent = true;
      this.joinAPI.push("plex%20request", "");
    }
  }

}
