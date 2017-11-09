import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { PingServerService } from "../ping-server.service";
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { JoinAPIService } from '../join-api.service';
import { LoaderService } from '../loader.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  private alive: boolean;
  isPoweredOn: boolean;
  private requestSent: boolean;
  private reportSent: boolean;
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  constructor(private http: Http, private pingServer: PingServerService,
    private joinAPI: JoinAPIService, private jsonp: Jsonp, private loader: LoaderService) {
    this.alive = true;
    this.requestSent = false;
    this.reportSent = false;
  }

  ngOnInit() {
    this.alive = true;
    this.loader.show();
    this.checkStatus();
  }

  checkStatus() {
    Observable.timer(0, 5000) // 5 seconds
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
          console.error(err + " - computer is likely not powered on.");
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
      console.log('captcha token not generated.');
      toast("Prove you're not a robot. Click the captcha before turning on Plex.", 4000, 'rounded');
      //this.dialog.show('Are you a robot?', 'Click the captcha before turning on Plex.');
    } else {
      console.log('power button triggered');
      this.joinAPI.push("plex%20request");
      this.requestSent = true;
    }
  }

  report() {
    let token = this.captcha.getResponse();
    if ( this.reportSent ) {
      toast("A report has already been sent.", 4000, 'rounded');
    } else if (token == "" || token == undefined) {
      toast("Click the captcha before sending report to Anthony.", 4000, 'rounded');
    } else {
      console.log('power button triggered');
      this.joinAPI.push("check%20plex");
      this.reportSent = true;
    }
  }

}
