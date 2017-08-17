import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Injectable()
export class PingServerService {

  constructor(private http: Http) { }

  ping() {
    return this.http.get('http://asliantonio.com/dashboards/pingserver.php')
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
    //console.error(error.statusText);
    return Observable.throw(error.statusText || "Server error.");
  }

}
