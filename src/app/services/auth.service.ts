import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { User } from '../models/User';

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

  public signup = (params) => {
    return this.httpService.post('register', params);
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

  setUser = async (username, email, avatar_url) => {
    await Preferences.set({
      key: 'username',
      value: username,
    });

    await Preferences.set({
      key: 'email',
      value: email,
    });

    await Preferences.set({
      key: 'avatar_url',
      value: avatar_url,
    });
  };

  async getToken(): Promise<string> {
    const { value } = await Preferences.get({ key: 'token' });
    // console.log(value);
    return value;
  }

  async getUserObject() {
    const username = await Preferences.get({ key: 'username' });
    const email = await Preferences.get({ key: 'email' });
    const avatar_url = await Preferences.get({ key: 'avatar_url' });

    return { username: username, email: email, avatar_url: avatar_url };
  }
}
