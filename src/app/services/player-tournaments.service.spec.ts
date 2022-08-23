import { TestBed } from '@angular/core/testing';

import { PlayerTournamentsService } from './player-tournaments.service';

describe('PlayerTournamentsService', () => {
  let service: PlayerTournamentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerTournamentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
