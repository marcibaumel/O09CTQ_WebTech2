import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";

@Injectable({providedIn: 'root'})
export class AuthService{

  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListnere() {
    return this.authStatusListener.asObservable();
  }

  creatUser(email: string, username: string, password: string) {
    const authData: AuthData = { email: email, username: username, password: password };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe((response) => {
        console.log(response);
        this.login(email,username,password);
      });
  }

  login(email: string, username: string, password: string) {
    const authData: AuthData = { email: email, username: username, password: password };
    this.http
      .post<{ token: string; expiresIn: number }>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate);
          console.log(expirationDate);
          this.router.navigate(['/']);
        }
      });
  }


  private setAuthTimer(duration: number){
    console.log('Setting timer: '+duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/user/login']);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation){
      this.router.navigate(['/user/signup']);
      return null;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime()-now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return null;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

  private saveAuthData(toke: string, expirationDate: Date) {
    localStorage.setItem('token', this.token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token'), localStorage.removeItem('expiration');
  }

}
