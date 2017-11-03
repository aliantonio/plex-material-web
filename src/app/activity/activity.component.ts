import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http, Jsonp, Response } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { LoaderService } from '../loader.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  currentResults: string[];
  previousResults: string[];
  lazy: number;
  Materialize: any;

  constructor(private http: Http, private jsonp: Jsonp, private loader: LoaderService) { }

  ngOnInit() {
    this.loader.show();
    this.subscribePrevActivity();
    this.subscribeCurrActivity();
  }

  subscribeCurrActivity() {
    this.getCurrActivity()
    .subscribe(
      data => {
        console.log(data);
        this.currentResults = data.MediaContainer.Video;
        this.loader.hide();
      },
      err => {
        console.error(err);
        //this.loader.hide();
        //toast('Something went wrong. Please check your internet connection.', 7000, 'rounded');
      }
    )
  }

  subscribePrevActivity() {
    this.getPreviousActivity()
      .subscribe(
        data => {
          console.log(data);
          this.lazy = 100;
          this.previousResults = data;
          this.loader.hide();
        },
        err => {
          console.error(err);
          this.loader.hide();
          toast('Something went wrong. Please check your internet connection.', 7000, 'rounded');
        }
    )
  }

  getCurrActivity() {
    return this.http.get('http://asliantonio.dyndns.org:32400/status/sessions?X-Plex-Token=MbxwPyCXzVwkYQ7ESW87')
    .timeout(10000)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError);
  }

  getPreviousActivity() {
    return this.http.get('http://asliantonio.com/plex/php/dbquery.php')
      .timeout(10000)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  onScroll() {
    this.lazy += 10;
  }

  private logResponse(res: Response) {
    console.log(res);
  }

  private extractData(res: Response) {
    return res.json();
  }
  
  private catchError(error: Response) {
    //onsole.error(error);
    return Observable.throw(error || "Server error.");
  }

}
