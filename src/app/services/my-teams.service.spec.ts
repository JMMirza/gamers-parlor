import { TestBed } from '@angular/core/testing';

import { MyTeamsService } from './my-teams.service';

describe('MyTeamsService', () => {
  let service: MyTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
