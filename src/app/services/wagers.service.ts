import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class WagersService {
  constructor(private httpService: HttpService) {}

  listWagers(params?) {
    return this.httpService.get('list-wagers', params);
  }

  listWagerMatches(params?) {
    return this.httpService.get('list-wager-matches', params);
  }

  getWagersData(params?) {
    return this.httpService.get('get-wager-data', params);
  }

  createWagerPost(params) {
    return this.httpService.post('create-wager-post', params);
  }

  createWagerRequestPost(params) {
    return this.httpService.post('create-wager-post-request', params);
  }
}
