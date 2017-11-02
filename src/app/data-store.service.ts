import { Injectable } from '@angular/core';

@Injectable()
export class DataStoreService {

  constructor() { }

  url: string;

  getRedirectUrl() {
    return this.url;
  }

  setRedirectUrl(url: string) {
    this.url = url;
  }

}
