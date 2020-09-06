import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  deleted: boolean;
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  cpf: string;
  rg: string;
  birthdate_at: Date;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  avatar_url?: any;
  id: string;
}

export interface Role {
  _id: string;
  deleted: boolean;
  slug_history: string[];
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Token {
  type: string;
  token: string;
}

export interface IAuthResponse {
  success?: boolean;
  user?: User;
  token?: Token;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(data: object): Observable<IAuthResponse> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  auth(): Observable<IAuthResponse> {
    return this.http.get(`${environment.apiUrl}/auth/me`);
  }

  register(data: object): Observable<IAuthResponse> {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }

  recover(data: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/recover`, data);
  }
}
