import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  constructor(private httpService: HttpService) {}

  listTournament(params?) {
    return this.httpService.get('list-tournaments');
  }
}
