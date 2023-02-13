import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
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

  async tournamentsData(params?) {
    let tournaments = this.listTournament(params);
    let vipTournaments = this.listVipTournament(params);

    return await forkJoin([tournaments, vipTournaments]);
  }

  createTournament(params) {
    return this.httpService.post('create-tournament', params);
  }

  listTournamentTeams(params) {
    return this.httpService.get('list-tournament-teams', params);
  }

  listGames(params) {
    return this.httpService.get('platform-games', params);
  }
}
