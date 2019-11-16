import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserStoreService } from './user-store.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private userStore: UserStoreService, private router: Router) { }

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

  register(username: string, email: string, password: string, ): Observable<any> {
    return this.http.post('/registerdata/', {
      username: username,
      email: email,
      password: password
    });

  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/index'])
  }

}
