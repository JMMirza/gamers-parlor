import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  constructor(private httpService: HttpService) {}

  listTournament(params?) {
    return this.httpService.get('list-tournaments', params);
  }

  listVipTournament(params?) {
    return this.httpService.get('list-vip-tournaments', params);
  }
}
