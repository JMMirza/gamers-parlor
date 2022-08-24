import { TestBed } from '@angular/core/testing';

import { WagersService } from './wagers.service';

describe('WagersService', () => {
  let service: WagersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WagersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
