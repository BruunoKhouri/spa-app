import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { MEAT_API } from '../../app.api';
import { User } from './user.model';
import { filter, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  public user: User;
  public lastUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  isLoggedIn(): boolean {
    return this.getToken();
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`, { email: email, password: password }).pipe(tap(user => { this.user = user; console.log('doUser', user) }));
  }

  create(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`, { email: email, password: password }).pipe(tap(user => { this.user = user; console.log('doUser', user) }));
  }

  logout() {
    this.user = undefined;
  }

  handleLogin(patch: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(patch)]);
  }

  getToken(): boolean {
    let token = !!JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (token) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
