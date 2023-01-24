import { TestBed } from '@angular/core/testing';

import { FcmtokenService } from './fcmtoken.service';

describe('FcmtokenService', () => {
  let service: FcmtokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FcmtokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
