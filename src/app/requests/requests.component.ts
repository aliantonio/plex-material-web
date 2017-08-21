import { Component, OnInit } from '@angular/core';
import { Http, Jsonp, Response } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests: string[];

  constructor(private http: Http, private jsonp: Jsonp) { }

  ngOnInit() {
    this.subscribeToRequests();
  }

  subscribeToRequests() {
    this.getRequests()
      .subscribe(
        data => {
          console.log(data);
          this.requests = data;
        },
        err => {
          console.error(err);
        }
    )
  }

  getRequests() {
    return this.http.get('http://asliantonio.com/plex/php/getrequests.php')
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
