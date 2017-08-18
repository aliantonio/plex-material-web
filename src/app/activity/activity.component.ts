import { Component, OnInit } from '@angular/core';
import { Http, Jsonp, Response } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  currentResults: string[];
  previousResults: string[];

  constructor(private http: Http, private jsonp: Jsonp) { }

  ngOnInit() {
    //this.getCurrentActivity();
    this.subscribePrevActivity();
  }

  subscribePrevActivity() {
    this.getPreviousActivity()
      .subscribe(
        data => {
          console.log(data);
          this.previousResults = data;
        },
        err => {
          console.error(err);
        }
    )
  }

  getPreviousActivity() {
    return this.http.get('http://asliantonio.com/plex/php/dbquery.php')
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

}
