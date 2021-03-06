import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toast } from 'angular2-materialize';
import { Router, LoadChildren } from '@angular/router';
import { LoaderService } from './loader.service';

@Injectable()
export class JoinAPIService {

  constructor(private http: HttpClient, private router: Router, private loader: LoaderService) { }

  push(param: string, args?: any) {
    let apiUrl = 'https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?text='
    let deviceId = 'f70f80282ea741f190b8d80d9388f460'; // pixel 5
    let apiKey = '36daccd47ff14aa385a36d425ab4bc13';
    
    console.log(apiUrl + param + args + '&deviceId=' + deviceId + '&apikey=' + apiKey);
    this.http.get(apiUrl + param + args + '&deviceId=' + deviceId + '&apikey=' + apiKey)
    .subscribe(
    // Successful responses call the first callback.
    data => {
      console.log(data);
      if (param == "plex%20request") {
        toast('Success. Plex will be on shortly.', 4000, 'rounded');
      } else if (param == "check%20plex") {
        toast('Ok. I will look into it. Check back in a few minutes.', 4000, 'rounded');
      } else if (param == "subscribe") {
        toast('Success. You will receive emails for new content.', 4000, 'rounded');
        this.loader.hide();
        setTimeout(() => toast('Automatically redirecting you back to home page...', 4000, 'rounded'), 4000);
        setTimeout(() => this.router.navigateByUrl("/"), 6000)
        this.loader.show();
      } else if (param == "remove") {
        toast('Bummer. You are unsubscribed from emails...', 4000, 'rounded');
        this.loader.hide();
        setTimeout(() => toast('Automatically redirecting you back to home page...', 4000, 'rounded'), 4000);
        setTimeout(() => this.router.navigateByUrl("/"), 6000)
        this.loader.show();

      }
      else {
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
