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

  listTeamMembers(params?) {
    return this.httpService.get('list-team-members', params);
  }

  createTeam(params) {
    return this.httpService.post('create-team', params);
  }

  createLadderTeam(params) {
    return this.httpService.post('create-ladder-team', params);
  }

  listLadderTeam(params?) {
    return this.httpService.get('get-ladder-teams', params);
  }

  listTeamInvite(params?) {
    return this.httpService.get('get-team-invites', params);
  }

  acceptTeamInvite(params) {
    return this.httpService.get('accept-team-invites', params);
  }

  rejectTeamInvite(params) {
    return this.httpService.get('reject-team-invites', params);
  }
}
