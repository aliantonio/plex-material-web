import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Injectable()
export class CheckMaintStatusService {

  constructor(public http: HttpClient) { }

  maintStatus() {
    return this.http.get('https://asliantonio.com/plex/php/maintstatus.php')
      .timeout(10000)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  public logResponse(res: Response) {
    console.log(res);
  }

  public extractData(res: Response) {
    return res;
  }

  public catchError(error: Response) {
    //console.error(error.statusText);
    return Observable.throw(error.statusText || "Server error.");
  }

}
