import { Role } from '../interfaces/User';
import { IToken } from '../interfaces/Token';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userKey: string;
  tokenKey: string;
  organizationKey: string;

  constructor() {
    this.userKey = '@lazuli/user';
    this.tokenKey = '@lazuli/token';
  }

  logout(): void {
    localStorage.clear();
  }

  isLogged(): boolean {
    const user = this.getUser();
    return user ? true : false;
  }

  setUser(user: IUser): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): IUser {
    const user = localStorage.getItem(this.userKey);
    return JSON.parse(user) as IUser;
  }

  getRole(): Role {
    const user = JSON.parse(localStorage.getItem(this.userKey)) as IUser;
    return user.role;
  }

  setToken(token: IToken): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  getToken(): IToken {
    const token = JSON.parse(localStorage.getItem(this.tokenKey)) as IToken;
    return token;
  }
}
