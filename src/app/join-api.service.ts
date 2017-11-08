import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JoinAPIService {

  constructor(private http: HttpClient) { }

  push(param: string, email?: any) {
    let deviceId = '15a97e1848184f7ca4c33f69a250313a'; // pixel 2
    let apiKey = '36daccd47ff14aa385a36d425ab4bc13';
    console.log('https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?text=' + param + email + '&deviceId=' + deviceId + '&apikey=' + apiKey);
    this.http.get('https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?text=' + param + email + '&deviceId=' + deviceId + '&apikey=' + apiKey)
    .subscribe(
    // Successful responses call the first callback.
    data => {
      console.log(data);
    },
    // Errors will call this callback instead:
    err => {
      console.error(err);
    });
  
  }

}
