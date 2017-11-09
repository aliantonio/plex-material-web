import { Injectable } from '@angular/core';

@Injectable()
export class DataStoreService {

  constructor() { }

  url: string;
  type: string;
  user: string;
  title: string;
  season: string;
  episode: string;
  showTitle: string;

  getRedirectUrl() {
    return this.url;
  }

  setRedirectUrl(url: string) {
    this.url = url;
  }

  getType() {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
  }

  getUser() {
    return this.user;
  }

  setUser(user: string) {
    this.user = user;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getSeason() {
    return this.season;
  }

  setSeason(season: string) {
    this.season = season;
  }

  getEpisode() {
    return this.episode;
  }

  setEpisode(episode: string) {
    this.episode = episode;
  }

  getShowTitle() {
    return this.showTitle;
  }

  setShowTitle(showTitle: string) {
    this.showTitle = showTitle;
  }

}
