import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private httpService: HttpService) {}

  getProfile(params?) {
    return this.httpService.get('get-profile', params);
  }
}
