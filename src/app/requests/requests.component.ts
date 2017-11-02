import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Http, Jsonp, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { MaterializeAction } from 'angular2-materialize';
import { LoaderService } from '../loader.service';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  @ViewChild('mediaRequest') oRequest;
  @ViewChild('comments') oComments;
  requests: any;
  modalTitle: string;
  modalMsg: string;
  isLoggedIn: boolean;
  isComments: boolean;
  id: string;
  modalActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(private http: Http, private jsonp: Jsonp, private loader: LoaderService, private router: Router, private dataStore: DataStoreService) { }

  ngOnInit() {
    this.loader.show();
    this.subscribeToRequests();
  }

  subscribeToRequests() {
    this.loader.show();
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

  submitRequest($event) {
    let loggedIn = localStorage.getItem('userid');
    let request = this.oRequest.nativeElement.value;
    if ( loggedIn == null || loggedIn == undefined ) {
      this.openModal('Error', 'Please login before submitting your review.', false, false);
    } else if (request.length <= 0) {
      this.openModal('Error', 'Please enter a request before submitting.', true, false);
    } else {
      this.loader.show();

      // subscribe to call to DB
      this.dbSubmit()
      .subscribe(
        data => {
          console.log(data);
          this.oRequest.nativeElement.value = "";
          this.requests.unshift({ "USER_ID": "" + loggedIn + "", "REQUEST": "" + request + "", "COMMENTS": "", "CMPLTD": "N" });
          this.loader.hide();
          toast("Your request was successfully recorded.", 4000, 'rounded');
        },
        err => {
          console.error(err);
          toast("Something went wrong. Try again later.", 4000, 'rounded');
          this.loader.hide();
        }
      )
      
    }
  }

  login() {
    this.closeModal();
    this.dataStore.setRedirectUrl('requests');
    this.router.navigate(['login']);
  }

  onEnter($event) {
    $event.preventDefault();
    this.submitRequest($event);
  }

  delete(i, id) {

    this.loader.show();

    // subscribe to call to DB
    this.deleteRequest(id)
    .subscribe(
      data => {
        console.log(data);
        this.requests.splice(i, 1);
        this.loader.hide();
        toast("Deleted successfully.", 4000, 'rounded');
      },
      err => {
        console.error(err);
        toast("Something went wrong. Try again later.", 4000, 'rounded');
        this.loader.hide();
      }
    )
  }

  complete(id) {
   
    this.loader.show();

    // subscribe to call to DB
    this.markComplete(id)
    .subscribe(
      data => {
        console.log(data);
        this.loader.hide();
        this.subscribeToRequests();
        toast("Recorded successfully.", 4000, 'rounded');
      },
      err => {
        console.error(err);
        toast("Something went wrong. Try again later.", 4000, 'rounded');
        this.loader.hide();
      }
    )
    
  }

  comment(name, title, id) {
    this.id = id;
    this.openModal(''+name+' : '+title+ '', '', true, true);
  }

  submitComments() {

    this.loader.show();
    
    // subscribe to call to DB
    this.dbSubmitComment()
    .subscribe(
      data => {
        console.log(data);
        this.loader.hide();
        this.oComments.nativeElement.value = "";
        this.closeModal();
        this.subscribeToRequests();
        toast("Comment added successfully.", 4000, 'rounded');
      },
      err => {
        console.error(err);
        toast("Something went wrong. Try again later.", 4000, 'rounded');
        this.loader.hide();
      }
    )
  }

  private markComplete(id) {
    let body = new URLSearchParams();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    body.append('id', id);

    return this.http.post("http://asliantonio.com/plex/php/markcomplete.php", body.toString(), options)
      .do(this.logResponse)
      .catch(this.catchError);
  }

  private dbSubmitComment() {
    let body = new URLSearchParams();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    body.append('id', this.id);
    body.append('comment', this.oComments.nativeElement.value);
    console.log(this.id, this.oComments.nativeElement.value);

    return this.http.post("http://asliantonio.com/plex/php/submitcomment.php", body.toString(), options)
      .do(this.logResponse)
      .catch(this.catchError);
  }

  private openModal(title, message, isLoggedIn, isComments) {
    this.modalTitle = title;
    this.modalMsg = message;
    this.isLoggedIn = isLoggedIn;
    this.isComments = isComments;
    this.modalActions.emit({ action: "modal", params: ["open"] });
  }

  private closeModal() {
    this.modalActions.emit({ action: "modal", params: ["close"] });
  }

  private dbSubmit() {
    let loggedIn = localStorage.getItem('userid');
    let request = this.oRequest.nativeElement.value;
    let body = new URLSearchParams();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    body.append('name', loggedIn);
    body.append('request', request);

    return this.http.post("http://asliantonio.com/plex/php/submitrequest.php", body.toString(), options)
      .do(this.logResponse)
      .catch(this.catchError);
  }

  private deleteRequest(id) {
    let body = new URLSearchParams();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    body.append('data', id);

    return this.http.post("http://asliantonio.com/plex/php/deleterequest.php", body.toString(), options)
    .do(this.logResponse)
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
