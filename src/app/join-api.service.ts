import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toast } from 'angular2-materialize';

@Injectable()
export class JoinAPIService {

  constructor(private http: HttpClient) { }

  push(param: string, email?: any) {
    let deviceId = '18353c5d51b74659a7a7e38d93449da4'; // pixel 2
    let apiKey = '36daccd47ff14aa385a36d425ab4bc13';
    console.log('https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?text=' + param + email + '&deviceId=' + deviceId + '&apikey=' + apiKey);
    this.http.get('https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?text=' + param + email + '&deviceId=' + deviceId + '&apikey=' + apiKey)
    .subscribe(
    // Successful responses call the first callback.
    data => {
      console.log(data);
      if (param == "plex%20request") {
        toast('Success. Plex will be on shortly.', 4000, 'rounded');
      } else if (param == "check%20plex") {
        toast('Ok. I will look into it. Check back in a few minutes.', 4000, 'rounded');
      } else {
        toast('Push sent successfully', 4000, 'rounded');
      }

    },
    // Errors will call this callback instead:
    err => {
      console.error(err);
      toast('Something went wrong. Try again later or contact Anthony directly.', 4000, 'rounded');
    });
  
  }

}
