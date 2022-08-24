import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class WagersService {
  constructor(private httpService: HttpService) {}

  listWagers(params?) {
    return this.httpService.get('list-wagers', params);
  }
}
