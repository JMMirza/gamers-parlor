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

  listWagerRequest(params) {
    return this.httpService.get('list-wager-request', params);
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

  acceptRequest(params) {
    return this.httpService.get('accept-wager-request', params);
  }

  rejectRequest(params) {
    return this.httpService.get('reject-wager-request', params);
  }
}
