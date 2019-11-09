import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private userStore: UserStoreService) {}

  login(username: string, password: string): Observable<any> {
    // return this.http.post('./logindata/',8
    // );
    return this.http.post('./logindata/', {
      username: username,
      password: password
    }).pipe(map((resp: any) => { 
      this.userStore.token = resp.token;
      //console.log(resp)
      return resp;
    }));
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post('/registerdata/', {
      username: username,
      password: password
    });
    
  }


  
}
