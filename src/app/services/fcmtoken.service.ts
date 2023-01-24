import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class FcmtokenService {
  constructor(private httpService: HttpService) {}

  public saveFCMToken = (params) => {
    return this.httpService.post('save-token', params);
  };
}
