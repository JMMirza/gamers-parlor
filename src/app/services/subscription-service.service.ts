import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionServiceService {
  constructor(private httpService: HttpService) {}

  createSub(params) {
    return this.httpService.post('purchase-subscription', params);
  }

  getSubs() {
    return this.httpService.get('get-subscription');
  }
}
