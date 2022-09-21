import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private httpService: HttpService) {}

  createTransaction(params) {
    return this.httpService.post('create-transaction', params);
  }
}
