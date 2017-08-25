import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http, Jsonp, Response } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { MaterializeAction } from 'angular2-materialize';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests: string[];
  modalActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(private http: Http, private jsonp: Jsonp, private loader: LoaderService) { }

  ngOnInit() {
    this.loader.show();
    this.subscribeToRequests();
  }

  subscribeToRequests() {
    this.getRequests()
      .subscribe(
        data => {
          console.log(data);
          this.requests = data;
          this.loader.hide();
        },
        err => {
          console.error(err);
          this.loader.hide();
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

  showSecondary(event, index) {
    console.log(event, index);
    this.modalActions.emit({ action: "dropdown", params: ['open'] });
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
