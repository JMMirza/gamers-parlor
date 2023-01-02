import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class LadderService {
  constructor(private httpService: HttpService) {}

  listLadders(params?) {
    return this.httpService.get('list-ladders', params);
  }

  listTeamMatches(params?) {
    return this.httpService.get('list-team-matches', params);
  }

  listLadderMatches(params?) {
    return this.httpService.get('list-ladder-matches', params);
  }

  listLadderRequest(params) {
    return this.httpService.get('list-ladder-request', params);
  }

  getLaddersData(params?) {
    return this.httpService.get('get-ladder-data', params);
  }

  createLadderPost(params) {
    return this.httpService.post('create-ladder-post', params);
  }

  uploadLadderPostResult(params) {
    return this.httpService.post('upload-ladder-request', params);
  }

  createLadderRequestPost(params) {
    return this.httpService.post('create-ladder-post-request', params);
  }

  acceptRequest(params) {
    return this.httpService.get('accept-ladder-request', params);
  }

  rejectRequest(params) {
    return this.httpService.get('reject-ladder-request', params);
  }
}
