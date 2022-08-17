import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  post(endpoint: string, data: any) {
    let headersData = {};

    const headers = new HttpHeaders(headersData);
    const options = { headers: headers, withCredintials: true };
    const url = environment.apiUrl + endpoint;
    return this.http.post(url, data, options);
  }

  get(endpoint: string, data?: any) {
    const headers = new HttpHeaders({});
    const options = { headers: headers, withCredintials: true };
    const url = environment.apiUrl + endpoint;
    return this.http.get(url, options);
  }
}
