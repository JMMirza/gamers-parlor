import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class MatchResultsService {
  constructor(private httpService: HttpService) {}

  uploadMatchResult(params) {
    return this.httpService.post('upload-match-result', params);
  }
}
