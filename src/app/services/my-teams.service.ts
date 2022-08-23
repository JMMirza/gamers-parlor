import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class MyTeamsService {
  constructor(private httpService: HttpService) {}

  listMyTeams(params?) {
    return this.httpService.get('list-player-teams', params);
  }
}
