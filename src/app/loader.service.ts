import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable()
export class LoaderService {

  constructor() { }

  show() {
    $('.progress').css('visibility', 'visible');
  }

  hide() {
    $('.progress').css('visibility', 'hidden');
  }

}
