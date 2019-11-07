import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// @Injectable({
//   providedIn: 'allstocks'
// })
export class ApiService {

  constructor(private _http: HttpClient) {
    
  }
  getNotificationsapi() {
    return this._http.get<any>('./top20stocks');
  }

}
