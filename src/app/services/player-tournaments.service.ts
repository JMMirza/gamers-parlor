import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerTournamentsService {
  constructor(private httpService: HttpService) {}

  listMyTournaments(params?) {
    return this.httpService.get('list-player-tournaments', params);
  }
}
