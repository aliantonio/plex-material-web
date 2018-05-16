import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http, Jsonp, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { LoaderService } from '../loader.service';
import { toast } from 'angular2-materialize';
import { Router } from '@angular/router';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  currentResults: string[];
  previousResults: string[];
  //lazy: number;
  // add below attributes in html a link to implement lazy loading feature
  //slice:0:lazy;
  //infiniteScroll
  //[infiniteScrollDistance]="1" 
  //[infiniteScrollThrottle]="300" 
  //(scrolled)="onScroll()"
  Materialize: any;
  limit: any = 50;
  offset: any = 0;

  constructor(private http: Http, private jsonp: Jsonp, private loader: LoaderService, private router: Router, private dataStore: DataStoreService) { }

  ngOnInit() {
    this.loader.show();
    this.subscribePrevActivity();
    this.subscribeCurrActivity();
  }

  getCurrActivity() {
    return this.http.get('http://asliantonio.dyndns.org:32400/status/sessions?X-Plex-Token=MbxwPyCXzVwkYQ7ESW87')
    .timeout(10000)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError);
  }

  getMoreResults() {
    this.offset = this.offset + this.limit;
    let body = new URLSearchParams();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    body.set('limit', this.limit);
    body.set('offset', this.offset);

    return this.http.get('https://asliantonio.com/plex/php/dbquery.php', {params: body.toString()})
      .timeout(10000)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
      
  }

  getPreviousActivity() {
    let body = new URLSearchParams();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    body.set('limit', this.limit);
    body.set('offset', this.offset);
    
    return this.http.get('https://asliantonio.com/plex/php/dbquery.php', {params: body.toString()})
      .timeout(10000)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  loadMore() {
    this.subscribeLoadMore();
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
      }
    )
  }

  subscribeLoadMore() {
    this.loader.show();
    this.getMoreResults()
      .subscribe(
        data => {
          console.log(data);
          data.forEach((obj) => {
            this.previousResults.push(obj);
          });

          this.loader.hide();
        },
        err => {
          console.error(err);
          this.loader.hide();
          toast('Something went wrong. Please check your internet connection.', 7000, 'rounded');
        }
    )
  }

  subscribePrevActivity() {
    this.getPreviousActivity()
      .subscribe(
        data => {
          console.log(data);
          //this.lazy = 100;
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

//  onScroll() {
//    this.lazy += 10;
//  }

  navigateTo(type, user, title, showTitle, season, episode) {
    this.dataStore.setType(type);
    this.dataStore.setUser(user);
    this.dataStore.setTitle(title);
    this.dataStore.setShowTitle(showTitle);
    this.dataStore.setSeason(season);
    this.dataStore.setEpisode(episode);
    this.router.navigateByUrl("/activity/"+user+"/"+title);
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
