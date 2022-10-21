import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  constructor(private httpService: HttpService) {}

  createCredit(params) {
    return this.httpService.post('create-credit', params);
  }

  getCredits() {
    return this.httpService.get('get-credits');
  }
}
