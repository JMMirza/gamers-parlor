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

  searchUser(params) {
    return this.httpService.get('search-user', params);
  }

  getAllUser() {
    return this.httpService.get('get-all-user');
  }

  updateProfile(params) {
    return this.httpService.post('update-profile', params);
  }
}
