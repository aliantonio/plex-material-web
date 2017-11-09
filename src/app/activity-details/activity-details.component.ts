import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Http, Jsonp, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { MaterializeAction } from 'angular2-materialize';
import { LoaderService } from '../loader.service';
import { DataStoreService } from '../data-store.service';
import { toast } from 'angular2-materialize';
import { ActivatedRoute, Router } from '@angular/router';
import { OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent } from "angular-star-rating/star-rating-struct";

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {

  name: string;
  dtls: string;
  type: string;
  id: string;
  usercomments: string;
  stars: number;
  modalTitle: string;
  modalMsg: string;
  @ViewChild('userComments') oElement;
  onClickResult:OnClickEvent;
  onHoverRatingChangeResult:OnHoverRatingChangeEvent;
  onRatingChangeResult: OnRatingChangeEven;
  modalActions = new EventEmitter<string | MaterializeAction>();
  isLoggedIn: boolean;
  genre: string;
  plot: string;
  imdb: string;
  rotten: string;
  imdbId: string;

  constructor(private http: Http, private jsonp: Jsonp, private loader: LoaderService,
    private route: ActivatedRoute, private router: Router, private dataStore: DataStoreService) { }

  ngOnInit() {
    this.loader.show();
    this.name = this.route.snapshot.params['name'];
    this.dtls = this.route.snapshot.params['dtls'];
    this.subscribeMediaDetails();
  }

  subscribeMediaDetails() {
    this.getMediaDetails()
      .subscribe(
        data => {
          console.log(data);
          this.id = data[0].ID;
          this.stars = data[0].STARS;
          this.usercomments = data[0].COMMENTS;
          this.loader.hide();
        },
        err => {
          console.error(err);
          this.loader.hide();
        }
    );
    this.getImdbRatings()
      .subscribe(
        data => {
          console.log(data);
          this.genre = data.Genre;
          this.plot = data.Plot;
          this.imdb = data.Ratings[0].Value;
          this.rotten = data.Ratings[1].Value;
          this.imdbId = data.imdbID;
          this.loader.hide();
        },
        err => {
          console.error(err);
          this.loader.hide();
        }
    );
  }

  updateRating = ($event:OnClickEvent, isComments: boolean) => {
    let loggedIn = localStorage.getItem('userid');
    if (loggedIn == null || loggedIn == undefined) {
      this.openModal('Error', 'Please login before submitting your review.', false);
      return;
    } else if (loggedIn != this.name) {
      this.openModal('Error', 'You cannot submit ratings for other people.', true);
      return;
    } else {
      console.log('onClick $event: ', $event);
      console.log("id", this.id);
      console.log("name", this.name);
      console.log("content", this.dtls);
      console.log("stars", this.stars);
      console.log("comment", this.oElement.nativeElement.value);

      if (!isComments) { this.stars = $event.rating; }
      this.onClickResult = $event;
      this.loader.show();

      // subscribe to call to DB
      this.setUserReview()
      .subscribe(
        data => {
          console.log(data);
          this.loader.hide();
          toast("Your review was successfully recorded.", 4000, 'rounded');
        },
        err => {
          console.error(err);
          toast("Something went wrong. Try again later.", 4000, 'rounded');
          this.loader.hide();
        }
      )

    }
  };

  onRatingChange = ($event:OnRatingChangeEven) => {
    console.log('onRatingUpdated $event: ', $event);
    this.onRatingChangeResult = $event;
  };

  onHoverRatingChange = ($event:OnHoverRatingChangeEvent) => {
      console.log('onHoverRatingChange $event: ', $event);
      this.onHoverRatingChangeResult = $event;
  };

  login() {
    this.closeModal();
    this.dataStore.setRedirectUrl("activity/"+this.name+"/"+this.dtls+"");
    this.router.navigate(['login']);
  }

  goToImdb() {
    window.open('http://www.imdb.com/title/' + this.imdbId, '_system', 'location=yes');
  }

  private encode(v: string): string {
      return v
      .replace(/:/g, '')
      .replace(/@/g, '')
      .replace(/$/g, '')
      .replace(/,/g, '')
      .replace(/;/g, '')
  }  

  private openModal(title, message, isLoggedIn) {
    this.modalTitle = title;
    this.modalMsg = message;
    this.isLoggedIn = isLoggedIn;
    this.modalActions.emit({ action: "modal", params: ["open"] });
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ["close"] });
  }

  private getImdbRatings() {
    let body = new URLSearchParams();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    if (this.dataStore.getType() === 'movie' || this.dataStore.getType() === '') {
      body.set('t', this.encode(this.dataStore.getTitle()));
    } else if (this.dataStore.getType() === 'episode') {
      body.set('t', this.dataStore.getShowTitle());
      body.set('Season', this.dataStore.getSeason().slice(7)); // remove the word season from string
      body.set('Episode', this.dataStore.getEpisode());
    }
    body.set('apikey', "288b0aab");
    
    return this.http.get("http://www.omdbapi.com/?", {params: body.toString()})
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  private getMediaDetails() {
    let body = new URLSearchParams();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    body.append('name', this.name);
    body.append('content', this.dtls);

    return this.http.post("http://asliantonio.com/plex/php/dbratequery.php", body.toString(), options)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
    
  }

  private setUserReview() {
    // make call to DB to update rating
    let commentsClean = this.oElement.nativeElement.value.replace(/'/g, '');
    let body = new URLSearchParams();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    body.append('id', this.id);
    body.append('name', this.name);
    body.append('content', this.dtls);
    body.append('rating', this.stars.toString());
    body.append('comments', commentsClean);

    return this.http.post("http://asliantonio.com/plex/php/dbupdaterating.php", body.toString(), options)
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
    return Observable.throw(error || "Server error.");
  }

}
