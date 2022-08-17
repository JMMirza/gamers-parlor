import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData$ = new BehaviorSubject<any>([]);
  authState = new BehaviorSubject(false);

  constructor(private httpService: HttpService) {}

  public login = (params) => {
    return this.httpService.post('login', params);
  };

  public getUser() {
    return this.httpService.get('user');
  }

  public async isAuthenticated(): Promise<boolean> {
    return await Preferences.get({ key: 'token' }).then(({ value }) => {
      if (value) {
        this.authState.next(true);
        return true;
      }
      this.authState.next(false);
      return false;
    });
  }

  setToken = async (token) => {
    await Preferences.set({
      key: 'token',
      value: token,
    });
  };

  async getToken(): Promise<string> {
    const { value } = await Preferences.get({ key: 'token' });
    // console.log(value);
    return value;
  }
}
