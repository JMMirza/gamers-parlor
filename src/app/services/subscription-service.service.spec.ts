import { TestBed } from '@angular/core/testing';

import { SubscriptionServiceService } from './subscription-service.service';

describe('SubscriptionServiceService', () => {
  let service: SubscriptionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
